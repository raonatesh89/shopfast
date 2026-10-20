//src/modules/payments/payments.routes.js

//js
export default async function routes(app) {
  // POST /api/payments with {"orderId": "...", "token": "tok_ok"}
  app.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['orderId', 'token'],
        additionalProperties: false,
        properties: { orderId: { type: 'string' }, token: { type: 'string' } },
      },
    },
  }, async (req) => app.paymentsService.pay(req.body.orderId, req.body.token));
}