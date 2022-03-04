const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Appointment = require("../models/appointment");
const User = require("../models/user");


const getAllAppointments = async (req, res, next) => {
  let appointments;
  try {
    appointments = await Appointment.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching appointments failed, please try again later.',
      500
    );
    return next(error);
  }

  appointments = appointments.map(appointment => appointment.toObject({ getters: true }));

  for (const appointment of appointments) {
    const appointmentCreator = await User.findById(appointment.creator);
    appointment['username'] = appointmentCreator.username;
    appointment['rating'] = appointmentCreator.rating;
    appointment['region'] = appointmentCreator.region;
    appointment['gender'] = appointmentCreator.gender;
  }

  //res.json({ appointments: appointments.map(appointment => appointment.toObject({ getters: true })) });
  res.json({ appointments: appointments });
};


const getAppointmentById = async (req, res, next) => {
  const appointmentId = req.params.pid;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find an appointment.",
      500
    );
    return next(error);
  }

  if (!appointment) {
    const error = new HttpError(
      "Could not find appointment for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ appointment: appointment.toObject({ getters: true }) });
};

const getAppointmentsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithAppointments;
  try {
    userWithAppointments = await User.findById(userId).populate("appointments");
  } catch (err) {
    const error = new HttpError(
      "Fetching appointments failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userWithAppointments) {
    return next(
      new HttpError(
        "Could not find appointments for the provided user id.",
        404
      )
    );
  }

  res.json({
    username: userWithAppointments.username,
    gender: userWithAppointments.gender,
    rating: userWithAppointments.rating,
    region: userWithAppointments.region,
    email: userWithAppointments.email,
    appointments: userWithAppointments.appointments.map((appointment) =>
      appointment.toObject({ getters: true })
    ),
  });
};

const createAppointment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator, timerange } = req.body;

  const createdAppointment = new Appointment({
    title,
    description,
    address,
    timerange,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating appointment failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdAppointment.save({ session: sess });
    user.appointments.push(createdAppointment);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating appointment failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ appointment: createdAppointment });
};

const deleteAppointment = async (req, res, next) => {
  const appointmentId = req.params.pid;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete appointment.',
      500
    );
    return next(error);
  }

  if (!appointment) {
    const error = new HttpError('Could not find appointment for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await appointment.remove({session: sess});
    appointment.creator.appointments.pull(appointment);
    await appointment.creator.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not appointment place.',
      500
    );
    return next(error);
  }
  
  res.status(200).json({ message: 'Deleted appointment.' });
};

exports.getAllAppointments = getAllAppointments;
exports.getAppointmentById = getAppointmentById;
exports.getAppointmentsByUserId = getAppointmentsByUserId;
exports.createAppointment = createAppointment;
exports.deleteAppointment = deleteAppointment;