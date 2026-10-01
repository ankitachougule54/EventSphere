import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  changePassword,
  getUsers,
  updateProfile,
  getUserProfile,
  createAdminUser
} from "../controllers/UserController.js";

import profileUpload from "../middlewares/profileUpload.js";

import { authenticateUser } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const UserRouter = express.Router();


// ===============================
// PUBLIC ROUTES
// ===============================

// REGISTER USER
UserRouter.post(
  "/register",
  profileUpload.single("profileImage"),
  registerUser
);

UserRouter.post(
  "/create-admin",
  profileUpload.single("profileImage"),
  createAdminUser
);

// LOGIN
UserRouter.post(
  "/login",
  loginUser
);


// FORGOT PASSWORD
UserRouter.post(
  "/forgot-password",
  forgotPassword
);


// CHANGE PASSWORD
UserRouter.post(
  "/change-password",
  changePassword
);


// ===============================
// ADMIN ONLY ROUTES
// ===============================

// GET ALL USERS
UserRouter.get(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  getUsers
);


// ===============================
// AUTHENTICATED USER ROUTES
// ===============================

// GET USER PROFILE
UserRouter.get(
  "/profile",
  authenticateUser,
  getUserProfile
);


// UPDATE USER PROFILE
UserRouter.put(
  "/profile",
  authenticateUser,
  profileUpload.single("profileImage"),
  updateProfile
);


export default UserRouter;