//src/modules/cart/cart.service.js
//js
import { AppError } from '../../shared/errors.js';

export function createCartService(repo, products) {
  // Private helper: get a cart or throw 404
  const getCart = (id) => {
    const cart = repo.find(id);
    if (!cart) throw new AppError('Cart not found', 404);
    return cart;
  };

  // Private helper: build a cart view with names, prices and totals
  const detailed = (id) => {
    const cart = getCart(id);
    const items = cart.items.map(({ productId, quantity }) => {
      const p = products.getOrThrow(productId); // Always use the CURRENT product price
      return { productId, name: p.name, unitPrice: p.price, quantity, lineTotal: p.price * quantity };
    });
    // total = sum of all line totals
    return { id: cart.id, items, total: items.reduce((s, i) => s + i.lineTotal, 0) };
  };

  return {
    create: () => detailed(repo.create().id),   // Create a cart and return its detailed view
    getDetailed: detailed,                      // Exposed so the orders module can read a cart
    // Add to cart
    addItem(cartId, productId, quantity) {
      products.getOrThrow(productId);           // Product must exist
      const cart = getCart(cartId);
      const line = cart.items.find((i) => i.productId === productId); // Already in cart?
      if (line) line.quantity += quantity;      // Yes: increase quantity
      else cart.items.push({ productId, quantity }); // No: add a new line
      return detailed(cartId);
    },
    // Remove a product from the cart
    removeItem(cartId, productId) {
      const cart = getCart(cartId);
      cart.items = cart.items.filter((i) => i.productId !== productId); // Keep everything except that product
      return detailed(cartId);
    },
    // Empty the cart (called after an order is created)
    clear(cartId) {
      getCart(cartId).items = [];
    },
  };
}
