//src/modules/inventory/inventory.service.js
//js
import { AppError } from '../../shared/errors.js';

// "products" is the products service, injected so we can validate product ids
export function createInventoryService(repo, products) {
  return {
    // Read stock of a product
    getStock(productId) {
      products.getOrThrow(productId);              // 404 if product doesn't exist
      return { productId, quantity: repo.get(productId) };
    },
    // Admin: set exact stock (this is the "update product inventory" feature)
    setStock(productId, quantity) {
      products.getOrThrow(productId);
      repo.set(productId, quantity);
      return { productId, quantity };
    },
    // Hold stock for an order. items = [{productId, quantity}]
    reserve(items) {
      // Pass 1: CHECK everything first so we never reserve half an order
      for (const { productId, quantity } of items) {
        if (repo.get(productId) < quantity)
          throw new AppError(`Insufficient stock for ${productId}`, 409); // 409 = Conflict
      }
      // Pass 2: all items are available, so deduct stock
      for (const { productId, quantity } of items)
        repo.set(productId, repo.get(productId) - quantity);
    },
    // Give stock back (used when an order is cancelled)
    release(items) {
      for (const { productId, quantity } of items)
        repo.set(productId, repo.get(productId) + quantity);
    },
  };
}


