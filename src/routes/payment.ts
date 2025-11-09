import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/create-order', authenticateToken, createOrder);
router.post('/verify', verifyPayment); // Webhook doesn't need auth

export default router;