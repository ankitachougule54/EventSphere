import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema(
  {
    // कौनसा User register कर रहा है
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // कौनसे Event के लिए registration
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    registrationStatus: {
      type: String,
      enum: ["Registered", "Cancelled"],
      default: "Registered",
    },
  },
  {
    timestamps: true,
  }
);

const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);

export default EventRegistration;