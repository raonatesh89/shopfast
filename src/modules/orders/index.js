


//src/modules/orders/index.js

//js
import fp from 'fastify-plugin';
import { createOrdersRepository } from './orders.repository.js';
import { createOrdersService } from './orders.service.js';
import routes from './orders.routes.js';

export default fp(async function ordersModule(app) {
  app.decorate(
    'ordersService',
    // Inject cart and inventory services (modules talk via services only)
    createOrdersService(createOrdersRepository(), app.cartService, app.inventoryService)
  );
  app.register(routes, { prefix: '/api/orders' });
}, { name: 'orders', dependencies: ['cart', 'inventory'] }); // Both must load first
