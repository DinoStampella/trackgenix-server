import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    validate: {
      validator(v) {
        return /^[a-zA-Z]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Name`,
    },
    required: true,
  },
  lastName: {
    type: String,
    validate: {
      validator(v) {
        return /^[a-zA-Z]+$/.test(v);
      },
      message: (props) => `${props.value} is not a Last name`,
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Email`,
    },
    required: true,
  },
  password: { type: String, required: true },
  dni: { type: Number, required: true },
  phone: { type: Number, required: false },
  location: { type: String, required: false },
});

export default mongoose.model('Employee', employeeSchema);
