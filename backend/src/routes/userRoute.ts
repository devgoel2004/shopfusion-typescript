import {Router} from 'express';
import { forgotPassword, getUserDetails, loginUser, logoutUser, registerUser, resetPassword, updateProfile } from '../controllers/userControllers';
import { isAuthenticatedUser, authorizeRole } from '../middleware/authentication';
const router = Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').post(logoutUser);
router.route('/user/reset').post(forgotPassword);
router.route('/user/reset/:token').post(resetPassword);
// 
router.route('/user/me').get(isAuthenticatedUser,getUserDetails);
router.route('/user/me/update').put(isAuthenticatedUser, updateProfile);
export default router;