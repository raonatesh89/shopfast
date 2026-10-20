//src/modules/products/products.service.js

//js
import { AppError } from '../../shared/errors.js'; // For throwing "not found"

// Service = business rules. It receives the repository (dependency injection)
export function createProductsService(repo) {
  return {
    search: (filters) => repo.search(filters), // Pass search filters straight to the repository
    // Get a product or fail with 404; other modules reuse this to validate product ids
    getOrThrow(id) {
      const p = repo.findById(id);
      if (!p) throw new AppError('Product not found', 404);
      return p;
    },
    create: (data) => repo.create(data),       // Create via repository
  };
}
