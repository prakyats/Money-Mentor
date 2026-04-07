export const AUTH_STORAGE_KEYS = {
  accessToken: 'mm_access_token',
  refreshToken: 'mm_refresh_token',
  user: 'mm_user',
};

export const API_PATHS = {
  auth: {
    register: '/api/v1/auth/register',
    login: '/api/v1/auth/login',
    refresh: '/api/v1/auth/refresh',
  },
  users: {
    me: '/api/v1/users/me',
  },
  transactions: {
    base: '/api/v1/transactions',
  },
};
