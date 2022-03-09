const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  image: { type: String },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  acceptor: { type: mongoose.Types.ObjectId, ref: 'User' },
  state: { type: Number, required: true },
  // state table
  // 0 -> new appointment
  // 1 -> accepted
  // 2 -> finished
  // 3 -> expired
});

module.exports = mongoose.model('Appointment', appointmentSchema);
