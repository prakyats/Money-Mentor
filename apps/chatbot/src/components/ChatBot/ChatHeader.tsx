import React from 'react';
import { RotateCcw, X, Minimize, Maximize } from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';

const ChatHeader: React.FC = () => {
  const { clearMessages, embedded, minimized, toggleMinimized, theme } = useChatContext();

  const handleClose = () => {
    if (embedded && typeof window !== 'undefined') {
      window.parent.postMessage({ type: 'CLOSE_CHAT' }, '*');
    }
  };

  return (
    <div className={`flex items-center justify-between px-4 py-4 sm:px-6 ${theme === 'dark' ? 'border-b border-white/10 bg-[#121212]/95 backdrop-blur-md text-white' : 'border-b border-slate-200 bg-white/95 backdrop-blur-md text-slate-900'}`}>
      <div className="flex items-center gap-4 text-left">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl shadow-inner ${theme === 'dark' ? 'bg-yellow-400/20 text-yellow-400 shadow-yellow-400/10' : 'bg-amber-100 text-amber-700 shadow-amber-900/5'}`}>
          <span className="text-lg font-bold">M</span>
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-tight sm:text-base">Finance Mentor</h3>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <p className={`text-[11px] font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              AI Assistant Online
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={clearMessages}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          aria-label="Refresh chat"
          title="Refresh messages"
        >
          <RotateCcw size={18} />
        </button>
        {embedded && (
          <button
            onClick={handleClose}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        )}
        {!embedded ? (
          <button
            onClick={toggleMinimized}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            aria-label={minimized ? "Maximize" : "Minimize"}
          >
            {minimized ? <Maximize size={18} /> : <Minimize size={18} />}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ChatHeader;