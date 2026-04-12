import express from 'express';
import { Router } from 'express';
import { checkOut } from '../controllers/paymentControllers';
const router = Router();
router.route('/checkout').get(checkOut);
export default router;