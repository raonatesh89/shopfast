
//src/modules/products/index.js
//js
import fp from 'fastify-plugin';                                   // Makes decorators visible to other modules
import { createProductsRepository } from './products.repository.js';
import { createProductsService } from './products.service.js';
import routes from './products.routes.js';

// The module's "wiring" file: connects repository → service → routes
export default fp(async function productsModule(app) {
  // Build repo, hand it to the service, and expose it as app.productsService
  app.decorate('productsService', createProductsService(createProductsRepository()));
  // Mount all product routes under /api/products
  app.register(routes, { prefix: '/api/products' });
}, { name: 'products' }); // Name lets other modules declare a dependency on this one

