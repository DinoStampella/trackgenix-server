import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  startDate: { type: Date },
  endDate: { type: Date, require: true },
  active: { type: String, require: true },
  clientName: { type: String, require: true },
  teamMembers: [{
    name: { type: String, required: true },
    rol: { type: String, enum: ['DEV', 'TL', 'QA', 'PM'] },
    rate: { type: Number, required: true },
  }],
});

export default mongoose.model('Project', projectSchema);
