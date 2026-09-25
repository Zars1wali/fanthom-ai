/**
 * Backend HTTP Server entry point
 * Listens on port 3001 (or PORT env) and exposes /api routes
 */

import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

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

// Mount Routes
app.use('/api', apiRouter);

// Root fallback
app.get('/', (_req, res) => {
  res.json({
    name: 'Fanthom AI Backend Engine',
    version: '1.0.0',
    documentation: '/developers/reference',
    health: '/api/health',
  });
});

export const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fanthom Backend Server running at http://localhost:${PORT}/`);
  console.log(`📊 Health check available at http://localhost:${PORT}/api/health`);
});

export default app;
