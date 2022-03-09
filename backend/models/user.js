const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  gender: { type: String, required: true },
  rating: { type: Number, required: true },
  region: { type: String, required: true },
  appointments: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Appointment' },
  ],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
