import {Router} from 'express';
import { getAllProducts } from '../controllers/productControllers';
const router = Router();
router.route('/all-products').get(getAllProducts);
export default router;