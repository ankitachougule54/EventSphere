import Event from "../models/Event.js";
const parseArray = (data) => {
  if (!data) return [];

  if (Array.isArray(data)) return data;

  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
// ==========================================
// CREATE EVENT
// ==========================================
export const createEvent = async (req, res) => {
  try {
    const {
      eventTitle,
      dateTime,
      venue,
      capacity,
      description,
      status,
      assignedEmployees,
      requiredItems,
      technologies,
    } = req.body;

    // ==============================
    // EVENT IMAGE
    // ==============================
    const eventImage = req.file ? req.file.filename : null;

    // ==============================
    // CREATE EVENT
    // ==============================

    const newEvent = new Event({
      eventTitle,
      eventImage,
      dateTime,
      venue,
      capacity,
      description,
      status,

      assignedEmployees: parseArray(assignedEmployees),

requiredItems: parseArray(requiredItems),

technologies: parseArray(technologies),
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully ✅",
      event: newEvent,
    });

  } catch (error) {

    console.error("CREATE EVENT ERROR:", error);

    res.status(500).json({
      message: "Error creating event ❌",
      error: error.message,
    });

  }
};


// ==========================================
// GET ALL EVENTS
// ==========================================
export const getEvents = async (req, res) => {
  try {

    const events = await Event.find()

      // 👩‍💼 Get Employee Details
      .populate("assignedEmployees")

      // 📦 Get Item Details
      .populate("requiredItems")

      // 💻 Get Technology Details
      .populate("technologies");


    res.status(200).json({
      events,
    });

  } catch (error) {

    console.error("GET EVENTS ERROR:", error);

    res.status(500).json({
      message: "Error fetching events",
      error: error.message,
    });

  }
};


// ==========================================
// GET EVENT BY ID
// ==========================================
export const getEventById = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id)

      .populate("assignedEmployees")
      .populate("requiredItems")
      .populate("technologies");


    if (!event) {

      return res.status(404).json({
        message: "Event not found",
      });

    }


    res.status(200).json({
      event,
    });

  } catch (error) {

    console.error("GET EVENT ERROR:", error);

    res.status(500).json({
      message: "Error fetching event",
      error: error.message,
    });

  }
};


// ==========================================
// UPDATE EVENT
// ==========================================
export const updateEvent = async (req, res) => {
  try {

    const {
      eventTitle,
      dateTime,
      venue,
      capacity,
      description,
      status,
      assignedEmployees,
      requiredItems,
      technologies,
    } = req.body;


    // ==============================
    // UPDATE DATA
    // ==============================
    const updateData = {
  eventTitle,
  dateTime,
  venue,
  capacity,
  description,
  status,

  assignedEmployees: parseArray(assignedEmployees),

  requiredItems: parseArray(requiredItems),

  technologies: parseArray(technologies),
};


    // ==============================
    // UPDATE IMAGE ONLY IF PROVIDED
    // ==============================
    if (req.file) {
      updateData.eventImage = req.file.filename;
    }


    const event = await Event.findByIdAndUpdate(

      req.params.id,

      updateData,

      {
        new: true,
        runValidators: true,
      }

    )
      .populate("assignedEmployees")
      .populate("requiredItems")
      .populate("technologies");


    if (!event) {

      return res.status(404).json({
        message: "Event not found",
      });

    }


    res.status(200).json({

      message: "Event updated successfully ✅",

      event,

    });

  } catch (error) {

    console.error("UPDATE EVENT ERROR:", error);

    res.status(500).json({

      message: "Error updating event ❌",

      error: error.message,

    });

  }
};


// ==========================================
// DELETE EVENT
// ==========================================
export const deleteEvent = async (req, res) => {

  try {

    const event = await Event.findByIdAndDelete(
      req.params.id
    );


    if (!event) {

      return res.status(404).json({
        message: "Event not found",
      });

    }


    res.status(200).json({

      message: "Event deleted successfully ✅",

    });


  } catch (error) {

    console.error("DELETE EVENT ERROR:", error);

    res.status(500).json({

      message: "Error deleting event ❌",

      error: error.message,

    });

  }

};