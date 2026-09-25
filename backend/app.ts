/**
 * Express Application configuration
 * Used by backend/server.ts (local dev) and api/index.ts (Vercel Serverless)
 */

import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api';

export const app = express();

// Global Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, _res, next) => {
  const start = Date.now();
  next();
  const dur = Date.now() - start;
  if (!req.url.startsWith('/api/ask')) {
    console.log(`[API] ${req.method} ${req.url} - ${dur}ms`);
  }
});

// Mount Routes under both /api and root to handle direct and rewritten requests seamlessly
app.use('/api', apiRouter);
app.use(apiRouter);

// Root fallback
app.get('/', (_req, res) => {
  res.json({
    name: 'Fanthom AI Backend Engine',
    version: '1.0.0',
    documentation: '/developers/reference',
    health: '/api/health',
  });
});

export default app;
