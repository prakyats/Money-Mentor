import { API_PATHS, AUTH_STORAGE_KEYS } from 'money-mentor-shared';

const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || 'https://money-mentor-backend-b32y.onrender.com/api/v1';

// API_PATHS already include /api/v1, so strip it from the base URL if present.
export const API_BASE_URL = rawApiBaseUrl.replace(/\/api\/v1\/?$/, '');

export const LANDING_LOGIN_URL =
  import.meta.env.VITE_LANDING_LOGIN_URL || 'https://money-mentor-landing.vercel.app/login';

export const CHATBOT_URL =
  import.meta.env.VITE_CHATBOT_URL || 'http://localhost:5175';

export { API_PATHS, AUTH_STORAGE_KEYS };
