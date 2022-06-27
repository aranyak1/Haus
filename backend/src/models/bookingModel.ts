import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'A booking must have a user id'],
    },
    roomId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'A booking must have a room id'],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Booking = model('Booking' ,bookingSchema);

export default Booking; 