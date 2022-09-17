import express from 'express';
import * as bookingController from '../controllers/bookingController';
import * as authController from '../controllers/authController';

const router = express.Router();

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(authController.protect, bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

export default router;