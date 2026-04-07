// src/contexts/ChatContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { ChatContextType, ChatMessage, MessageType } from '../types/chat';
import { generateId, generateBotResponse, getTypingDelay } from '../utils/chatUtils';

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      type: 'bot',
      text: "Hello! I'm your financial assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [minimized, setMinimized] = useState(true);

  const addMessage = async (text: string, type: MessageType) => {
    const newMessage: ChatMessage = {
      id: generateId(),
      type,
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);

    if (type === 'user') {
      setIsTyping(true);

      let botResponseText: string;
      try {
        botResponseText = await generateBotResponse(text);
      } catch (err) {
        console.error('Error in generateBotResponse:', err);
        botResponseText = "Oops—something went wrong. Please try again.";
      }

      const delay = getTypingDelay(botResponseText);
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: generateId(),
          type: 'bot',
          text: botResponseText,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, delay);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: generateId(),
        type: 'bot',
        text: "Hello! I'm your financial assistant. How can I help you today?",
        timestamp: new Date()
      }
    ]);
  };

  const toggleMinimized = () => {
    setMinimized(prev => !prev);
  };

  return (
    <ChatContext.Provider value={{
      messages,
      isTyping,
      addMessage,
      clearMessages,
      minimized,
      toggleMinimized
    }}>
      {children}
    </ChatContext.Provider>
  );
};

