import { Gallery } from "../models/Gallery.js";

// ================= CREATE GALLERY =================

export const createGallery = async (req, res) => {
  try {
    const { title, event, description } = req.body;

    const galleryImage = req.file ? req.file.filename : null;

    // Check image
    if (!galleryImage) {
      return res.status(400).json({
        message: "Gallery image is required",
      });
    }

    // Create gallery
    const newGallery = await Gallery.create({
      title,
      event,
      description,
      galleryImage,
    });

    res.status(201).json({
      message: "Gallery image uploaded successfully",
      gallery: newGallery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating gallery",
      error: error.message,
    });
  }
};


// ================= GET ALL GALLERY IMAGES =================

export const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();

    res.status(200).json({
      galleries,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching gallery",
      error: error.message,
    });
  }
};


// ================= GET GALLERY BY ID =================

export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching gallery image",
      error: error.message,
    });
  }
};


// ================= UPDATE GALLERY =================

export const updateGallery = async (req, res) => {
  try {
    const { title, event, description } = req.body;

    const updateData = {
      title,
      event,
      description,
    };

    // If a new image is uploaded
    if (req.file) {
      updateData.galleryImage = req.file.filename;
    }

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      message: "Gallery updated successfully",
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating gallery",
      error: error.message,
    });
  }
};


// ================= DELETE GALLERY =================

export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(
      req.params.id
    );

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      message: "Gallery deleted successfully",
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting gallery",
      error: error.message,
    });
  }
};