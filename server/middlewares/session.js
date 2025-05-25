import cookieSession from 'cookie-session';
import cors from 'cors';

const sessionMiddleware = [
  cors({
    origin: 'http://localhost:5173',  // frontend URL
    credentials: true,
  }),

  cookieSession({
    name: 'session',
    keys: ['verysecretkeyhere'],  // in production use env variables
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: false,                // true if HTTPS in production
  }),
];

export default sessionMiddleware;