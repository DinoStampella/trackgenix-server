import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminsSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
  location: { type: String },
  DNI: { type: Number, required: true },
});

export default mongoose.model('SuperAdmins', superAdminsSchema);
