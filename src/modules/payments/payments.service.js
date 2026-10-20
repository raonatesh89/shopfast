//src/modules/payments/payments.service.js

//js
import { AppError } from '../../shared/errors.js';

// provider = payment gateway, orders = orders service
export function createPaymentsService(provider, orders) {
  return {
    async pay(orderId, token) {
      const order = orders.get(orderId);                   // 404 if order doesn't exist
      if (order.status !== 'PENDING_PAYMENT')              // Prevent paying twice or paying cancelled orders
        throw new AppError(`Order is ${order.status}`, 409);

      const result = await provider.charge({ amount: order.total, token }); // Call the gateway
      if (!result.success) {
        orders.cancel(orderId);                            // Cancel and release reserved stock
        throw new AppError('Payment failed, order cancelled', 402); // 402 = Payment Required
      }
      orders.markPaid(orderId);                            // Success: mark as paid
      return { orderId, status: 'PAID', transactionId: result.transactionId };
    },
  };
}
