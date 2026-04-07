import React from 'react';
import { Trash2, Minimize, Maximize } from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';

const ChatHeader: React.FC = () => {
  const { clearMessages, minimized, toggleMinimized } = useChatContext();

  return (
    <div className="bg-yellow-400 text-black px-10 py-3 rounded-t-lg flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-green-900 h-8 w-8 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold">$</span>
        </div>
        <h3 className="font-medium text-lg">Finance Assistant</h3>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={clearMessages}
          className="text-white hover:text-black transition-colors p-1"
          aria-label="Clear chat"
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={toggleMinimized}
          className="text-white hover:text-black transition-colors p-1"
          aria-label={minimized ? "Maximize" : "Minimize"}
        >
          {minimized ? <Maximize size={18} /> : <Minimize size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;