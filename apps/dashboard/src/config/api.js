import { API_PATHS, AUTH_STORAGE_KEYS } from 'money-mentor-shared';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const LANDING_LOGIN_URL =
  import.meta.env.VITE_LANDING_LOGIN_URL || 'http://localhost:5173/login';

export { API_PATHS, AUTH_STORAGE_KEYS };
