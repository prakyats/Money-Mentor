import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: { headers?: Record<string, string | string[] | undefined>; requestId?: string }, res: { setHeader: (name: string, value: string) => void }, next: () => void) {
    const headerValue = req.headers?.['x-request-id'];
    const requestId = (Array.isArray(headerValue) ? headerValue[0] : headerValue) ?? uuidv4();
    req.requestId = requestId;
    res.setHeader('x-request-id', requestId);
    next();
  }
}
