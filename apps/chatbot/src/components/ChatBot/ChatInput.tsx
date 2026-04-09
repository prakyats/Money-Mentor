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
    <div className={`rounded-b-3xl border-t px-4 py-3 sm:px-5 ${theme === 'dark' ? 'border-white/8 bg-[#121212]' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-center gap-2">
        <div className="flex-grow relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about investments, budgeting, retirement..."
            disabled={isLoadingHistory || isTyping}
            className={`w-full resize-none overflow-auto rounded-2xl border px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500 focus:ring-yellow-400/20' : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-amber-200'}`}
            style={{ minHeight: '40px', maxHeight: '60px' }}
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