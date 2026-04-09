import { AUTH_STORAGE_KEYS } from 'money-mentor-shared';
import { ChatApiMessage, ChatHistoryResponse, ChatHistoryState, ChatMessage, ChatSendResponse } from '../types/chat';

const DEFAULT_API_BASE_URL = 'https://money-mentor-backend-b32y.onrender.com/api/v1';
const THEME_STORAGE_KEY = 'money-mentor-chat-theme';

const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

const getAccessToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEYS.accessToken);
};

const hasAccessToken = () => Boolean(getAccessToken());

const getAuthHeaders = () => {
  const token = getAccessToken();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const generateId = (): string => Math.random().toString(36).substr(2, 9);

export const getTypingDelay = (text: string): number => Math.min(2000, text.length * 35);

export const getInitialTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === 'light' ? 'light' : 'dark';
};

const toUiMessage = (message: ChatApiMessage): ChatMessage => ({
  id: message.id,
  type: message.role === 'assistant' ? 'bot' : 'user',
  text: message.content,
  timestamp: new Date(message.createdAt),
});

const normalizeMessages = (messages: ChatApiMessage[]): ChatMessage[] => messages.map(toUiMessage);

export const loadChatHistory = async (): Promise<ChatHistoryState> => {
  const endpoint = hasAccessToken() ? '/chat/history' : '/chat/public/history';

  const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Unable to load chat history (${response.status})`);
  }

  const data = (await response.json()) as ChatHistoryResponse;

  return {
    conversationId: data.conversationId,
    messages: normalizeMessages(data.messages ?? []),
  };
};

export const sendChatMessage = async (
  message: string,
  conversationId?: string,
): Promise<ChatSendResponse> => {
  const endpoint = hasAccessToken() ? '/chat/message' : '/chat/public/message';

  const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ message, conversationId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Unable to send chat message (${response.status}): ${errorText}`);
  }

  return (await response.json()) as ChatSendResponse;
};

export const toUiMessages = normalizeMessages;
