import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";

// ==========================================
// API URLS
// ==========================================

const EVENT_API = "https://eventsphere-5fey.onrender.com/events";
const EMPLOYEE_API = "https://eventsphere-5fey.onrender.com/employee";
const ITEM_API = "https://eventsphere-5fey.onrender.com/item";
const TECH_API = "https://eventsphere-5fey.onrender.com/tech";

// ==========================================
// CREATE EVENT COMPONENT
// ==========================================

export default function CreateEvent() {

  // ==========================================
  // EVENT FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    eventTitle: "",
    dateTime: "",
    venue: "",
    capacity: "",
    description: "",
    status: "Upcoming",
    assignedEmployees: [],
    requiredItems: [],
    technologies: [],
  });

  // ==========================================
  // EVENT IMAGE
  // ==========================================

  const [eventImage, setEventImage] = useState(null);

  // ==========================================
  // DATABASE DATA
  // ==========================================

  const [employees, setEmployees] = useState([]);
  const [items, setItems] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // MESSAGE STATES
  // ==========================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // FETCH DATA
  // ==========================================

  const fetchData = async () => {

    try {

      setLoading(true);
      setError("");

      const [
        employeeResponse,
        itemResponse,
        techResponse,
      ] = await Promise.all([

        axios.get(EMPLOYEE_API),
        axios.get(ITEM_API),
        axios.get(TECH_API),

      ]);

      // EMPLOYEES

      setEmployees(
        employeeResponse.data.employees ||
        employeeResponse.data ||
        []
      );

      // ITEMS

      setItems(
        itemResponse.data.items ||
        itemResponse.data ||
        []
      );

      // TECHNOLOGIES

      setTechnologies(
        techResponse.data.techs ||
        techResponse.data.technologies ||
        techResponse.data ||
        []
      );

    } catch (error) {

      console.error(
        "FETCH DATA ERROR:",
        error
      );

      setError(
        "Failed to load employees, items or technologies."
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    fetchData();

  }, []);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ==========================================
  // HANDLE EVENT IMAGE
  // ==========================================

  const handleImageChange = (e) => {

    if (e.target.files && e.target.files[0]) {

      setEventImage(
        e.target.files[0]
      );

    }

  };

  // ==========================================
  // SELECT EMPLOYEE
  // ==========================================

  const handleEmployeeSelect = (id) => {

    setFormData((prev) => ({

      ...prev,

      assignedEmployees:

        prev.assignedEmployees.includes(id)

          ? prev.assignedEmployees.filter(
              (employeeId) =>
                employeeId !== id
            )

          : [
              ...prev.assignedEmployees,
              id,
            ],

    }));

  };

  // ==========================================
  // SELECT ITEM
  // ==========================================

  const handleItemSelect = (id) => {

    setFormData((prev) => ({

      ...prev,

      requiredItems:

        prev.requiredItems.includes(id)

          ? prev.requiredItems.filter(
              (itemId) =>
                itemId !== id
            )

          : [
              ...prev.requiredItems,
              id,
            ],

    }));

  };

  // ==========================================
  // SELECT TECHNOLOGY
  // ==========================================

  const handleTechnologySelect = (id) => {

    setFormData((prev) => ({

      ...prev,

      technologies:

        prev.technologies.includes(id)

          ? prev.technologies.filter(
              (techId) =>
                techId !== id
            )

          : [
              ...prev.technologies,
              id,
            ],

    }));

  };

  // ==========================================
  // CREATE EVENT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);
      setError("");
      setSuccess("");

      // ======================================
      // CREATE MULTIPART FORM DATA
      // ======================================

      const data = new FormData();

      data.append(
        "eventTitle",
        formData.eventTitle
      );

      data.append(
        "dateTime",
        formData.dateTime
      );

      data.append(
        "venue",
        formData.venue
      );

      data.append(
        "capacity",
        formData.capacity
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "status",
        formData.status
      );

      // ======================================
      // EVENT IMAGE
      // ======================================

      if (eventImage) {

        data.append(
          "eventImage",
          eventImage
        );

      }

      // ======================================
      // EMPLOYEES
      // ======================================

      data.append(
        "assignedEmployees",
        JSON.stringify(
          formData.assignedEmployees
        )
      );

      // ======================================
      // ITEMS
      // ======================================

      data.append(
        "requiredItems",
        JSON.stringify(
          formData.requiredItems
        )
      );

      // ======================================
      // TECHNOLOGIES
      // ======================================

      data.append(
        "technologies",
        JSON.stringify(
          formData.technologies
        )
      );

      // ======================================
      // API REQUEST
      // ======================================

      const response = await axios.post(

        `${EVENT_API}/createEvent`,

        data

      );

      console.log(
        "CREATE EVENT:",
        response.data
      );

      setSuccess(
        "Event created successfully! 🎉"
      );

      // ======================================
      // RESET FORM
      // ======================================

      setFormData({

        eventTitle: "",

        dateTime: "",

        venue: "",

        capacity: "",

        description: "",

        status: "Upcoming",

        assignedEmployees: [],

        requiredItems: [],

        technologies: [],

      });

      setEventImage(null);

      // Reset file input

      const fileInput =
        document.getElementById("eventImage");

      if (fileInput) {

        fileInput.value = "";

      }

    } catch (error) {

      console.error(
        "CREATE EVENT ERROR:",
        error
      );

      setError(

        error.response?.data?.message ||

        "Failed to create event"

      );

    } finally {

      setSubmitting(false);

    }

  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const handleReset = () => {

    setFormData({

      eventTitle: "",

      dateTime: "",

      venue: "",

      capacity: "",

      description: "",

      status: "Upcoming",

      assignedEmployees: [],

      requiredItems: [],

      technologies: [],

    });

    setEventImage(null);

    const fileInput =
      document.getElementById("eventImage");

    if (fileInput) {

      fileInput.value = "";

    }

    setError("");
    setSuccess("");

  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="create-event-page">

        <div className="loading-container">

          <Spinner animation="border" />

          <p>
            Loading Event Data...
          </p>

        </div>

      </div>

    );

  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="create-event-page">

      <style>

        {`

        .create-event-page {

          min-height: 100vh;

          padding: 40px 15px;

          background:

            linear-gradient(
              135deg,
              #071525,
              #0B1D31,
              #071525
            );

          color: #F1F5F9;

        }


        .create-event-header {

          text-align: center;

          margin-bottom: 35px;

        }


        .create-event-header h1 {

          font-size: 42px;

          font-weight: 700;

          margin-bottom: 8px;

          color: #F1F5F9;

        }


        .create-event-header p {

          color: #AFC3D8;

          font-size: 17px;

        }


        .event-card {

          background:

            linear-gradient(
              145deg,
              #102238,
              #0C1C2E
            ) !important;

          border:

            1px solid #1E4E78 !important;

          border-radius: 15px !important;

          box-shadow:

            0 20px 50px
            rgba(0,0,0,0.35);

          color: white;

        }


        .section-title {

          font-size: 22px;

          font-weight: 700;

          color: #F1F5F9;

          margin-bottom: 25px;

        }


        .event-card .form-label {

          color: #AFC3D8;

          font-weight: 600;

        }


        .event-card .form-control,

        .event-card .form-select {

          background: #0D1D30;

          border: 1px solid #275477;

          color: #F1F5F9;

          padding: 12px;

          border-radius: 9px;

        }


        .event-card .form-control:focus,

        .event-card .form-select:focus {

          background: #10263D;

          color: white;

          border-color: #3478D4;

          box-shadow:

            0 0 0 3px
            rgba(52,120,212,0.18);

        }


        .event-card select option {

          background: #102238;

          color: white;

        }


        .required {

          color: #FF5C70;

        }


        .selection-card {

          background:

            linear-gradient(
              145deg,
              #102238,
              #0C1C2E
            );

          border:

            1px solid #1E4E78;

          border-radius: 14px;

          padding: 20px;

          height: 100%;

        }


        .selection-card h4 {

          font-size: 20px;

          font-weight: 700;

          margin-bottom: 18px;

        }


        .selection-list {

          max-height: 280px;

          overflow-y: auto;

          border:

            1px solid #234764;

          border-radius: 10px;

          background: #0B1B2C;

          padding: 10px;

        }


        .selection-item {

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 12px;

          margin-bottom: 8px;

          border-radius: 8px;

          cursor: pointer;

          transition: 0.3s;

        }


        .selection-item:hover {

          background: #162C43;

        }


        .selection-item.selected {

          background: #17395A;

          border:

            1px solid #3478D4;

        }


        .selection-item input {

          width: 18px;

          height: 18px;

          cursor: pointer;

        }


        .item-name {

          font-weight: 600;

          color: #F1F5F9;

        }


        .item-info {

          font-size: 13px;

          color: #8FA9C2;

        }


        .create-btn {

          background:

            linear-gradient(
              135deg,
              #3478D4,
              #1D5FBD
            );

          border: none;

          padding: 12px 25px;

          font-weight: 600;

          border-radius: 9px;

        }


        .create-btn:hover {

          background:

            linear-gradient(
              135deg,
              #4087E5,
              #246ACB
            );

          transform:

            translateY(-1px);

        }


        .reset-btn {

          background: #172D42;

          border:

            1px solid #42617A;

          color: #E5EDF5;

          padding: 12px 25px;

          border-radius: 9px;

        }


        .reset-btn:hover {

          background: #223F5A;

        }


        .loading-container {

          min-height: 80vh;

          display: flex;

          flex-direction: column;

          justify-content: center;

          align-items: center;

          color: white;

        }


        @media (max-width: 768px) {

          .create-event-header h1 {

            font-size: 32px;

          }

        }

        `}

      </style>


      <Container fluid>


        {/* HEADER */}

        <div className="create-event-header">

          <h1>
            📅 Create Event
          </h1>


          <p>

            Fill in the details and assign
            employees, items and technologies
            for your event.

          </p>

        </div>


        <Form onSubmit={handleSubmit}>


          {error && (

            <Alert variant="danger">

              {error}

            </Alert>

          )}


          {success && (

            <Alert variant="success">

              {success}

            </Alert>

          )}


          {/* EVENT DETAILS */}

          <Card className="event-card mb-4">

            <Card.Body className="p-4">


              <h3 className="section-title">

                📅 Event Details

              </h3>


              <Row>


                {/* EVENT TITLE */}

                <Col md={4}>

                  <Form.Group className="mb-3">

                    <Form.Label>

                      Event Title

                      <span className="required">

                        {" "}*

                      </span>

                    </Form.Label>


                    <Form.Control

                      type="text"

                      name="eventTitle"

                      placeholder="Enter event title"

                      value={formData.eventTitle}

                      onChange={handleChange}

                      required

                    />

                  </Form.Group>

                </Col>


                {/* DATE TIME */}

                <Col md={4}>

                  <Form.Group className="mb-3">

                    <Form.Label>

                      Date & Time

                      <span className="required">

                        {" "}*

                      </span>

                    </Form.Label>


                    <Form.Control

                      type="datetime-local"

                      name="dateTime"

                      value={formData.dateTime}

                      onChange={handleChange}

                      required

                    />

                  </Form.Group>

                </Col>


                {/* VENUE */}

                <Col md={4}>

                  <Form.Group className="mb-3">

                    <Form.Label>

                      Venue

                      <span className="required">

                        {" "}*

                      </span>

                    </Form.Label>


                    <Form.Control

                      type="text"

                      name="venue"

                      placeholder="Enter event venue"

                      value={formData.venue}

                      onChange={handleChange}

                      required

                    />

                  </Form.Group>

                </Col>


                {/* CAPACITY */}

                <Col md={4}>

                  <Form.Group className="mb-3">

                    <Form.Label>

                      Capacity

                      <span className="required">

                        {" "}*

                      </span>

                    </Form.Label>


                    <Form.Control

                      type="number"

                      name="capacity"

                      min="1"

                      placeholder="Enter capacity"

                      value={formData.capacity}

                      onChange={handleChange}

                      required

                    />

                  </Form.Group>

                </Col>


                {/* DESCRIPTION */}

                <Col md={4}>

                  <Form.Group className="mb-3">

                    <Form.Label>

                      Description

                    </Form.Label>


                    <Form.Control

                      as="textarea"

                      rows={3}

                      name="description"

                      placeholder="Enter event description"

                      value={formData.description}

                      onChange={handleChange}

                    />

                  </Form.Group>

                </Col>


                {/* STATUS */}

                <Col md={4}>

                  <Form.Group className="mb-3">

                    <Form.Label>

                      Status

                    </Form.Label>


                    <Form.Select

                      name="status"

                      value={formData.status}

                      onChange={handleChange}

                    >

                      <option value="Upcoming">

                        🟢 Upcoming

                      </option>


                      <option value="Completed">

                        ⚪ Completed

                      </option>


                      <option value="Cancelled">

                        🔴 Cancelled

                      </option>

                    </Form.Select>

                  </Form.Group>

                </Col>


                {/* EVENT IMAGE */}

                <Col md={6}>

                  <Form.Group className="mb-3">

                    <Form.Label>

                      🖼️ Event Banner / Image

                    </Form.Label>


                    <Form.Control

                      id="eventImage"

                      type="file"

                      accept="image/*"

                      onChange={handleImageChange}

                    />

                  </Form.Group>

                </Col>


              </Row>


            </Card.Body>

          </Card>


          {/* ASSIGNMENTS */}

          <Row>


            {/* EMPLOYEES */}

            <Col lg={4} className="mb-3">

              <div className="selection-card">

                <h4>
                  👥 Assign Employees
                </h4>


                <div className="selection-list">

                  {employees.length === 0 ? (

                    <p className="text-center text-muted">

                      No employees found

                    </p>

                  ) : (

                    employees.map((employee) => (

                      <div

                        key={employee._id}

                        className={

                          `selection-item ` +

                          (

                            formData.assignedEmployees.includes(

                              employee._id

                            )

                              ? "selected"

                              : ""

                          )

                        }

                      >

                        <input

                          type="checkbox"

                          checked={

                            formData.assignedEmployees.includes(

                              employee._id

                            )

                          }

                          onChange={() =>

                            handleEmployeeSelect(

                              employee._id

                            )

                          }

                        />


                        <div>

                          <div className="item-name">

                            {employee.employeeName}

                          </div>


                          <div className="item-info">

                            {employee.position}

                          </div>

                        </div>

                      </div>

                    ))

                  )}

                </div>

              </div>

            </Col>


            {/* ITEMS */}

            <Col lg={4} className="mb-3">

              <div className="selection-card">

                <h4>
                  📦 Required Items
                </h4>


                <div className="selection-list">

                  {items.length === 0 ? (

                    <p className="text-center text-muted">

                      No items found

                    </p>

                  ) : (

                    items.map((item) => (

                      <div

                        key={item._id}

                        className={

                          `selection-item ` +

                          (

                            formData.requiredItems.includes(

                              item._id

                            )

                              ? "selected"

                              : ""

                          )

                        }

                      >

                        <input

                          type="checkbox"

                          checked={

                            formData.requiredItems.includes(

                              item._id

                            )

                          }

                          onChange={() =>

                            handleItemSelect(

                              item._id

                            )

                          }

                        />


                        <div>

                          <div className="item-name">

                            {item.itemName}

                          </div>


                          <div className="item-info">

                            {item.category}

                          </div>

                        </div>

                      </div>

                    ))

                  )}

                </div>

              </div>

            </Col>


            {/* TECHNOLOGIES */}

            <Col lg={4} className="mb-3">

              <div className="selection-card">

                <h4>
                  💻 Technologies
                </h4>


                <div className="selection-list">

                  {technologies.length === 0 ? (

                    <p className="text-center text-muted">

                      No technologies found

                    </p>

                  ) : (

                    technologies.map((tech) => (

                      <div

                        key={tech._id}

                        className={

                          `selection-item ` +

                          (

                            formData.technologies.includes(

                              tech._id

                            )

                              ? "selected"

                              : ""

                          )

                        }

                      >

                        <input

                          type="checkbox"

                          checked={

                            formData.technologies.includes(

                              tech._id

                            )

                          }

                          onChange={() =>

                            handleTechnologySelect(

                              tech._id

                            )

                          }

                        />


                        <div>

                          <div className="item-name">

                            {tech.title}

                          </div>


                          <div className="item-info">

                            {tech.skills}

                          </div>

                        </div>

                      </div>

                    ))

                  )}

                </div>

              </div>

            </Col>


          </Row>


          {/* BUTTONS */}

          <Card className="event-card mt-2">

            <Card.Body>

              <div className="d-flex justify-content-end gap-3">


                <Button

                  type="button"

                  className="reset-btn"

                  onClick={handleReset}

                >

                  🔄 Reset

                </Button>


                <Button

                  type="submit"

                  className="create-btn"

                  disabled={submitting}

                >

                  {submitting ? (

                    <>

                      <Spinner

                        animation="border"

                        size="sm"

                      />

                      {" "}

                      Creating...

                    </>

                  ) : (

                    "➕ Create Event"

                  )}

                </Button>


              </div>

            </Card.Body>

          </Card>


        </Form>


      </Container>


    </div>

  );

}