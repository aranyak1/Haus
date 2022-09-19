import express from 'express';
import * as homeController from '../controllers/homeController';
import * as authController from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(homeController.getAllHomes)
  .post(authController.protect,homeController.createHome);

router
  .route('/:id')
  .get(homeController.getHome)
  .patch(authController.protect, homeController.updateHome)
  .delete(authController.protect,homeController.deleteHome);

export default router;
