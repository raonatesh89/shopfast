//src/modules/orders/orders.service.js
//js
import { randomUUID } from 'node:crypto';
import { AppError } from '../../shared/errors.js';

// carts + inventory are other modules' services, injected here
export function createOrdersService(repo, carts, inventory) {
  // Get an order or throw 404
  const get = (id) => {
    const o = repo.find(id);
    if (!o) throw new AppError('Order not found', 404);
    return o;
  };

  return {
    get,
    // Convert a cart into an order
    createFromCart(cartId) {
      const cart = carts.getDetailed(cartId);                  // Read cart with prices
      if (cart.items.length === 0) throw new AppError('Cart is empty', 400);
      inventory.reserve(cart.items);                           // Deduct stock; throws 409 if short
      const order = repo.save({
        id: randomUUID(),
        items: cart.items,                                     // Snapshot of items at purchase time
        total: cart.total,
        status: 'PENDING_PAYMENT',                             // Waiting for payment
      });
      carts.clear(cartId);                                     // Empty the cart after ordering
      return order;
    },
    // Mark order as paid
    markPaid(id) {
      const o = get(id);
      o.status = 'PAID';
      return o;
    },
    // Cancel an unpaid order and return its stock
    cancel(id) {
      const o = get(id);
      if (o.status === 'PENDING_PAYMENT') {                    // Only unpaid orders can be cancelled
        inventory.release(o.items);                            // Put stock back
        o.status = 'CANCELLED';
      }
      return o;
    },
  };
}
