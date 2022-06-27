import mongoose from 'mongoose';
import validator from 'validator';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide us your first name'],
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, 'Please provide us your gender'],
      enum:['male','female','other']
    },
    description: String,
    phoneNo: String,
    email: {
      type: String,
      //creates a unique index to avoid duplicates
      unique: true,
      required: [true, 'Please provide us your email'],
      validate: [validator.isEmail, 'Please provide an valid email'],
    },
    emailVerifiedAt: Date,
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['User', 'Host', 'Admin'],
      default: 'User',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
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
  //   {
  //     toJSON: { virtuals: true },
  //     toObject: { virtuals: true },
  //   }
);

const User = model('User', userSchema);

export default User;