//Inventory Module
//src/modules/inventory/inventory.repository.js
//js
export function createInventoryRepository() {
  // Starting stock per product id: p1=50, p2=20, p3=5
  const stock = new Map([['p1', 50], ['p2', 20], ['p3', 5]]);
  return {
    get: (id) => stock.get(id) ?? 0,         // Unknown product = 0 stock
    set: (id, qty) => stock.set(id, qty),    // Overwrite stock value
  };
}

