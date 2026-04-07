import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage } = useChatContext();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      addMessage(trimmedInput, 'user');
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <div className="border-t border-gray-200 py-3 px-8 bg-white rounded-b-lg">
      <div className="flex items-center gap-2">
        <div className="flex-grow relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about investments, budgeting, retirement..."
            className="w-full border border-gray-300 rounded-lg px-2 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent resize-none overflow-auto"
            style={{ minHeight: '40px', maxHeight: '60px' }}
            rows={1}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className={`p-3 rounded-full ${
              input.trim() 
                ? 'bg-gray-200 text-white hover:bg-yellow-400' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors`}
            aria-label="Send message"
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;