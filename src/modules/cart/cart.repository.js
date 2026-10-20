//Cart Module

//src/modules/cart/cart.repository.js

//js
import { randomUUID } from 'node:crypto';

export function createCartRepository() {
  const carts = new Map();                       // cartId → cart object
  return {
    create() {
      const cart = { id: randomUUID(), items: [] }; // New empty cart
      carts.set(cart.id, cart);
      return cart;
    },
    find: (id) => carts.get(id) ?? null,         // Return null if not found
  };
}
