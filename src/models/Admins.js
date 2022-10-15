import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dni: { type: Number, required: true },
  phone: { type: Number, required: false },
  location: { type: String, required: false },
});

export default mongoose.model('Admin', adminSchema);
