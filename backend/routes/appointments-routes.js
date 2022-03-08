const express = require("express");

const appointmentsControllers = require("../controllers/appointments-controllers");
const fileUpload = require('../middleware/file-upload')

const router = express.Router();

router.get("/", appointmentsControllers.getAllAppointments);

router.get("/:pid", appointmentsControllers.getAppointmentById);

router.get("/user/:uid", appointmentsControllers.getAppointmentsByUserId);

router.post("/create", fileUpload.single('image'), appointmentsControllers.createAppointment);

router.delete("/:pid", appointmentsControllers.deleteAppointment);

router.patch("/:pid", appointmentsControllers.updateAcceptor);

module.exports = router;
