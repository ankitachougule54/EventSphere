import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },

    // 🖼️ Event Background Image
    eventImage: {
      type: String,
      default: null,
    },

    dateTime: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    // 👩‍💼 Employees assigned to this event
    assignedEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    // 📦 Items required for this event
    requiredItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    // 💻 Technologies related to this event
    technologies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tech",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);