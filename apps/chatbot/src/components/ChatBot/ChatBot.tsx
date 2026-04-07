import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatBot: React.FC = () => {
  const { minimized, toggleMinimized } = useChatContext();

  if (minimized) {
    return (
      <div className="fixed bottom-6 right-4 z-50">
        <button
          onClick={toggleMinimized}
          className="bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-blue-900 transition-all duration-300 flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full sm:w-96 h-[500px] max-h-[80vh] flex flex-col rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatBot;