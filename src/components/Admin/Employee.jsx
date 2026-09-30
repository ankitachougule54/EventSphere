import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Table,
  Button,
  Container,
  Card,
  InputGroup,
  Badge,
  Spinner,
} from "react-bootstrap";

import axios from "axios";

import {
  MdEdit,
  MdDelete,
  MdSearch,
  MdAdd,
  MdClose,
  MdPeople,
  MdImage,
} from "react-icons/md";

const API_URL = "http://localhost:9000/employee";
const IMAGE_URL = "http://localhost:9000/uploads/";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    position: "",
    department: "",
    salary: "",
    email: "",
    phone: "",
    hireDate: "",
    address: "",
    employeeImage: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // =========================================================
  // FETCH EMPLOYEES
  // =========================================================

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);

      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error("Error fetching employees:", error);

      alert(
        error.response?.data?.message ||
          "Error fetching employees"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "employeeImage") {
      const file = files[0];

      setEmployeeData((previousData) => ({
        ...previousData,
        employeeImage: file,
      }));

      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }

      return;
    }

    setEmployeeData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =========================================================
  // CLEAR FORM
  // =========================================================

  const clearForm = () => {
    setEmployeeData({
      employeeName: "",
      position: "",
      department: "",
      salary: "",
      email: "",
      phone: "",
      hireDate: "",
      address: "",
      employeeImage: null,
    });

    setIsEditMode(false);
    setEmployeeId(null);
    setImagePreview(null);

    const imageInput =
      document.getElementById("employeeImage");

    if (imageInput) {
      imageInput.value = "";
    }
  };

  // =========================================================
  // ADD / UPDATE EMPLOYEE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "employeeName",
        employeeData.employeeName
      );

      formData.append(
        "position",
        employeeData.position
      );

      formData.append(
        "department",
        employeeData.department
      );

      formData.append(
        "salary",
        employeeData.salary
      );

      formData.append(
        "email",
        employeeData.email
      );

      formData.append(
        "phone",
        employeeData.phone
      );

      formData.append(
        "hireDate",
        employeeData.hireDate
      );

      formData.append(
        "address",
        employeeData.address
      );

      if (employeeData.employeeImage) {
        formData.append(
          "employeeImage",
          employeeData.employeeImage
        );
      }

      if (isEditMode && employeeId) {
        await axios.put(
          `${API_URL}/${employeeId}`,
          formData
        );

        alert("Employee updated successfully!");
      } else {
        await axios.post(
          API_URL,
          formData
        );

        alert("Employee added successfully!");
      }

      await fetchEmployees();

      clearForm();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (employee) => {
    setEmployeeData({
      employeeName: employee.employeeName || "",
      position: employee.position || "",
      department: employee.department || "",
      salary: employee.salary || "",
      email: employee.email || "",
      phone: employee.phone || "",

      hireDate: employee.hireDate
        ? employee.hireDate.split("T")[0]
        : "",

      address: employee.address || "",

      employeeImage: null,
    });

    setEmployeeId(employee._id);

    setIsEditMode(true);

    if (employee.employeeImage) {
      setImagePreview(
        `${IMAGE_URL}${employee.employeeImage}`
      );
    } else {
      setImagePreview(null);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      await axios.delete(`${API_URL}/${id}`);

      setEmployees((previousEmployees) =>
        previousEmployees.filter(
          (employee) => employee._id !== id
        )
      );

      if (employeeId === id) {
        clearForm();
      }

      alert("Employee deleted successfully!");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Error deleting employee"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredEmployees = employees.filter(
    (employee) => {
      const searchText = search.toLowerCase();

      return (
        employee.employeeName
          ?.toLowerCase()
          .includes(searchText) ||

        employee.email
          ?.toLowerCase()
          .includes(searchText) ||

        employee.department
          ?.toLowerCase()
          .includes(searchText) ||

        employee.position
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="employee-page">

      <Container>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="employee-header animate-header">

          <div className="header-content">

            <div>

              <div className="small-heading">
                EMPLOYEE MANAGEMENT
              </div>

              <h1>
                Manage Employees
              </h1>

              <p>
                Add, update and manage all employees
                in one place.
              </p>

            </div>

            {/* TOTAL */}

            <div className="total-card animate-total">

              <div className="total-icon">
                <MdPeople />
              </div>

              <div>

                <span>
                  Total Employees
                </span>

                <strong>
                  {employees.length}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <div className="form-card animate-form">

          <div className="form-heading">

            <div className="plus-icon">

              {isEditMode ? (
                <MdEdit />
              ) : (
                <MdAdd />
              )}

            </div>

            <div>

              <h2>
                {isEditMode
                  ? "Edit Employee"
                  : "Add New Employee"}
              </h2>

              <p>
                {isEditMode
                  ? "Update employee information."
                  : "Enter details to add a new employee."}
              </p>

            </div>

          </div>


          {/* FORM */}

          <Form onSubmit={handleSubmit}>

            <Row>

              {/* NAME */}

              <Col md={6}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Employee Name
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="employeeName"
                    placeholder="Enter employee name"
                    value={employeeData.employeeName}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* POSITION */}

              <Col md={6}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Position
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="position"
                    placeholder="Enter position"
                    value={employeeData.position}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* DEPARTMENT */}

              <Col md={6}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Department
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="department"
                    placeholder="Enter department"
                    value={employeeData.department}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* SALARY */}

              <Col md={6}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Salary
                  </Form.Label>

                  <Form.Control
                    type="number"
                    name="salary"
                    placeholder="Enter salary"
                    value={employeeData.salary}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* EMAIL */}

              <Col md={6}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Email
                  </Form.Label>

                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter employee email"
                    value={employeeData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* PHONE */}

              <Col md={6}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Phone Number
                  </Form.Label>

                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={employeeData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* HIRE DATE */}

              <Col md={6}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Hire Date
                  </Form.Label>

                  <Form.Control
                    type="date"
                    name="hireDate"
                    value={employeeData.hireDate}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* IMAGE */}

              <Col md={6}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Employee Image
                  </Form.Label>

                  <Form.Control
                    id="employeeImage"
                    type="file"
                    name="employeeImage"
                    accept="image/*"
                    onChange={handleChange}
                  />

                </div>

              </Col>


              {/* ADDRESS */}

              <Col md={12}>

                <div className="input-group-custom field-animation">

                  <Form.Label>
                    Address
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="address"
                    placeholder="Enter employee address"
                    value={employeeData.address}
                    onChange={handleChange}
                  />

                </div>

              </Col>

            </Row>


            {/* IMAGE PREVIEW */}

            {imagePreview && (

              <div className="image-preview preview-animation">

                <img
                  src={imagePreview}
                  alt="Employee Preview"
                />

                <div>

                  <MdImage size={25} />

                  <span>
                    Employee Image Preview
                  </span>

                </div>

              </div>

            )}


            {/* BUTTONS */}

            <div className="form-buttons">

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                    />

                    <span>
                      Processing...
                    </span>
                  </>
                ) : isEditMode ? (
                  <>
                    <MdEdit />

                    Update Employee
                  </>
                ) : (
                  <>
                    <MdAdd />

                    Add Employee
                  </>
                )}

              </button>


              {isEditMode && (

                <button
                  type="button"
                  className="cancel-button"
                  onClick={clearForm}
                >

                  <MdClose />

                  Cancel

                </button>

              )}

            </div>

          </Form>

        </div>


        {/* =================================================
            LIST HEADER
        ================================================= */}

        <div className="list-header animate-list">

          <div>

            <div className="small-heading">
              YOUR EMPLOYEES
            </div>

            <h2>
              Employee List
            </h2>

            <p>
              Manage all available employees.
            </p>

          </div>


          {/* SEARCH */}

          <InputGroup className="search-box">

            <InputGroup.Text>
              <MdSearch />
            </InputGroup.Text>

            <Form.Control
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </InputGroup>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="table-card animate-table">

          <div className="table-responsive">

            <Table className="employee-table">

              <thead>

                <tr>

                  <th>#</th>
                  <th>Image</th>
                  <th>Employee</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Contact</th>
                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="loading-cell"
                    >

                      <Spinner animation="border" />

                      <p>
                        Loading employees...
                      </p>

                    </td>

                  </tr>

                ) : filteredEmployees.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="empty-cell"
                    >

                      <MdPeople size={45} />

                      <h4>
                        No Employees Found
                      </h4>

                      <p>
                        Add your first employee
                        using the form above.
                      </p>

                    </td>

                  </tr>

                ) : (

                  filteredEmployees.map(
                    (employee, index) => (

                      <tr
                        key={employee._id}
                        className="employee-row"
                        style={{
                          animationDelay:
                            `${index * 0.08}s`,
                        }}
                      >

                        <td>
                          {index + 1}
                        </td>


                        {/* IMAGE */}

                        <td>

                          {employee.employeeImage ? (

                            <img
                              src={`${IMAGE_URL}${employee.employeeImage}`}
                              alt={employee.employeeName}
                              className="employee-image"
                            />

                          ) : (

                            <div className="no-image">
                              <MdImage />
                            </div>

                          )}

                        </td>


                        {/* EMPLOYEE */}

                        <td>

                          <div className="employee-name">
                            {employee.employeeName}
                          </div>

                          <div className="employee-email">
                            {employee.email}
                          </div>

                        </td>


                        {/* POSITION */}

                        <td>
                          {employee.position}
                        </td>


                        {/* DEPARTMENT */}

                        <td>

                          <span className="department-badge">
                            {employee.department}
                          </span>

                        </td>


                        {/* SALARY */}

                        <td className="salary">
                          ₹ {employee.salary}
                        </td>


                        {/* PHONE */}

                        <td>
                          {employee.phone}
                        </td>


                        {/* ACTIONS */}

                        <td>

                          <button
                            className="edit-button"
                            onClick={() =>
                              handleEdit(employee)
                            }
                            title="Edit"
                          >

                            <MdEdit />

                          </button>


                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                employee._id
                              )
                            }
                            title="Delete"
                          >

                            <MdDelete />

                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </Table>

          </div>

        </div>

      </Container>


      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }


        /* ==============================================
           MAIN PAGE
        ============================================== */

        .employee-page {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at top right,
              rgba(0, 119, 255, 0.12),
              transparent 35%
            ),
            #06182b;

          color: white;

          padding: 40px 0 90px;

          overflow: hidden;
        }


        /* ==============================================
           PAGE ANIMATIONS
        ============================================== */

        @keyframes fadeDown {

          from {
            opacity: 0;
            transform: translateY(-35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        @keyframes fadeUp {

          from {
            opacity: 0;
            transform: translateY(40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        @keyframes scaleIn {

          from {
            opacity: 0;
            transform: scale(0.85);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }

        }


        @keyframes slideRight {

          from {
            opacity: 0;
            transform: translateX(-35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }

        }


        @keyframes rowAppear {

          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        .animate-header {
          animation: fadeDown 0.8s ease forwards;
        }


        .animate-total {
          animation: scaleIn 0.9s ease 0.2s both;
        }


        .animate-form {
          animation: fadeUp 0.8s ease 0.2s both;
        }


        .animate-list {
          animation: slideRight 0.8s ease 0.3s both;
        }


        .animate-table {
          animation: fadeUp 0.8s ease 0.4s both;
        }


        .field-animation {
          animation: fadeUp 0.6s ease both;
        }


        .employee-row {
          animation: rowAppear 0.5s ease both;
        }


        /* ==============================================
           HEADER
        ============================================== */

        .employee-header {

          background: #0b223b;

          border: 1px solid #087dcc;

          border-radius: 24px;

          padding: 48px 50px;

          margin-bottom: 50px;

          box-shadow:
            0 0 30px rgba(0, 126, 255, 0.05);

          transition: 0.3s ease;
        }


        .employee-header:hover {

          box-shadow:
            0 0 35px rgba(0, 126, 255, 0.15);

        }


        .header-content {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 30px;

        }


        .small-heading {

          color: #199cff;

          font-size: 14px;

          font-weight: 700;

          letter-spacing: 4px;

          margin-bottom: 20px;

        }


        .employee-header h1 {

          color: white;

          font-size: 50px;

          font-weight: 800;

          margin: 0 0 12px;

        }


        .employee-header p {

          color: #8eaccb;

          font-size: 20px;

          margin: 0;

        }


        /* ==============================================
           TOTAL CARD
        ============================================== */

        .total-card {

          min-width: 265px;

          background: #102e4b;

          border: 1px solid #167fc5;

          border-radius: 20px;

          padding: 25px 30px;

          display: flex;

          align-items: center;

          gap: 20px;

          transition: 0.3s ease;

        }


        .total-card:hover {

          transform: translateY(-5px);

          border-color: #199cff;

          box-shadow:
            0 10px 30px rgba(0, 126, 255, 0.2);

        }


        .total-icon {

          width: 62px;

          height: 62px;

          border-radius: 50%;

          background: #0879ec;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 32px;

          color: white;

          box-shadow:
            0 0 25px rgba(0, 125, 255, 0.5);

          transition: 0.3s ease;

        }


        .total-card:hover .total-icon {

          transform: rotate(8deg) scale(1.08);

        }


        .total-card span {

          display: block;

          color: #8da9c6;

          font-size: 16px;

          margin-bottom: 3px;

        }


        .total-card strong {

          display: block;

          color: white;

          font-size: 34px;

          line-height: 1;

        }


        /* ==============================================
           FORM
        ============================================== */

        .form-card {

          background: #0b223b;

          border: 1px solid #087dcc;

          border-radius: 24px;

          padding: 55px 60px;

          margin-bottom: 60px;

          box-shadow:
            0 0 30px rgba(0, 126, 255, 0.04);

          transition: 0.3s ease;

        }


        .form-card:hover {

          border-color: #168ef0;

          box-shadow:
            0 0 35px rgba(0, 126, 255, 0.1);

        }


        .form-heading {

          display: flex;

          align-items: center;

          gap: 22px;

          margin-bottom: 42px;

        }


        .plus-icon {

          width: 74px;

          height: 74px;

          border-radius: 50%;

          background: #0879ec;

          color: white;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 36px;

          flex-shrink: 0;

          box-shadow:
            0 0 25px rgba(0, 125, 255, 0.45);

          animation: scaleIn 0.8s ease;

          transition: 0.3s ease;

        }


        .plus-icon:hover {

          transform: rotate(90deg) scale(1.08);

        }


        .form-heading h2 {

          color: white;

          font-size: 36px;

          font-weight: 750;

          margin: 0 0 5px;

        }


        .form-heading p {

          color: #91adca;

          font-size: 18px;

          margin: 0;

        }


        /* ==============================================
           INPUTS
        ============================================== */

        .input-group-custom {

          margin-bottom: 28px;

        }


        .input-group-custom label {

          color: white;

          font-size: 17px;

          font-weight: 650;

          margin-bottom: 11px;

          display: block;

        }


        .input-group-custom .form-control {

          background: #143654;

          color: white;

          border: 1px solid #267eb4;

          border-radius: 14px;

          padding: 17px 20px;

          font-size: 16px;

          min-height: 64px;

          box-shadow: none;

          transition: 0.25s ease;

        }


        .input-group-custom textarea.form-control {

          min-height: 120px;

          resize: vertical;

        }


        .input-group-custom .form-control::placeholder {

          color: #7898b8;

        }


        .input-group-custom .form-control:hover {

          border-color: #398fc5;

          transform: translateY(-1px);

        }


        .input-group-custom .form-control:focus {

          background: #143654;

          color: white;

          border-color: #168ef0;

          box-shadow:
            0 0 0 3px rgba(0, 126, 255, 0.13);

          transform: translateY(-2px);

        }


        /* DATE */

        .input-group-custom input[type="date"] {

          color-scheme: dark;

        }


        /* FILE */

        .input-group-custom input[type="file"] {

          padding: 10px;

        }


        .input-group-custom
        input[type="file"]::file-selector-button {

          background: #f1f3f5;

          color: #17212b;

          border: none;

          border-radius: 6px;

          padding: 9px 13px;

          margin-right: 8px;

          cursor: pointer;

          transition: 0.2s;

        }


        .input-group-custom
        input[type="file"]::file-selector-button:hover {

          background: white;

          transform: scale(1.03);

        }


        /* ==============================================
           IMAGE PREVIEW
        ============================================== */

        .image-preview {

          display: flex;

          align-items: center;

          gap: 20px;

          background: #102e4b;

          border: 1px dashed #2982ba;

          border-radius: 16px;

          padding: 18px;

          margin-top: 5px;

        }


        .preview-animation {

          animation: scaleIn 0.5s ease;

        }


        .image-preview img {

          width: 85px;

          height: 85px;

          object-fit: cover;

          border-radius: 50%;

          border: 2px solid #168ef0;

          transition: 0.3s ease;

        }


        .image-preview img:hover {

          transform: scale(1.08);

          box-shadow:
            0 0 20px rgba(0, 142, 240, 0.4);

        }


        .image-preview div {

          color: #a2bad2;

          display: flex;

          align-items: center;

          gap: 8px;

        }


        /* ==============================================
           BUTTONS
        ============================================== */

        .form-buttons {

          display: flex;

          gap: 12px;

          margin-top: 30px;

        }


        .primary-button,
        .cancel-button {

          border: none;

          border-radius: 10px;

          padding: 13px 25px;

          font-size: 16px;

          font-weight: 650;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          cursor: pointer;

          transition: 0.25s ease;

        }


        .primary-button {

          background: #0879ec;

          color: white;

          box-shadow:
            0 5px 20px rgba(0, 121, 236, 0.2);

        }


        .primary-button:hover {

          background: #168cf5;

          transform: translateY(-3px);

          box-shadow:
            0 8px 25px rgba(0, 121, 236, 0.35);

        }


        .primary-button:active {

          transform: scale(0.97);

        }


        .primary-button:disabled {

          opacity: 0.7;

          cursor: not-allowed;

          transform: none;

        }


        .cancel-button {

          background: #263b50;

          color: #d8e3ee;

          border: 1px solid #405a73;

        }


        .cancel-button:hover {

          background: #344e67;

          transform: translateY(-2px);

        }


        /* ==============================================
           LIST HEADER
        ============================================== */

        .list-header {

          display: flex;

          justify-content: space-between;

          align-items: flex-end;

          gap: 25px;

          margin-bottom: 30px;

        }


        .list-header .small-heading {

          margin-bottom: 12px;

        }


        .list-header h2 {

          color: white;

          font-size: 36px;

          font-weight: 750;

          margin: 0 0 5px;

        }


        .list-header p {

          color: #8da8c4;

          margin: 0;

          font-size: 17px;

        }


        /* ==============================================
           SEARCH
        ============================================== */

        .search-box {

          max-width: 360px;

        }


        .search-box .input-group-text {

          background: #143654;

          color: #7fa1c2;

          border: 1px solid #267eb4;

          border-right: none;

          padding-left: 17px;

          font-size: 21px;

        }


        .search-box .form-control {

          background: #143654;

          color: white;

          border: 1px solid #267eb4;

          border-left: none;

          min-height: 50px;

          box-shadow: none;

          transition: 0.25s;

        }


        .search-box .form-control::placeholder {

          color: #7898b8;

        }


        .search-box .form-control:focus {

          background: #143654;

          color: white;

          border-color: #168ef0;

          box-shadow: none;

        }


        /* ==============================================
           TABLE
        ============================================== */

        .table-card {

          background: #0b223b;

          border: 1px solid #087dcc;

          border-radius: 20px;

          overflow: hidden;

          box-shadow:
            0 0 30px rgba(0, 126, 255, 0.04);

          transition: 0.3s ease;

        }


        .table-card:hover {

          box-shadow:
            0 0 35px rgba(0, 126, 255, 0.12);

        }


        .employee-table {

          margin: 0;

          color: #dce8f3;

          vertical-align: middle;

        }


        .employee-table thead {

          background: #102e4b;

        }


        .employee-table thead th {

          background: #102e4b;

          color: white;

          border-bottom: 1px solid #1d5e8a;

          padding: 18px 15px;

          font-size: 14px;

          letter-spacing: 0.5px;

          white-space: nowrap;

        }


        .employee-table tbody tr {

          background: #0b223b;

          border-bottom: 1px solid #183b58;

          transition: 0.25s ease;

        }


        .employee-table tbody tr:hover {

          background: #102d48;

          transform: scale(1.002);

        }


        .employee-table tbody tr:last-child {

          border-bottom: none;

        }


        .employee-table tbody td {

          color: #c7d8e8;

          padding: 17px 15px;

          border: none;

          white-space: nowrap;

        }


        /* ==============================================
           EMPLOYEE IMAGE
        ============================================== */

        .employee-image {

          width: 52px;

          height: 52px;

          object-fit: cover;

          border-radius: 50%;

          border: 2px solid #168ef0;

          transition: 0.3s ease;

        }


        .employee-image:hover {

          transform: scale(1.15);

          box-shadow:
            0 0 18px rgba(22, 142, 240, 0.45);

        }


        .no-image {

          width: 52px;

          height: 52px;

          border-radius: 50%;

          background: #143654;

          border: 1px solid #286789;

          display: flex;

          align-items: center;

          justify-content: center;

          color: #7295b4;

          font-size: 24px;

        }


        /* ==============================================
           EMPLOYEE DETAILS
        ============================================== */

        .employee-name {

          color: white;

          font-size: 16px;

          font-weight: 700;

          margin-bottom: 3px;

        }


        .employee-email {

          color: #7697b5;

          font-size: 13px;

        }


        .department-badge {

          display: inline-block;

          background: #143654;

          color: #91c9f5;

          border: 1px solid #286c99;

          padding: 7px 13px;

          border-radius: 20px;

          font-size: 13px;

          font-weight: 600;

          transition: 0.2s;

        }


        .department-badge:hover {

          background: #174363;

          border-color: #168ef0;

        }


        .salary {

          color: #8ecbff !important;

          font-weight: 700;

        }


        /* ==============================================
           ACTION BUTTONS
        ============================================== */

        .edit-button,
        .delete-button {

          width: 38px;

          height: 38px;

          border-radius: 9px;

          border: none;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          cursor: pointer;

          font-size: 19px;

          transition: 0.25s ease;

          margin-right: 7px;

        }


        .edit-button {

          background: #b77b16;

          color: white;

        }


        .edit-button:hover {

          background: #d89720;

          transform:
            translateY(-3px)
            rotate(-5deg);

          box-shadow:
            0 6px 15px rgba(215, 151, 32, 0.25);

        }


        .delete-button {

          background: #b52c3b;

          color: white;

        }


        .delete-button:hover {

          background: #d93649;

          transform:
            translateY(-3px)
            rotate(5deg);

          box-shadow:
            0 6px 15px rgba(217, 54, 73, 0.25);

        }


        /* ==============================================
           LOADING
        ============================================== */

        .loading-cell {

          padding: 60px !important;

          text-align: center;

          color: #8da8c4 !important;

        }


        .loading-cell .spinner-border {

          color: #168ef0;

        }


        .loading-cell p {

          margin-top: 12px;

          margin-bottom: 0;

        }


        /* ==============================================
           EMPTY
        ============================================== */

        .empty-cell {

          padding: 70px 20px !important;

          text-align: center;

          color: #718fab !important;

        }


        .empty-cell svg {

          color: #187fc8;

          margin-bottom: 15px;

        }


        .empty-cell h4 {

          color: white;

          margin-bottom: 8px;

        }


        .empty-cell p {

          color: #7898b5;

          margin: 0;

        }


        /* ==============================================
           RESPONSIVE
        ============================================== */

        @media (max-width: 992px) {

          .employee-header h1 {

            font-size: 40px;

          }


          .form-card {

            padding: 40px 35px;

          }


          .employee-header {

            padding: 35px;

          }

        }


        @media (max-width: 768px) {

          .employee-page {

            padding: 20px 0 60px;

          }


          .employee-header {

            padding: 28px 22px;

            border-radius: 18px;

          }


          .header-content {

            flex-direction: column;

            align-items: flex-start;

          }


          .employee-header h1 {

            font-size: 34px;

          }


          .employee-header p {

            font-size: 16px;

          }


          .total-card {

            width: 100%;

            min-width: 0;

          }


          .form-card {

            padding: 30px 20px;

            border-radius: 18px;

          }


          .form-heading h2 {

            font-size: 28px;

          }


          .form-heading p {

            font-size: 15px;

          }


          .list-header {

            flex-direction: column;

            align-items: stretch;

          }


          .search-box {

            max-width: 100%;

          }

        }

      `}</style>

    </div>
  );
};

export default Employee;