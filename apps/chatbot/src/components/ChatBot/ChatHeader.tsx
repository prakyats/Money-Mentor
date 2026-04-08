import React from 'react';
import { Trash2, Minimize, Maximize, SunMedium, MoonStar } from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';

const ChatHeader: React.FC = () => {
  const { clearMessages, minimized, toggleMinimized, theme, toggleTheme } = useChatContext();

  return (
    <div className={`flex items-center justify-between px-4 py-3 sm:px-5 ${theme === 'dark' ? 'border-b border-white/8 bg-gradient-to-r from-[#1b1b1b] via-[#171717] to-[#111111] text-white' : 'border-b border-slate-200 bg-gradient-to-r from-white via-slate-50 to-white text-slate-900'}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${theme === 'dark' ? 'bg-yellow-400/15 text-yellow-400' : 'bg-amber-100 text-amber-700'}`}>
          <span className="font-semibold">$</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide sm:text-base">Finance Assistant</h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Dark by default, light on demand
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={toggleTheme}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${theme === 'dark' ? 'border-white/10 bg-white/5 text-yellow-400 hover:bg-white/10' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
        </button>
        <button
          onClick={clearMessages}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          aria-label="Clear chat"
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={toggleMinimized}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          aria-label={minimized ? "Maximize" : "Minimize"}
        >
          {minimized ? <Maximize size={18} /> : <Minimize size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;