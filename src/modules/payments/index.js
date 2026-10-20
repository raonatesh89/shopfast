//src/modules/payments/index.js

//js
import fp from 'fastify-plugin';
import { mockProvider } from './mock.provider.js';
import { createPaymentsService } from './payments.service.js';
import routes from './payments.routes.js';

export default fp(async function paymentsModule(app) {
  // Wire the mock gateway + orders service into the payments service
  app.decorate('paymentsService', createPaymentsService(mockProvider, app.ordersService));
  app.register(routes, { prefix: '/api/payments' });
}, { name: 'payments', dependencies: ['orders'] });
