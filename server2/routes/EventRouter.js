import express from "express";

import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "../controllers/EventController.js";

import upload from "../middlewares/upload.js";

const EventRouter = express.Router();


// ==========================================
// CREATE EVENT
// ==========================================

EventRouter.post(
  "/createEvent",
  upload.single("eventImage"),
  createEvent
);


// ==========================================
// GET ALL EVENTS
// ==========================================

EventRouter.get(
  "/",
  getEvents
);


// ==========================================
// GET EVENT BY ID
// ==========================================

EventRouter.get(
  "/:id",
  getEventById
);


// ==========================================
// UPDATE EVENT
// ==========================================

EventRouter.put(
  "/:id",
  upload.single("eventImage"),
  updateEvent
);


// ==========================================
// DELETE EVENT
// ==========================================

EventRouter.delete(
  "/:id",
  deleteEvent
);


export default EventRouter;