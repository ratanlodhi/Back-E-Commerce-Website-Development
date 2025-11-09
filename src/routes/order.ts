// src/routes/order.ts
import { Router } from 'express';
import { getUserOrders } from '../controllers/orderController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
router.get('/:userId', authenticateToken, getUserOrders);
export default router;