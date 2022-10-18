import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    enum: ['Frontend', 'Backend', 'Testing'],
    require: true,
  },
});

export default mongoose.model('Task', taskSchema);
