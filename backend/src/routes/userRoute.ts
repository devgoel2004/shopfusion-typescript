// import {User} from '../models/userModel';
import {Router} from 'express';
import { forgotPassword, loginUser, logoutUser, registerUser } from '../controllers/userControllers';
const router = Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').post(logoutUser);
router.route('/user/forgot-password').post(forgotPassword);
export default router;