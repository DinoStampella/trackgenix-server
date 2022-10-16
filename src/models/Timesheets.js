// Models

import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetSchema = new Schema({
  date: { type: Date, required: true },
  task: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model('Timesheet', timesheetSchema);
