import express from "express";

import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  markMessageAsRead,
  deleteContactMessage,
  replyToContactMessage,
} from "../controllers/ContactController.js";



const ContactRouter = express.Router();


// ==========================================
// CREATE MESSAGE
// ==========================================

ContactRouter.post(
  "/",
  createContactMessage
);


// ==========================================
// GET ALL MESSAGES
// ==========================================

ContactRouter.get(
  "/",
  getContactMessages
);


// ==========================================
// GET MESSAGE BY ID
// ==========================================

ContactRouter.get(
  "/:id",
  getContactMessageById
);


// ==========================================
// MARK AS READ
// ==========================================

ContactRouter.put(
  "/read/:id",
  markMessageAsRead
);


// ==========================================
// DELETE MESSAGE
// ==========================================

ContactRouter.delete(
  "/:id",
  deleteContactMessage
);

// ==========================================
// REPLY TO CONTACT MESSAGE
// ==========================================

ContactRouter.post(
  "/reply/:id",
  replyToContactMessage
);

export default ContactRouter;