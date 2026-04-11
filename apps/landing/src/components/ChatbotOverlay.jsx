import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { CHATBOT_URL } from '../config/api';

const buildEmbeddedUrl = (baseUrl, theme) => {
  if (!baseUrl) {
    return '';
  }

  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}embed=1&theme=${theme || 'dark'}`;
};

export function ChatbotOverlay({ isDarkMode = true }) {
  const [open, setOpen] = React.useState(false);
  const theme = isDarkMode ? 'dark' : 'light';
  const iframeRef = React.useRef(null);

  const embeddedUrl = React.useMemo(() => buildEmbeddedUrl(CHATBOT_URL, theme), [theme]);

  // Sync theme changes in real-time
  React.useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'SET_THEME', theme }, '*');
    }
  }, [theme, open]);

  // Listen for close message from inside iframe
  React.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'CLOSE_CHAT') {
        setOpen(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!open) {
    return (
      <div className="!fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setOpen(true)}
          className={`mm-chat-launcher group flex items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-slate-900 text-yellow-400 hover:bg-slate-800'}`}
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="!fixed bottom-8 right-8 z-50 w-[calc(100%-4rem)] sm:w-[420px]">
      <div className={`mm-chat-panel-enter relative h-[600px] max-h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl ${isDarkMode ? 'border border-white/11 bg-[#121212]' : 'border border-slate-200 bg-white'}`}>
        <iframe
          ref={iframeRef}
          title="Money Mentor Chatbot"
          src={embeddedUrl}
          className="h-full w-full border-0"
          loading="lazy"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
