import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  userId: { type: String, required: true },
  products: [{ productId: String, quantity: { type: Number, default: 1 } }],
  amount: { type: Number, required: true },
  paymentId: String,
  orderId: String,
  status: { type: String, default: 'pending' }, // pending, completed
  createdAt: { type: Date, default: Date.now }
});

export const Order = model('Order', orderSchema);