export type MessageType = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

export interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (text: string, type: MessageType) => void;
  clearMessages: () => void;
  minimized: boolean;
  toggleMinimized: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}