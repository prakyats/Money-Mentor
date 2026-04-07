declare module 'express-serve-static-core' {
  interface Request {
    requestId?: string;
    user?: {
      userId: string;
      role: 'USER' | 'ADMIN';
      email: string;
    };
  }
}
