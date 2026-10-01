import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("CONTROLLER EMAIL:", process.env.EMAIL);
console.log(
  "CONTROLLER PASSWORD LENGTH:",
  process.env.EMAIL_PASSWORD?.length
);

// ==========================================
// NODEMAILER TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("EMAIL VERIFY ERROR:", error);
  } else {
    console.log("EMAIL SERVER READY:", success);
  }
});


// ==========================================
// CREATE CONTACT MESSAGE
// ==========================================

export const createContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;


    // VALIDATION

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    // CREATE MESSAGE

    const newMessage = new Contact({
      name,
      email,
      subject,
      message,
    });


    await newMessage.save();


    res.status(201).json({
      message: "Message sent successfully! ✅",
      contact: newMessage,
    });

  } catch (error) {

    console.error(
      "CREATE CONTACT MESSAGE ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });

  }
};



// ==========================================
// GET ALL CONTACT MESSAGES
// ==========================================

export const getContactMessages = async (req, res) => {
  try {

    const messages = await Contact.find()
      .sort({ createdAt: -1 });


    res.status(200).json({
      messages,
    });

  } catch (error) {

    console.error(
      "GET CONTACT MESSAGES ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });

  }
};



// ==========================================
// GET MESSAGE BY ID
// ==========================================

export const getContactMessageById = async (req, res) => {
  try {

    const message = await Contact.findById(
      req.params.id
    );


    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }


    res.status(200).json({
      message,
    });

  } catch (error) {

    console.error(
      "GET CONTACT MESSAGE ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch message",
      error: error.message,
    });

  }
};



// ==========================================
// MARK MESSAGE AS READ
// ==========================================

export const markMessageAsRead = async (req, res) => {
  try {

    const message = await Contact.findByIdAndUpdate(

      req.params.id,

      {
        status: "Read",
      },

      {
        new: true,
      }

    );


    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }


    res.status(200).json({
      message: "Message marked as Read ✅",
      contact: message,
    });

  } catch (error) {

    console.error(
      "MARK MESSAGE ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to update message",
      error: error.message,
    });

  }
};



// ==========================================
// DELETE CONTACT MESSAGE
// ==========================================

export const deleteContactMessage = async (req, res) => {
  try {

    const message = await Contact.findByIdAndDelete(
      req.params.id
    );


    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }


    res.status(200).json({
      message: "Message deleted successfully ✅",
    });

  } catch (error) {

    console.error(
      "DELETE CONTACT MESSAGE ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to delete message",
      error: error.message,
    });

  }
};

// ==========================================
// REPLY TO CONTACT MESSAGE
// ==========================================

export const replyToContactMessage = async (req, res) => {

  try {

    const {

      reply,

    } = req.body;


    // ======================================
    // VALIDATION
    // ======================================

    if (!reply) {

      return res.status(400).json({

        message: "Reply message is required",

      });

    }


    // ======================================
    // FIND CONTACT MESSAGE
    // ======================================

    const contactMessage =

      await Contact.findById(

        req.params.id

      );


    if (!contactMessage) {

      return res.status(404).json({

        message: "Contact message not found",

      });

    }


    // ======================================
    // SEND EMAIL
    // ======================================

    await transporter.sendMail({

      from: process.env.EMAIL,

      to: contactMessage.email,

      subject:

        `Re: ${contactMessage.subject}`,


      text: reply,

    });


    // ======================================
    // UPDATE DATABASE
    // ======================================

    contactMessage.status = "Replied";

    contactMessage.reply = reply;

    contactMessage.repliedAt = new Date();


    await contactMessage.save();


    // ======================================
    // SUCCESS RESPONSE
    // ======================================

    res.status(200).json({

      message:

        "Reply sent successfully! 📧✅",

      contact:

        contactMessage,

    });


  } catch (error) {

    console.error(

      "REPLY CONTACT MESSAGE ERROR:",

      error

    );


    res.status(500).json({

      message:

        "Failed to send reply",

      error:

        error.message,

    });

  }

};