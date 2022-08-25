import Booking from '../models/bookingModel';
import * as factory from './handlerFactory';

export const getBooking = factory.getOne(Booking);
export const getAllBookings = factory.getAll(Booking);
export const createBooking = factory.createOne(Booking);
export const updateBooking = factory.updateOne(Booking);
export const deleteBooking = factory.deleteOne(Booking);
