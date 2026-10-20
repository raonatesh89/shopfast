import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.js';

test('full checkout flow', async () => {
  const app = await buildApp({ logger: false });
  const cart = (await app.inject({ method: 'POST', url: '/api/carts' })).json();

  await app.inject({
    method: 'POST', url: `/api/carts/${cart.id}/items`,
    payload: { productId: 'p1', quantity: 2 },
  });
  const order = (await app.inject({
    method: 'POST', url: '/api/orders', payload: { cartId: cart.id },
  })).json();
  const pay = await app.inject({
    method: 'POST', url: '/api/payments',
    payload: { orderId: order.id, token: 'tok_ok' },
  });

  assert.equal(pay.statusCode, 200);
  assert.equal(pay.json().status, 'PAID');
  const stock = (await app.inject({ url: '/api/inventory/p1' })).json();
  assert.equal(stock.quantity, 48);
  await app.close();
});