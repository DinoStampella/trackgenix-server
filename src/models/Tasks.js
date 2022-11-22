import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Frontend', 'Backend', 'Testing'],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Task', taskSchema);
