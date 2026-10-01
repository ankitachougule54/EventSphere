import Tech from "../models/Tech.js";

// STORE THE DATA (TECHS)
export const createTech = async (req, res) => {
  try {
    const { title, description, skills, createdBy } = req.body;

    if (!skills) {
      return res.status(400).json({ message: "skills are  required" });
    }

    const newTech = new Tech({
      title,
      description,
      skills,
      createdBy
    });

    await newTech.save();
    res
      .status(201)
      .json({ message: "Tech created successfully", Tech: newTech });
  } catch (error) {
    res.status(500).json({ message: "Error creating Tech", error });
  }
};


// GET ALL techS
export const getTechs = async (req, res) => {
  try {
    const techs = await Tech.find();

    res.status(200).json({ techs });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching techs",
      error: error.message
    });
  }
};

// GET TECH BY ID

export const getTechById = async (req, res) => {
  try {
    const tech = await Tech.findById(req.params.id);

    if (!tech) {
      return res.status(404).json({
        message: "Technology not found"
      });
    }

    res.status(200).json(tech);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE TECH
export const updateTech = async (req, res) => {
  try {
    const { title, description, skills, createdBy } = req.body;
    let updateData = { title, description, skills, createdBy };
    const tech = await Tech.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!tech) return res.status(404).json({ message: "Tech not found" });

    res.status(200).json({ message: "Tech updated successfully", tech });
  } catch (error) {
    res.status(500).json({ message: "Error updating tech", error });
  }
};

// DELETE Tech
export const deleteTech = async (req, res) => {
  try {
    const tech = await Tech.findByIdAndDelete(req.params.id);
    if (!tech) return res.status(404).json({ message: "Tech not found" });
    res.status(200).json({ message: "Tech deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Tech deleting tech", error });
  }
};