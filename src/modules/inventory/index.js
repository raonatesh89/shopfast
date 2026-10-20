//src/modules/inventory/index.js
//js
import fp from 'fastify-plugin';
import { createInventoryRepository } from './inventory.repository.js';
import { createInventoryService } from './inventory.service.js';
import routes from './inventory.routes.js';

export default fp(async function inventoryModule(app) {
  app.decorate(
    'inventoryService',
    // app.productsService exists because the products module was registered first
    createInventoryService(createInventoryRepository(), app.productsService)
  );
  app.register(routes, { prefix: '/api/inventory' });
}, { name: 'inventory', dependencies: ['products'] }); // Fastify errors at startup if products is missing
