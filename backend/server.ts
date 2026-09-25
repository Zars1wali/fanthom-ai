/**
 * Backend HTTP Server entry point
 * Listens on port 3001 (or PORT env) and exposes /api routes
 */

import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

export const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fanthom Backend Server running at http://localhost:${PORT}/`);
  console.log(`📊 Health check available at http://localhost:${PORT}/api/health`);
});

export default app;

