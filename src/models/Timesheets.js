import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetsSchema = new Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Projects', required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Tasks', required: true },
  hours: { type: Number, required: true },
});

export default mongoose.model('Timesheets', timesheetsSchema);
