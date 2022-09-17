import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
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
      // required: [true, 'Please provide us your gender'],
      enum: ['male', 'female', 'other'],
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
      minlength: 4,
      select: false,
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
  },
  //   {
  //     toJSON: { virtuals: true },
  //     toObject: { virtuals: true },
  //   }
);

// Virtual populate
// userSchema.virtual('bookings', {
//   ref: 'Booking',
//   foreignField: 'userId',
//   localField: '_id'
// });

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 10
  // what bcrypt does is it takes our password add a random string(call salt) and then hash it
  // the advantage of adding salts is users with same passwords will have diff hash value
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword: any,
  userPassword: any,
) {
  if (candidatePassword == userPassword) {
    return true;
  }
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model('User', userSchema);

export default User;
