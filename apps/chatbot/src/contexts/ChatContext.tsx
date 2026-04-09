import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { ChatContextType, ChatMessage, MessageType } from '../types/chat';
import { generateId, getInitialTheme, getTypingDelay, loadChatHistory, sendChatMessage } from '../utils/chatUtils';

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'money-mentor-chat-theme';
const INITIAL_GREETING = "Hello! I'm your financial assistant. How can I help you today?";

const createGreetingMessage = (): ChatMessage => ({
  id: generateId(),
  type: 'bot',
  text: INITIAL_GREETING,
  timestamp: new Date(),
});

export const ChatProvider: React.FC<{ children: ReactNode; embedded?: boolean }> = ({
  children,
  embedded = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [minimized, setMinimized] = useState(!embedded);
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);
  const conversationIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.chatTheme = theme;
  }, [theme]);

  useEffect(() => {
    let cancelled = false;

    const hydrateChat = async () => {
      setIsLoadingHistory(true);

      try {
        const history = await loadChatHistory();

        if (cancelled || !mountedRef.current) {
          return;
        }

        conversationIdRef.current = history.conversationId;
        setMessages(history.messages.length > 0 ? history.messages : [createGreetingMessage()]);
      } catch (error) {
        console.error('Error loading chat history:', error);

        if (!cancelled && mountedRef.current) {
          setMessages([createGreetingMessage()]);
        }
      } finally {
        if (!cancelled && mountedRef.current) {
          setIsLoadingHistory(false);
        }
      }
    };

    void hydrateChat();

    return () => {
      cancelled = true;
    };
  }, []);

  const pushBotMessage = (text: string, timestamp?: Date) => {
    setMessages(prev => [
      ...prev,
      {
        id: generateId(),
        type: 'bot',
        text,
        timestamp: timestamp ?? new Date(),
      },
    ]);
  };

  const addMessage = async (text: string, type: MessageType) => {
    const newMessage: ChatMessage = {
      id: generateId(),
      type,
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    if (type === 'user') {
      setIsTyping(true);

      try {
        const response = await sendChatMessage(text, conversationIdRef.current ?? undefined);

        if (!mountedRef.current) {
          return;
        }

        conversationIdRef.current = response.conversationId;

        const botResponseText = response.assistantMessage.content;
        const delay = getTypingDelay(botResponseText);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          if (!mountedRef.current) {
            return;
          }

          pushBotMessage(botResponseText, new Date(response.assistantMessage.createdAt));
          setIsTyping(false);
          timeoutRef.current = null;
        }, delay);
      } catch (err) {
        console.error('Error sending chat message:', err);

        const fallbackResponse = 'I could not reach the assistant right now. Please try again in a moment.';
        const delay = getTypingDelay(fallbackResponse);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          if (!mountedRef.current) {
            return;
          }

          pushBotMessage(fallbackResponse);
          setIsTyping(false);
          timeoutRef.current = null;
        }, delay);
      }
    }
  };

  const clearMessages = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsTyping(false);
    setMessages([createGreetingMessage()]);
  };

  const toggleMinimized = () => {
    if (embedded) {
      return;
    }

    setMinimized(prev => !prev);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ChatContext.Provider value={{
      messages,
      isTyping,
      isLoadingHistory,
      embedded,
      addMessage,
      clearMessages,
      minimized,
      toggleMinimized,
      theme,
      toggleTheme,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

