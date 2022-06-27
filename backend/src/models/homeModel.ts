import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//schema represents the structure of a document or it tells what can be expected
const homeSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    slug: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A home must have a owner'],
    },
    homeType: {
      type: String,
      required: [true, 'A home must have a homeType'],
      enum:['private','shared']
    },
    furnishing: {
      type: String,
      required: [true, 'A home must have a furnishing'],
      enum:['furnished','semi-furnished','unfurnished']
    },
    price: {
      type: Number,
      required: [true, 'A home must have a price'],
      min: [50, 'Price must be greater than 50'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val: number) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 1,
    },
    images: [String],
    totalOccupancy: {
      type: Number,
      min:[1,'A house should have atleast one occupancy'],
      required: [true, 'A home must have total number of occupancy'],
    },
    totalBedrooms: {
      type: Number,
      required: [true, 'A home must have total number of bedrooms'],
    },
    totalBathrooms: {
      type: Number,
      required: [true, 'A home must have total number of bathrooms'],
    },
    ameneties: {
      hasTv: Boolean,
      hasKitchen: Boolean,
      hasWifi: Boolean,
      hasAc: Boolean,
      hasGeyser: Boolean,
    },
    address: {
      doorNo: {
        type: String,
        required: [true, 'A home must  door no'],
      },
      buildingName: String,
      streetName: String,
      locality: {
        type: String,
        required: [true, 'A home must belong to a locality'],
      },
      city: {
        type: String,
        required: [true, 'A home must belong to a city'],
      },
      state: {
        type: String,
        required: [true, 'A home must belong to a state'],
      },
      pincode: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
  },
  // to include virtual properties in the output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

homeSchema.index({ price: 1, ratingsAverage: -1 });
homeSchema.index({ slug: 1 });
homeSchema.index({ location: '2dsphere' });

// model defines a interface  to the database for creating, querying, updating, deleting records, etc.
// a document is a instance of model
const Home = model('Home', homeSchema);

export default Home;
