import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  startDate: { type: Date, default: () => Date.now().toString() },
  endDate: { type: Date, require: true },
  active: { type: String, require: true },
  clientName: { type: String, require: true },
  teamMembers: [{
    name: { type: String, required: true },
    rol: { type: String, enum: ['DEV', 'TL', 'QA'] },
    rate: {
      type: Number,
      min: 1,
      max: 1000,
      required: true,
    },
  }],
});

export default mongoose.model('Project', projectSchema);
