
import Employee from "../models/Employee.js";

// CREATE EMPLOYEE
export const createEmployee = async (req, res) => {
  try {
    const {
      employeeName,
      position,
      department,
      salary,
      email,
      phone,
      hireDate,
      address,
    } = req.body;

    // Get uploaded image filename
    const employeeImage = req.file ? req.file.filename : null;

    // Check image
    if (!employeeImage) {
      return res.status(400).json({
        message: "Employee image is required",
      });
    }

    // Create new employee
    const newEmployee = new Employee({
      employeeName,
      employeeImage,
      position,
      department,
      salary,
      email,
      phone,
      hireDate,
      address,
    });

    // Save to MongoDB
    await newEmployee.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating employee",
      error,
    });
  }
};


// GET ALL EMPLOYEES
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employees",
      error,
    });
  }
};


// GET EMPLOYEE BY ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employee",
      error,
    });
  }
};


// UPDATE EMPLOYEE
export const updateEmployee = async (req, res) => {
  try {
    const {
      employeeName,
      position,
      department,
      salary,
      email,
      phone,
      hireDate,
      address,
    } = req.body;

    // Data to update
    let updateData = {
      employeeName,
      position,
      department,
      salary,
      email,
      phone,
      hireDate,
      address,
    };

    // Update image only if a new image is uploaded
    if (req.file) {
      updateData.employeeImage = req.file.filename;
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating employee",
      error,
    });
  }
};


// DELETE EMPLOYEE
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting employee",
      error,
    });
  }
};