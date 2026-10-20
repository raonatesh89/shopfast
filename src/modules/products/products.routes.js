//src/modules/products/products.routes.js

//js
// Routes = HTTP layer only: define URLs + validation, then call the service
export default async function routes(app) {
  // GET /api/products?q=mouse&minPrice=100&maxPrice=5000
  app.get('/', {
    schema: {
      querystring: {                  // Validate the URL query string
        type: 'object',
        properties: {
          q: { type: 'string' },
          minPrice: { type: 'number' }, // Fastify converts "100" to number 100 automatically
          maxPrice: { type: 'number' },
        },
      },
    },
  }, async (req) => app.productsService.search(req.query)); // Returned value is sent as JSON

  // GET /api/products/p1 : fetch one product (404 if missing)
  app.get('/:id', async (req) => app.productsService.getOrThrow(req.params.id));

  // POST /api/products : create a product
  app.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'price'],     // Both fields are mandatory
        additionalProperties: false,     // Reject any unknown fields
        properties: {
          name: { type: 'string', minLength: 1 }, // Non-empty text
          price: { type: 'number', minimum: 0 },  // No negative prices
        },
      },
    },
  }, async (req, reply) => reply.code(201).send(app.productsService.create(req.body))); // 201 = Created
}
