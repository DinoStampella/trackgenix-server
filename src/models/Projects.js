import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectsSchema = new Schema({
  id: { type: String, required: true },
  nombre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  teamMembers: [
    {
      rol: {
        type: String,
        required: true,
        enum: ['DEV', 'QA', 'TL', 'PM'],
      },
      rate: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model('Projects', projectsSchema);
