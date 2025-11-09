import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    // Populate product details
    const populatedOrders = await Promise.all(
      orders.map(async (order) => {
        const products = await Promise.all(
          order.products.map(async (item: any) => {
            const product = await Product.findById(item.productId);
            return { ...product?.toObject(), quantity: item.quantity };
          })
        );
        return { ...order.toObject(), products };
      })
    );

    res.json(populatedOrders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};