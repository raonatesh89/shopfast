//src/modules/orders/orders.routes.js

//js
export default async function routes(app) {
  // POST /api/orders with {"cartId": "..."} : place an order
  app.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['cartId'],
        additionalProperties: false,
        properties: { cartId: { type: 'string' } },
      },
    },
  }, async (req, reply) => reply.code(201).send(app.ordersService.createFromCart(req.body.cartId)));

  // GET /api/orders/:id : check order status
  app.get('/:id', async (req) => app.ordersService.get(req.params.id));
}
