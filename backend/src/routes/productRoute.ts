import {Router} from 'express';
import { createProduct, getAllProducts } from '../controllers/productControllers';
import { authorizeRole, isAuthenticatedUser } from '../middleware/authentication';
const router = Router();
router.route('/all-products').get(getAllProducts);
router.route('/product/new').post(isAuthenticatedUser, authorizeRole('seller'),createProduct);
export default router;