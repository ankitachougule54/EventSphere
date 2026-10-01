import express from "express";

import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../controllers/EmployeeController.js";

import upload from "../middlewares/upload.js";

const employeeRouter = express.Router();

// CREATE EMPLOYEE
employeeRouter.post("/",upload.single("employeeImage"),createEmployee);

// GET ALL EMPLOYEES
employeeRouter.get("/", getEmployees);

// GET EMPLOYEE BY ID
employeeRouter.get("/:id", getEmployeeById);

// UPDATE EMPLOYEE
employeeRouter.put("/:id",upload.single("employeeImage"),updateEmployee);

// DELETE EMPLOYEE
employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;