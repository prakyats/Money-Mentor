import { API_PATHS, AUTH_STORAGE_KEYS } from 'money-mentor-shared';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://money-mentor-backend-b32y.onrender.com/api/v1';

export const LANDING_LOGIN_URL =
  import.meta.env.VITE_LANDING_LOGIN_URL || 'https://money-mentor-landing.vercel.app/login';

export { API_PATHS, AUTH_STORAGE_KEYS };
