import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: { type: String, enum: ['Frontend', 'Backend', 'Testing'], requiere: true },
});

export default mongoose.model('Tasks', taskSchema);
