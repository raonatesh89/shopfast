//Payments Module

//src/modules/payments/mock.provider.js

//js
import { randomUUID } from 'node:crypto';

// Fake payment gateway. Later replace with Stripe/Razorpay keeping the same charge() shape
export const mockProvider = {
  async charge({ amount, token }) {
    if (token === 'tok_fail') return { success: false };   // Special token to simulate failure
    return { success: true, transactionId: `txn_${randomUUID()}`, amount }; // Any other token succeeds
  },
};
