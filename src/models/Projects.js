import mongoose from 'mongoose';

const projectsSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  description: String,
  startDate: Date,
  endDate: Date,
  active: Boolean,
  clientName: String,
  teamMembers: {
    id: String,
    rol: [String],
    rate: Number,
  },
});

export default mongoose.model('Projects', projectsSchema);
