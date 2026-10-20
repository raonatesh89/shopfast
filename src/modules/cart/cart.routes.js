//src/modules/cart/cart.routes.js  
//js
export default async function routes(app) {
  const s = () => app.cartService; // Shortcut to the service (a function so it's read at request time)

  // POST /api/carts : create a cart
  app.post('/', async (req, reply) => reply.code(201).send(s().create()));
  // GET /api/carts/:id : view a cart
  app.get('/:id', async (req) => s().getDetailed(req.params.id));

  // POST /api/carts/:id/items : add product to cart
  app.post('/:id/items', {
    schema: {
      body: {
        type: 'object',
        required: ['productId', 'quantity'],
        additionalProperties: false,
        properties: {
          productId: { type: 'string' },
          quantity: { type: 'integer', minimum: 1 }, // At least 1
        },
      },
    },
  }, async (req) => s().addItem(req.params.id, req.body.productId, req.body.quantity));

  // DELETE /api/carts/:id/items/:productId : remove product from cart
  app.delete('/:id/items/:productId', async (req) =>
    s().removeItem(req.params.id, req.params.productId));
}
