//src/modules/cart/index.js
//js
import fp from 'fastify-plugin';
import { createCartRepository } from './cart.repository.js';
import { createCartService } from './cart.service.js';
import routes from './cart.routes.js';

export default fp(async function cartModule(app) {
  // Cart needs the products service to look up names and prices
  app.decorate('cartService', createCartService(createCartRepository(), app.productsService));
  app.register(routes, { prefix: '/api/carts' });
}, { name: 'cart', dependencies: ['products'] });
