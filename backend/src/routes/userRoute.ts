import {User} from '../models/userModel';
import {Router} from 'express';
import { registerUser } from '../controllers/userControllers';
const router = Router();

router.route('/user/register').post(registerUser);
export default router;