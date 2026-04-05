import express from 'express';
import { isAuthenticatedUser } from '../middleware/authentication';
import { newOrder } from '../controllers/orderControllers';
const router = express.Router();
router.route('/order/new').post(isAuthenticatedUser, newOrder);
export default router;