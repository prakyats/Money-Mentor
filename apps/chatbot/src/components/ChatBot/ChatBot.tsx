import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatBot: React.FC = () => {
  const { embedded, minimized, toggleMinimized, theme } = useChatContext();

  if (minimized && !embedded) {
    return (
      <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
        <button
          onClick={toggleMinimized}
          className={`flex items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${theme === 'dark' ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-slate-900 text-yellow-400 hover:bg-slate-800'}`}
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      </div>
    );
  }

  const containerClass = embedded
    ? `flex h-full w-full flex-col overflow-hidden ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`
    : `fixed bottom-8 right-8 z-50 flex h-[600px] max-h-[85vh] w-full flex-col overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-300 ease-in-out sm:w-[420px] ${theme === 'dark' ? 'border border-white/10 bg-[#121212]' : 'border border-slate-200 bg-white'}`;

  return (
    <div className={containerClass}>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatBot;