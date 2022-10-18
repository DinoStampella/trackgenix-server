import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetsSchema = new Schema({
  date: { type: Date, required: true },
  task: { type: String, required: true },
  description: { type: String, enum: ['Frontend', 'Backend', 'Testing'], required: true },
});

export default mongoose.model('Timesheets', timesheetsSchema);
