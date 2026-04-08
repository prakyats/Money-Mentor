import { AUTH_STORAGE_KEYS } from 'money-mentor-shared';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL || 'https://money-mentor-dashboard.vercel.app';

export { AUTH_STORAGE_KEYS };
