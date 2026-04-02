import {Router} from 'express';
import { deleteUser, forgotPassword, getAllUser, getSingleUser, getUserDetails, loginUser, logoutUser, registerUser, resetPassword, updateProfile, updateUserRole } from '../controllers/userControllers';
import { isAuthenticatedUser, authorizeRole } from '../middleware/authentication';
const router = Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').post(logoutUser);
router.route('/user/reset').post(forgotPassword);
router.route('/user/reset/:token').post(resetPassword);
router.route('/user/me').get(isAuthenticatedUser,getUserDetails);
router.route('/user/me/update').put(isAuthenticatedUser, updateProfile);
// Admin Routes
router.route('/admin/users').get(isAuthenticatedUser, authorizeRole('admin'), getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRole('admin'), getSingleUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRole('admin'), deleteUser);
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRole('admin'), updateUserRole);


export default router;