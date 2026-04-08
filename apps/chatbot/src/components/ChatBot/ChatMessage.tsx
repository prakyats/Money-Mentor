import React from 'react';
import { useChatContext } from '../../hooks/useChatContext';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { theme } = useChatContext();
  const isBot = message.type === 'bot';
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
      data-testid={`message-${message.id}`}
    >
      <div 
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isBot 
            ? theme === 'dark'
              ? 'border border-white/8 bg-white/5 text-slate-100 rounded-tl-none'
              : 'border border-slate-200 bg-white text-slate-800 rounded-tl-none'
            : 'bg-yellow-400 text-black rounded-tr-none shadow-[0_8px_24px_rgba(250,204,21,0.18)]'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        <span className="text-xs opacity-70 block mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;