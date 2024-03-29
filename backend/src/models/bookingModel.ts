import { differenceInCalendarDays } from 'date-fns';
import mongoose from 'mongoose';
import Home from './homeModel';
import catchAsync from '../utils/catchAsync';
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'A booking must have a user id'],
    },
    homeId: {
      type: mongoose.Types.ObjectId,
      ref: 'Home',
      required: [true, 'A booking must have a home id'],
    },
    homeTitle: String,
    city: String,
    state: String,
    startDate: {
      type: Date,
      required: [true, 'A booking must have a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'A booking must have a end date'],
    },
    noOFDays: {
      type: Number,
      default: 0,
      required: [true, 'A booking must have no of days'],
    },
    price: {
      type: Number,
      default: 0,
      required: [true, 'A booking must have a price'],
    },
    total: {
      type: Number,
      default: 0,
      required: [true, 'A booking must have a total'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'cancelled'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

bookingSchema.index({ userId: 1, homeId: 1, startDate: 1, endDate: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
bookingSchema.pre('save', async function (next) {
  let doc = await Home.findById(this.homeId).select('price title address');
  this.homeTitle = doc.title
  this.price = doc.price
  this.city = doc.address.city
  this.state = doc.address.state
  next();
});

// bookingSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'homeId',
//     select: 'title'
//   })
// });

bookingSchema.pre('save', function(next) {
  this.noOFDays = differenceInCalendarDays(this.endDate, this.startDate);
  this.total = this.noOFDays * this.price;
  next();
});

const Booking = model('Booking', bookingSchema);

export default Booking;
