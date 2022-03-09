const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Appointment = require('../models/appointment');
const User = require('../models/user');

const getCurrentTime = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let hr = String(today.getHours()).padStart(2, '0');
  let min = String(today.getMinutes()).padStart(2, '0');

  const curDate = yyyy + '-' + mm + '-' + dd;
  const curTime = hr + ':' + min;
  return { curDate, curTime };
};

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

  const { curDate, curTime } = getCurrentTime();
  let i = 0;
  // updating appointments
  while (i < appointments.length) {
    switch (appointments[i].state) {
      case 0:
        // check if expired
        if (
          appointments[i].date < curDate ||
          (appointments[i].date === curDate && appointments[i].end < curTime)
        ) {
          // mark as expired and delete from array
          appointments[i].state = 3;
          try {
            await appointments[i].save();
          } catch (err) {
            console.log(err);
          }
          appointments.splice(i, 1);
        } else {
          i += 1;
        }
        break;

      case 1:
        if (
          appointments[i].date < curDate ||
          (appointments[i].date === curDate && appointments[i].end < curTime)
        ) {
          appointments[i].state = 2;
          try {
            await appointments[i].save();
          } catch (err) {
            console.log(err);
          }
          appointments.splice(i, 1);
        } else {
          i += 1;
        }
        break;

      case 2:
      case 3:
        appointments.splice(i, 1);
        break;

      default:
        break;
    }
  }

  appointments = appointments.map((appointment) =>
    appointment.toObject({ getters: true })
  );

  for (const appointment of appointments) {
    const appointmentCreator = await User.findById(appointment.creator);
    appointment['username'] = appointmentCreator.username;
    appointment['rating'] = appointmentCreator.rating;
    appointment['region'] = appointmentCreator.region;
    appointment['gender'] = appointmentCreator.gender;
  }

  res.json({ appointments: appointments });
};

const getAppointmentById = async (req, res, next) => {
  const appointmentId = req.params.pid;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an appointment.',
      500
    );
    return next(error);
  }

  if (!appointment) {
    const error = new HttpError(
      'Could not find appointment for the provided id.',
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
    userWithAppointments = await User.findById(userId).populate('appointments');
  } catch (err) {
    const error = new HttpError(
      'Fetching appointments failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWithAppointments) {
    return next(
      new HttpError(
        'Could not find appointments for the provided user id.',
        404
      )
    );
  }

  const len = userWithAppointments.appointments.length;
  let future = [],
    todo = [],
    finished = [],
    expired = [];
  for (let i = 0; i < len; i++) {
    switch (userWithAppointments.appointments[i].state) {
      case 0:
        future.push(userWithAppointments.appointments[i]);
        break;
      case 1:
        todo.push(userWithAppointments.appointments[i]);
        break;
      case 2:
        finished.push(userWithAppointments.appointments[i]);
        break;
      case 3:
        expired.push(userWithAppointments.appointments[i]);
        break;
      default:
        break;
    }
  }
  console.log(userWithAppointments);

  res.json({
    future: future,
    todo: todo,
    finished: finished,
    expired: expired,
  });
};

const createAppointment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, address, creator, date, start, end } = req.body;

  const createdAppointment = new Appointment({
    title,
    description,
    address,
    date,
    start,
    end,
    image: req.file?.path || 'fileuploads/images/appointmentsimage.jpg',
    creator,
    acceptor: null,
    state: 0,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Failed when fetching info from user.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdAppointment.save({ session: sess });
    user.appointments.push(createdAppointment);
    await user.save({ session: sess });
    await sess.commitTransaction();

    // await createdAppointment.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Creating appointment failed, please try again.',
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
    await appointment.remove({ session: sess });
    appointment.creator.appointments.pull(appointment);
    await appointment.creator.save({ session: sess });
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

const updateAcceptor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { acceptorId } = req.body;

  let acceptor;
  try {
    acceptor = await User.findById(acceptorId);
  } catch (err) {
    const error = new HttpError('Failed when fetching info from user.', 500);
    return next(error);
  }

  const appointmentId = mongoose.Types.ObjectId(req.params.pid);

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not accept the appointment.',
      500
    );
    return next(error);
  }

  let creator;
  try {
    creator = await User.findById(appointment.creator);
  } catch (err) {
    const error = new HttpError('Failed when fetching info from user.', 500);
    return next(error);
  }

  appointment.acceptor = acceptorId;
  appointment.state = 1;
  acceptor.appointments.push(appointmentId);

  try {
    await appointment.save();
    await acceptor.save();
    await creator.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not accept the appointment.',
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ appointment: appointment.toObject({ getters: true }) });
};

exports.getAllAppointments = getAllAppointments;
exports.getAppointmentById = getAppointmentById;
exports.getAppointmentsByUserId = getAppointmentsByUserId;
exports.createAppointment = createAppointment;
exports.deleteAppointment = deleteAppointment;
exports.updateAcceptor = updateAcceptor;
