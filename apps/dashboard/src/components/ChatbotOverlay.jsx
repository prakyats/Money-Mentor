import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { CHATBOT_URL } from '../config/api';

const buildEmbeddedUrl = (baseUrl) => {
  if (!baseUrl) {
    return '';
  }

  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}embed=1`;
};

export function ChatbotOverlay({ isDarkMode }) {
  const [open, setOpen] = React.useState(false);

  const embeddedUrl = React.useMemo(() => buildEmbeddedUrl(CHATBOT_URL), []);

  if (!open) {
    return (
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
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
    <div className="fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] sm:bottom-6 sm:right-6 sm:w-96">
      <div className={`mm-chat-panel-enter relative h-[500px] max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl ${isDarkMode ? 'border border-yellow-400/15 bg-[#121212]' : 'border border-slate-200 bg-white'}`}>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close chat"
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 ${isDarkMode ? 'border-white/15 bg-[#0f0f10]/80 text-slate-200 hover:bg-[#1a1a1b]' : 'border-slate-300 bg-white/90 text-slate-700 hover:bg-slate-100'}`}
        >
          <X size={16} />
        </button>
        <iframe
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
