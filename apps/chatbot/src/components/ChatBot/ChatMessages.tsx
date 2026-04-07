import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { useChatContext } from '../../hooks/useChatContext';

const ChatMessages: React.FC = () => {
  const { messages, isTyping } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 py-4 px-8 overflow-y-auto bg-gray-50">
      <div className="space-y-1">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex justify-start m-4">
            <div className="bg-gray-100 text-gray-800 px-8 py-4 rounded-2xl rounded-tl-none max-w-[80%]">
              <div className="flex space-x-1">
                <div className="typing-dot bg-gray-500"></div>
                <div className="typing-dot bg-gray-500 animation-delay-200"></div>
                <div className="typing-dot bg-gray-500 animation-delay-400"></div>
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