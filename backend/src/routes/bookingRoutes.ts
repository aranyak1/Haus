import express from 'express';
import * as bookingController from '../controllers/bookingController';
import * as authController from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(authController.protect,authController.restrictTo('Admin'),bookingController.getAllBookings)
  .post(authController.protect, bookingController.createBooking);

router
  .route('/:id')
  .get(authController.protect, bookingController.getBooking)
  .patch(authController.protect,bookingController.updateBooking)
  .delete(authController.protect,bookingController.deleteBooking);

export default router;