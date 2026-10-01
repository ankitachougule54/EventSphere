import express from "express";

import upload from "../middlewares/profileUpload.js";

import {
  getAdminProfile,
  getDashboardData,
  updateAdminProfile,
} from "../controllers/AdminController.js";

import {
  authenticateUser,
} from "../middlewares/authMiddleware.js";

import {
  authorizeRoles,
} from "../middlewares/roleMiddleware.js";


const AdminRouter = express.Router();


// ==========================================
// ADMIN DASHBOARD
// ==========================================

AdminRouter.get(
  "/dashboard",

  authenticateUser,

  authorizeRoles("admin"),

  getDashboardData
);


// ==========================================
// GET ADMIN PROFILE
// ==========================================

AdminRouter.get(
  "/",

  authenticateUser,

  authorizeRoles("admin"),

  getAdminProfile
);


// ==========================================
// UPDATE ADMIN PROFILE
// ==========================================

AdminRouter.put(
  "/",

  authenticateUser,

  authorizeRoles("admin"),

  upload.single("profileImage"),

  updateAdminProfile
);


export default AdminRouter;