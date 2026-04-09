import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { useChatContext } from '../../hooks/useChatContext';

const ChatMessages: React.FC = () => {
  const { messages, isTyping, isLoadingHistory, theme } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 overflow-y-auto px-4 py-4 sm:px-5 ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.06),transparent_28%),linear-gradient(180deg,#141414_0%,#101010_100%)]' : 'bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_30%),linear-gradient(180deg,#fafafa_0%,#f3f4f6_100%)]'}`}>
      <div className="space-y-1">
        {isLoadingHistory && messages.length === 0 && (
          <div className="flex justify-start m-4">
            <div className={`max-w-[80%] rounded-2xl rounded-tl-none px-6 py-4 ${theme === 'dark' ? 'border border-white/8 bg-white/5 text-slate-200' : 'border border-slate-200 bg-white text-slate-800'}`}>
              <p className="text-sm">Loading your recent chat history...</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex justify-start m-4">
            <div className={`max-w-[80%] rounded-2xl rounded-tl-none px-8 py-4 ${theme === 'dark' ? 'border border-white/8 bg-white/5 text-slate-200' : 'border border-slate-200 bg-white text-slate-800'}`}>
              <div className="flex space-x-1">
                <div className={`typing-dot ${theme === 'dark' ? 'bg-yellow-400/80' : 'bg-amber-500'}`}></div>
                <div className={`typing-dot ${theme === 'dark' ? 'bg-yellow-400/80' : 'bg-amber-500'} animation-delay-200`}></div>
                <div className={`typing-dot ${theme === 'dark' ? 'bg-yellow-400/80' : 'bg-amber-500'} animation-delay-400`}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;