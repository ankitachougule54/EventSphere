import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // 📩 Message Status
    status: {
      type: String,
      enum: ["New", "Read", "Replied"],
      default: "New",
    },

    // 📧 Admin Reply
    reply: {
      type: String,
      default: "",
    },

    // 📅 Reply Time
    repliedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Contact",
  contactSchema
);