export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:5174';

export const AUTH_STORAGE_KEYS = {
  accessToken: 'mm_access_token',
  refreshToken: 'mm_refresh_token',
  user: 'mm_user',
};
