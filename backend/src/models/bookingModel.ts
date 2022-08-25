import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref:'User',
      required: [true, 'A booking must have a user id'],
    },
    homeId: {
      type: mongoose.Types.ObjectId,
      ref:'Home',
      required: [true, 'A booking must have a home id'],
    },
    startDate: {
      type: Date,
      required: [true, 'A booking must have a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'A booking must have a end date'],
    },
    price: {
      type: Number,
      required: [true, 'A booking must have a price'],
    },
    total: {
      type: Number,
      required: [true, 'A booking must have a total'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default:'active',
      enum:['active','cancelled']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

bookingSchema.index({ userId: 1, homeId:1 , startDate:1 , endDate :1 });

const Booking = model('Booking' ,bookingSchema);

export default Booking; 