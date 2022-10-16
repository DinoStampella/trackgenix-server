import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  DNI: { type: Number, required: true },
  phone: { type: Number, required: false },
  location: { type: String, required: false },
});

export default mongoose.model('Employee', employeeSchema);
