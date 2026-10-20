//Orders Module
//src/modules/orders/orders.repository.js
//js
export function createOrdersRepository() {
  const orders = new Map();                         // orderId → order
  return {
    save: (o) => (orders.set(o.id, o), o),          // Store, then return the order (comma operator)
    find: (id) => orders.get(id) ?? null,
  };
}
