import express from "express";

import {
  createGallery,
  getGalleries,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/GalleryController.js";

import upload from "../middlewares/upload.js";

const GalleryRouter = express.Router();

// CREATE GALLERY
GalleryRouter.post("/",upload.single("galleryImage"),createGallery
);

// GET ALL GALLERY IMAGES
GalleryRouter.get("/", getGalleries);

// GET GALLERY BY ID
GalleryRouter.get("/:id", getGalleryById);

// UPDATE GALLERY
GalleryRouter.put("/:id",upload.single("galleryImage"),updateGallery);

// DELETE GALLERY
GalleryRouter.delete("/:id", deleteGallery);

export default GalleryRouter;