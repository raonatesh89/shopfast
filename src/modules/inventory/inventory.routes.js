//src/modules/inventory/inventory.routes.js
//js
export default async function routes(app) {
  // GET /api/inventory/p1 : current stock
  app.get('/:productId', async (req) => app.inventoryService.getStock(req.params.productId));

  // PUT /api/inventory/p1 with {"quantity": 100} : set stock
  app.put('/:productId', {
    schema: {
      body: {
        type: 'object',
        required: ['quantity'],
        additionalProperties: false,
        properties: { quantity: { type: 'integer', minimum: 0 } }, // Whole number, not negative
      },
    },
  }, async (req) => app.inventoryService.setStock(req.params.productId, req.body.quantity));
}
