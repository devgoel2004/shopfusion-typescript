import {Router} from 'express';
import { createProduct, getAllProducts, updateProduct } from '../controllers/productControllers';
import { authorizeRole, isAuthenticatedUser } from '../middleware/authentication';
const router = Router();
router.route('/all-products').get(getAllProducts);
router.route('/product/new').post(isAuthenticatedUser, authorizeRole('seller'),createProduct);
router.route('/product/:id').put(isAuthenticatedUser, authorizeRole('seller'), updateProduct);
export default router;