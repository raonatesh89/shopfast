//Shared
//src/app.js
//js
import Fastify from 'fastify';                          // The web framework
import products from './modules/products/index.js';     // Each import = one feature module (plugin)
import inventory from './modules/inventory/index.js';
import cart from './modules/cart/index.js';
import orders from './modules/orders/index.js';
import payments from './modules/payments/index.js';

// Factory function: creates a fresh app each call (tests get a clean app every time)
export async function buildApp(opts = {}) {
  // logger: true prints request logs; tests pass false to keep output quiet
  const app = Fastify({ logger: opts.logger ?? true });

  // Simple health check route, used by load balancers/monitoring
  app.get('/health', async () => ({ status: 'ok' }));

  // Order matters: a module must load after the modules it depends on
  await app.register(products);   // No dependencies
  await app.register(inventory);  // Needs products
  await app.register(cart);       // Needs products
  await app.register(orders);     // Needs cart + inventory
  await app.register(payments);   // Needs orders
  return app;                     // Return the ready app
}