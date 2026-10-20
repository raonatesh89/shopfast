//Entry points
//src/server.js
//js
// Import the function that builds our Fastify app (kept separate so tests can reuse it)
import { buildApp } from './app.js';

// Build the app with default options (logging on)
const app = await buildApp();

// Start listening: PORT comes from .env (loaded by --env-file), fallback to 3000
// host '0.0.0.0' means "accept connections from any network interface"
await app.listen({ port: Number(process.env.PORT || 3000), host: '0.0.0.0' });