import express from 'express';
import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router
  .route('/')
  .get(authController.protect,authController.restrictTo('Admin'),userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(authController.protect,userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

export default router;
