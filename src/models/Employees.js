import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
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
    password: {
      type: String,
      required: true,
    },
    dni: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Employee', employeeSchema);
