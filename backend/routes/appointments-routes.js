const express = require("express");

const appointmentsControllers = require("../controllers/appointments-controllers");

const router = express.Router();

router.get("/:pid", appointmentsControllers.getAppointmentById);

router.get("/user/:uid", appointmentsControllers.getAppointmentsByUserId);

router.post("/", appointmentsControllers.createAppointment);

module.exports = router;
