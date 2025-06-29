import { RateLimiterMemory } from 'rate-limiter-flexible';
import { NextFunction, Request, Response } from 'express';

const rateLimiter = new RateLimiterMemory({
  points: 100,    // Allow 100 requests
  duration: 60,   // Per 60 seconds (1 minute)
});

export const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rateLimiter.consume(req.ip || 'unknown');
    next();
  } catch (rateLimiterRes) {
    // rateLimiterRes has information about when the points will be reset
    const msBeforeNext = (rateLimiterRes as { msBeforeNext: number }).msBeforeNext;
    const retrySecs = Math.round(msBeforeNext / 1000) || 1;

    res.set('Retry-After', String(retrySecs));
    res.status(429).json({
      error: 'Too many requests, please try again later.',
      retryAfterSeconds: retrySecs,
    });
  }
};
