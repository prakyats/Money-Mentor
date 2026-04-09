export type MessageType = 'user' | 'bot';

export type ChatApiMessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

export interface ChatApiMessage {
  id: string;
  role: ChatApiMessageRole;
  content: string;
  createdAt: string;
  model?: string | null;
  requestId?: string | null;
}

export interface ChatHistoryResponse {
  conversationId: string | null;
  messages: ChatApiMessage[];
}

export interface ChatHistoryState {
  conversationId: string | null;
  messages: ChatMessage[];
}

export interface ChatSendResponse {
  conversationId: string | null;
  userMessage: ChatApiMessage;
  assistantMessage: ChatApiMessage;
  messages: ChatApiMessage[];
}

export interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  isLoadingHistory: boolean;
  embedded: boolean;
  addMessage: (text: string, type: MessageType) => Promise<void>;
  clearMessages: () => void;
  minimized: boolean;
  toggleMinimized: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}