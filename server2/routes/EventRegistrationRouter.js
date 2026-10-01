import express from "express";

import {
  registerForEvent,
  getMyRegisteredEvents,
  cancelRegistration,
} from "../controllers/EventRegistrationController.js";

import { authenticateUser } from "../middlewares/authMiddleware.js";


const EventRegistrationRouter = express.Router();


// ==========================================
// REGISTER FOR EVENT
// ==========================================

EventRegistrationRouter.post(
  "/register/:eventId",
  authenticateUser,
  registerForEvent
);


// ==========================================
// GET MY REGISTERED EVENTS
// ==========================================

EventRegistrationRouter.get(
  "/my-events",
  authenticateUser,
  getMyRegisteredEvents
);


// ==========================================
// CANCEL EVENT REGISTRATION
// ==========================================

EventRegistrationRouter.put(
  "/cancel/:registrationId",
  authenticateUser,
  cancelRegistration
);


export default EventRegistrationRouter;