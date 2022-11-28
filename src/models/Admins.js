import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    firebaseUid: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Admin', adminSchema);
