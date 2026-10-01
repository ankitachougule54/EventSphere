import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Spinner,
  Form,
  Badge,
} from "react-bootstrap";

const API_BASE = "https://eventsphere-5fey.onrender.com/events";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    eventTitle: "",
    dateTime: "",
    venue: "",
    capacity: "",
    description: "",
    status: "Upcoming",
  });

  // =========================
  // GET ALL EVENTS
  // =========================

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_BASE);

      console.log("Events Response:", response.data);

      const eventData =
        response.data.events ||
        response.data ||
        [];

      setEvents(
        Array.isArray(eventData)
          ? eventData
          : []
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to fetch events."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchEvents();

  }, []);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // =========================
  // EDIT EVENT
  // =========================

  const handleEdit = (event) => {

    setEditingEvent(event);

    setFormData({

      eventTitle:
        event.eventTitle || "",

      dateTime:
        event.dateTime
          ? new Date(event.dateTime)
              .toISOString()
              .slice(0, 16)
          : "",

      venue:
        event.venue || "",

      capacity:
        event.capacity || "",

      description:
        event.description || "",

      status:
        event.status || "Upcoming",

    });


    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };


  // =========================
  // UPDATE EVENT
  // =========================

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      setSuccess("");


      await axios.put(

        `${API_BASE}/${editingEvent._id}`,

        formData

      );


      setSuccess(
        "Event updated successfully! ✅"
      );


      setEditingEvent(null);


      setFormData({

        eventTitle: "",

        dateTime: "",

        venue: "",

        capacity: "",

        description: "",

        status: "Upcoming",

      });


      fetchEvents();

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Failed to update event."

      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // DELETE EVENT
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this event?"

    );


    if (!confirmDelete) return;


    try {

      setLoading(true);

      setError("");

      setSuccess("");


      await axios.delete(

        `${API_BASE}/${id}`

      );


      setSuccess(
        "Event deleted successfully! 🗑️"
      );


      await fetchEvents();

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Failed to delete event."

      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {

    setEditingEvent(null);


    setFormData({

      eventTitle: "",

      dateTime: "",

      venue: "",

      capacity: "",

      description: "",

      status: "Upcoming",

    });

  };


  // =========================
  // STATUS BADGE
  // =========================

  const getStatusBadge = (status) => {

    if (status === "Upcoming") {

      return (

        <Badge
          style={{
            background: "#198754",
          }}
        >

          Upcoming

        </Badge>

      );

    }


    if (status === "Completed") {

      return (

        <Badge bg="secondary">

          Completed

        </Badge>

      );

    }


    if (status === "Cancelled") {

      return (

        <Badge bg="danger">

          Cancelled

        </Badge>

      );

    }


    return (

      <Badge bg="secondary">

        {status}

      </Badge>

    );

  };


  return (

    <div className="manage-events-page">


      {/* ========================= */}
      {/* CSS */}
      {/* ========================= */}

      <style>

        {`

        .manage-events-page {

          min-height: 100vh;

          background:
            linear-gradient(
              135deg,
              #071525,
              #0B1D31,
              #071525
            );

          padding: 40px 15px;

          color: #F1F5F9;

        }


        /* ========================= */
        /* PAGE HEADER */
        /* ========================= */

        .page-header {

          text-align: center;

          margin-bottom: 40px;

        }


        .page-header h2 {

          font-size: 38px;

          font-weight: 700;

        }


        .page-header p {

          color: #B7C9DB;

          font-size: 17px;

        }


        /* ========================= */
        /* EVENT CARD */
        /* ========================= */

        .event-background-card {

          position: relative;

          overflow: hidden;

          border-radius: 18px;

          min-height: 285px;

          border:

            1px solid
            #1E5B8F;

          background:

            linear-gradient(
              145deg,
              #102238,
              #0C1C2E
            );

          box-shadow:

            0 15px 35px
            rgba(0,0,0,0.30);

        }


        /* ========================= */
        /* BACKGROUND IMAGE */
        /* ========================= */

        .event-background-image {

          position: absolute;

          top: 0;

          left: 0;

          width: 100%;

          height: 100%;

          object-fit: cover;

          z-index: 0;

        }


        /* ========================= */
        /* DARK OVERLAY */
        /* ========================= */

        .event-overlay {

          position: absolute;

          top: 0;

          left: 0;

          width: 100%;

          height: 100%;

          background:

            linear-gradient(

              90deg,

              rgba(5, 18, 35, 0.95),

              rgba(5, 18, 35, 0.75),

              rgba(5, 18, 35, 0.45)

            );

          z-index: 1;

        }


        /* ========================= */
        /* CARD CONTENT */
        /* ========================= */

        .event-content {

          position: relative;

          z-index: 2;

          padding: 22px;

          height: 100%;

          min-height: 285px;

          display: flex;

          flex-direction: column;

        }


        /* ========================= */
        /* TITLE */
        /* ========================= */

        .event-title {

          font-size: 22px;

          font-weight: 700;

          color: #FFFFFF;

          margin: 0;

        }


        /* ========================= */
        /* STATUS */
        /* ========================= */

        .event-top {

          display: flex;

          justify-content: space-between;

          align-items: flex-start;

          margin-bottom: 15px;

        }


        /* ========================= */
        /* EVENT DETAILS */
        /* ========================= */

        .event-detail {

          margin-bottom: 8px;

          color: #D7E3F0;

          font-size: 15px;

        }


        .event-detail strong {

          color: white;

        }


        /* ========================= */
        /* DESCRIPTION */
        /* ========================= */

        .event-description {

          color: #D3DFEC;

          font-size: 14px;

          margin-top: 8px;

          line-height: 1.5;

        }


        /* ========================= */
        /* SPACER */
        /* ========================= */

        .event-spacer {

          flex-grow: 1;

        }


        /* ========================= */
        /* BUTTONS */
        /* ========================= */

        .edit-event-btn {

          background:

            linear-gradient(
              135deg,
              #FFC107,
              #F5A800
            );

          border: none;

          color: #111;

          font-weight: 600;

          border-radius: 9px;

          padding: 9px 18px;

        }


        .edit-event-btn:hover {

          transform:

            translateY(-1px);

        }


        .delete-event-btn {

          background:

            linear-gradient(
              135deg,
              #E64A55,
              #C82333
            );

          border: none;

          font-weight: 600;

          border-radius: 9px;

          padding: 9px 18px;

        }


        /* ========================= */
        /* EDIT FORM */
        /* ========================= */

        .edit-card {

          background:

            linear-gradient(
              145deg,
              #102238,
              #0C1C2E
            );

          border:

            1px solid #1E4E78;

          color: white;

          border-radius: 18px;

        }


        .edit-card .form-control,

        .edit-card .form-select {

          background: #0D1D30;

          border: 1px solid #275477;

          color: white;

        }


        .edit-card .form-control:focus,

        .edit-card .form-select:focus {

          background: #10263D;

          color: white;

          border-color: #3478D4;

          box-shadow:

            0 0 0 3px
            rgba(52,120,212,0.18);

        }


        .edit-card .form-label {

          color: #B7C9DB;

        }


        `}

      </style>


      <Container fluid>


        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="page-header">

          <h2>

            🗂️ Manage Events

          </h2>

          <p>

            View, edit and manage all events

          </p>

        </div>


        {/* ========================= */}
        {/* ALERTS */}
        {/* ========================= */}

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


        {/* ========================= */}
        {/* EDIT EVENT */}
        {/* ========================= */}

        {editingEvent && (

          <Card className="edit-card mb-5">

            <Card.Body className="p-4">


              <h4 className="mb-4">

                ✏️ Edit Event

              </h4>


              <Form onSubmit={handleUpdate}>


                <Row>


                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Event Title

                      </Form.Label>

                      <Form.Control

                        type="text"

                        name="eventTitle"

                        value={
                          formData.eventTitle
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />

                    </Form.Group>

                  </Col>


                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Date & Time

                      </Form.Label>

                      <Form.Control

                        type="datetime-local"

                        name="dateTime"

                        value={
                          formData.dateTime
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />

                    </Form.Group>

                  </Col>


                </Row>


                <Row>


                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Venue

                      </Form.Label>

                      <Form.Control

                        type="text"

                        name="venue"

                        value={
                          formData.venue
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />

                    </Form.Group>

                  </Col>


                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>

                        Capacity

                      </Form.Label>

                      <Form.Control

                        type="number"

                        name="capacity"

                        value={
                          formData.capacity
                        }

                        onChange={
                          handleChange
                        }

                        required

                      />

                    </Form.Group>

                  </Col>


                </Row>


                <Form.Group className="mb-3">

                  <Form.Label>

                    Description

                  </Form.Label>

                  <Form.Control

                    as="textarea"

                    rows={3}

                    name="description"

                    value={
                      formData.description
                    }

                    onChange={
                      handleChange
                    }

                  />

                </Form.Group>


                <Form.Group className="mb-4">

                  <Form.Label>

                    Status

                  </Form.Label>

                  <Form.Select

                    name="status"

                    value={
                      formData.status
                    }

                    onChange={
                      handleChange
                    }

                  >

                    <option value="Upcoming">

                      Upcoming

                    </option>

                    <option value="Completed">

                      Completed

                    </option>

                    <option value="Cancelled">

                      Cancelled

                    </option>

                  </Form.Select>

                </Form.Group>


                <Button

                  type="submit"

                  className="me-2"

                  disabled={loading}

                >

                  {loading

                    ? "Updating..."

                    : "💾 Update Event"

                  }

                </Button>


                <Button

                  variant="secondary"

                  type="button"

                  onClick={
                    handleCancelEdit
                  }

                >

                  Cancel

                </Button>


              </Form>


            </Card.Body>

          </Card>

        )}


        {/* ========================= */}
        {/* EVENTS */}
        {/* ========================= */}

        {loading &&
        events.length === 0 ? (

          <div className="text-center py-5">

            <Spinner animation="border" />

            <p className="mt-3">

              Loading Events...

            </p>

          </div>

        ) : events.length === 0 ? (

          <Card className="edit-card">

            <Card.Body className="text-center p-5">

              <h4>

                No Events Found

              </h4>

              <p>

                Create an event first.

              </p>

            </Card.Body>

          </Card>

        ) : (

          <Row>


            {events.map((event) => (

              <Col

                md={6}

                lg={4}

                className="mb-4"

                key={event._id}

              >


                {/* ========================= */}
                {/* EVENT CARD */}
                {/* ========================= */}

                <div className="event-background-card">


                  {/* ========================= */}
                  {/* EVENT IMAGE BACKGROUND */}
                  {/* ========================= */}

                  {event.eventImage && (

                    <img

                      src={
                        `https://eventsphere-5fey.onrender.com/uploads/${event.eventImage}`
                      }

                      alt={
                        event.eventTitle
                      }

                      className="event-background-image"

                    />

                  )}


                  {/* ========================= */}
                  {/* DARK OVERLAY */}
                  {/* ========================= */}

                  <div
                    className="event-overlay"
                  />


                  {/* ========================= */}
                  {/* CONTENT */}
                  {/* ========================= */}

                  <div className="event-content">


                    {/* TITLE + STATUS */}

                    <div className="event-top">

                      <h3
                        className="event-title"
                      >

                        {event.eventTitle}

                      </h3>


                      {getStatusBadge(
                        event.status
                      )}


                    </div>


                    {/* DATE */}

                    <div className="event-detail">

                      📅

                      {" "}

                      <strong>

                        Date:

                      </strong>

                      {" "}

                      {event.dateTime

                        ? new Date(
                            event.dateTime
                          ).toLocaleString()

                        : "N/A"

                      }

                    </div>


                    {/* VENUE */}

                    <div className="event-detail">

                      📍

                      {" "}

                      <strong>

                        Venue:

                      </strong>

                      {" "}

                      {event.venue}

                    </div>


                    {/* CAPACITY */}

                    <div className="event-detail">

                      👥

                      {" "}

                      <strong>

                        Capacity:

                      </strong>

                      {" "}

                      {event.capacity}

                    </div>


                    {/* DESCRIPTION */}

                    <p
                      className="event-description"
                    >

                      {event.description ||

                        "No description available."

                      }

                    </p>


                    <div
                      className="event-spacer"
                    />


                    {/* ========================= */}
                    {/* BUTTONS */}
                    {/* ========================= */}

                    <div className="d-flex gap-2 mt-3">


                      <Button

                        className="edit-event-btn"

                        onClick={() =>

                          handleEdit(event)

                        }

                      >

                        📝 Edit

                      </Button>


                      <Button

                        className="delete-event-btn"

                        onClick={() =>

                          handleDelete(
                            event._id
                          )

                        }

                      >

                        🗑️ Delete

                      </Button>


                    </div>


                  </div>


                </div>


              </Col>

            ))}


          </Row>

        )}


      </Container>


    </div>

  );

};


export default ManageEvents;