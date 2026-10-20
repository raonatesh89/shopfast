//Products Module
//src/modules/products/products.repository.js
//js
import { randomUUID } from 'node:crypto'; // Built-in Node function to generate unique IDs

// Starting (seed) data so the shop is not empty
const seed = [
  { id: 'p1', name: 'Wireless Mouse', price: 799 },
  { id: 'p2', name: 'Mechanical Keyboard', price: 3499 },
  { id: 'p3', name: 'USB-C Hub', price: 1999 },
];

// Repository = ONLY layer that touches data storage. Swap to PostgreSQL later by editing just this file
export function createProductsRepository() {
  // Map = in-memory key/value store; key is product id, value is the product
  const items = new Map(seed.map((p) => [p.id, p]));
  return {
    // Search with optional text and price range; defaults: min 0, max unlimited
    search({ q, minPrice = 0, maxPrice = Infinity }) {
      return [...items.values()].filter(           // Convert Map values to array, then filter
        (p) =>
          (!q || p.name.toLowerCase().includes(q.toLowerCase())) && // No q = match all; else case-insensitive name match
          p.price >= minPrice &&                   // Price must be above the minimum
          p.price <= maxPrice                      // ...and below the maximum
      );
    },
    // Find by id; return null (not undefined) when missing
    findById: (id) => items.get(id) ?? null,
    // Create a product with a new unique id
    create(data) {
      const product = { id: randomUUID(), ...data }; // Spread name + price into the new object
      items.set(product.id, product);                // Store it
      return product;                                // Return the saved product
    },
  };
}