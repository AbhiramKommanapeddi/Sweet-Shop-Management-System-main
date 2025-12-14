import { Router } from 'express';
import { createSweet, getSweets, getSweetById, updateSweet, deleteSweet, purchaseSweet, getMyOrders } from '../controllers/sweetController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getSweets);
router.get('/:id', getSweetById);
router.post('/', authenticate, createSweet);
router.put('/:id', authenticate, updateSweet);
router.delete('/:id', authenticate, deleteSweet);
router.post('/:id/purchase', authenticate, purchaseSweet);
router.get('/my-orders', authenticate, getMyOrders);

export default router;
