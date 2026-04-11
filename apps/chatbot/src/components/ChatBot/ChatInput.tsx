import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useChatContext } from '../../hooks/useChatContext';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage, isLoadingHistory, isTyping, theme } = useChatContext();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !isLoadingHistory && !isTyping) {
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
    <div className={`px-4 pb-6 pt-3 sm:px-6 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className={`flex items-end gap-2 rounded-[1.5rem] border p-2 transition-all duration-200 focus-within:shadow-lg ${theme === 'dark' ? 'border-white/10 bg-white/5 focus-within:border-yellow-400/40 focus-within:shadow-yellow-400/5' : 'border-slate-200 bg-slate-50 focus-within:border-amber-400/40 focus-within:shadow-black/5'}`}>
        <div className="flex-grow">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about investments, budgeting..."
            disabled={isLoadingHistory || isTyping}
            className={`w-full resize-none bg-transparent px-3 py-2 text-sm leading-relaxed focus:outline-none ${theme === 'dark' ? 'text-slate-100 placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'}`}
            style={{ minHeight: '44px', maxHeight: '120px' }}
            rows={1}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoadingHistory || isTyping}
            className={`rounded-full p-3 transition-colors ${
              input.trim() && !isLoadingHistory && !isTyping
                ? theme === 'dark'
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-slate-900 text-yellow-400 hover:bg-slate-800'
                : theme === 'dark'
                  ? 'cursor-not-allowed bg-white/5 text-slate-500'
                  : 'cursor-not-allowed bg-slate-100 text-slate-400'
            }`}
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