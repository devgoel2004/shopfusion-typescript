import {Router} from 'express';
import { createProduct, createProductReview, deleteProduct, deleteProductReview, getAllProducts, getProductDetails, getProductReviews, updateProduct } from '../controllers/productControllers';
import { authorizeRole, isAuthenticatedUser } from '../middleware/authentication';
const router = Router();
router.route('/all-products').get(getAllProducts);
router.route('/product/new').post(isAuthenticatedUser, authorizeRole('seller'),createProduct);
router.route('/product/:id').put(isAuthenticatedUser, authorizeRole('seller'), updateProduct);
router.route('/product/:id').delete(isAuthenticatedUser, authorizeRole('seller'), deleteProduct);
router.route('/product/:id').get(getProductDetails);
router.route('/product/review/:id').get(getProductReviews);
router.route('/product/review/:id').put(isAuthenticatedUser, createProductReview);
router.route('/product/review/:id').delete(isAuthenticatedUser,deleteProductReview);

export default router;