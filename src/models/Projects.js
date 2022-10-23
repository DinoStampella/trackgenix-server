import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectsSchema = new Schema(
  {
    name: {
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
        _id: false,
        employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
        role: {
          type: String,
          enum: ['DEV', 'QA', 'TL', 'PM'],
        },
        rate: Number,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Projects', projectsSchema);

// const projectSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     employees: [
//       {
//         _id: false,
//         employee: { type: Schema.Types.ObjectId, ref: 'employee' },
//         role: {
//           type: String,
//           enum: ['DEV', 'QA', 'TL', 'PM'],
//         },
//         rate: Number,
//       },
//     ],
//   },
//   { timestamps: true },
// );
