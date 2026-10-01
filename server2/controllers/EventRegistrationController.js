import EventRegistration from "../models/EventRegistration.js";
import Event from "../models/Event.js";


// ==========================================
// REGISTER FOR EVENT
// ==========================================

export const registerForEvent = async (req, res) => {
  try {

    const { eventId } = req.params;

    // User ID comes from JWT middleware
    const userId = req.user.userId;


    // ==========================================
    // CHECK EVENT
    // ==========================================

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found ❌",
      });
    }


    // ==========================================
    // CHECK EVENT STATUS
    // ==========================================

    if (event.status !== "Upcoming") {
      return res.status(400).json({
        message: "Registration is not available for this event ❌",
      });
    }


    // ==========================================
    // CHECK DUPLICATE REGISTRATION
    // ==========================================

    const existingRegistration =
      await EventRegistration.findOne({
        user: userId,
        event: eventId,
      });


    if (existingRegistration) {

      return res.status(400).json({
        message: "You have already registered for this event ❌",
      });

    }


    // ==========================================
    // CREATE REGISTRATION
    // ==========================================

    const registration =
      await EventRegistration.create({

        user: userId,

        event: eventId,

      });


    // ==========================================
    // SUCCESS
    // ==========================================

    return res.status(201).json({

      message:
        "Event registered successfully ✅",

      registration,

    });


  } catch (error) {

    console.error(
      "REGISTER EVENT ERROR:",
      error
    );

    return res.status(500).json({

      message:
        "Failed to register for event ❌",

      error: error.message,

    });

  }
};



// ==========================================
// GET MY REGISTERED EVENTS
// ==========================================

export const getMyRegisteredEvents =
  async (req, res) => {

    try {

      const userId =
        req.user.userId;


      const registrations =
        await EventRegistration.find({

          user: userId,

          registrationStatus:
            "Registered",

        })

        .populate("event")


        .sort({

          createdAt: -1,

        });


      return res.status(200).json({

        message:
          "Registered events fetched successfully ✅",

        registrations,

      });


    } catch (error) {

      console.error(
        "GET MY EVENTS ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to fetch registered events ❌",

        error: error.message,

      });

    }

  };



// ==========================================
// CANCEL EVENT REGISTRATION
// ==========================================

export const cancelRegistration =
  async (req, res) => {

    try {

      const { registrationId } =
        req.params;


      const userId =
        req.user.userId;


      // ======================================
      // FIND REGISTRATION
      // ======================================

      const registration =
        await EventRegistration.findOne({

          _id:
            registrationId,

          user:
            userId,

        });


      if (!registration) {

        return res.status(404).json({

          message:
            "Registration not found ❌",

        });

      }


      // ======================================
      // CANCEL REGISTRATION
      // ======================================

      registration.registrationStatus =
        "Cancelled";


      await registration.save();


      // ======================================
      // SUCCESS
      // ======================================

      return res.status(200).json({

        message:
          "Event registration cancelled successfully ✅",

      });


    } catch (error) {

      console.error(
        "CANCEL REGISTRATION ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to cancel registration ❌",

        error:
          error.message,

      });

    }

  };