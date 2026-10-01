import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";


const EVENT_API = "https://eventsphere-5fey.onrender.com/events";
const REGISTRATION_API =
  "https://eventsphere-5fey.onrender.com/event-registration";


export default function Events() {

  // ==========================================
  // STATES
  // ==========================================

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [registeringId, setRegisteringId] =
    useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // ==========================================
  // GET EVENTS
  // ==========================================

  const fetchEvents = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await axios.get(
        EVENT_API
      );


      console.log(
        "Events:",
        response.data
      );


      // Your backend returns:
      // { events: [...] }

      const upcomingEvents =
        response.data.events.filter(
          (event) =>
            event.status === "Upcoming"
        );


      setEvents(upcomingEvents);

    } catch (error) {

      console.error(
        "Fetch Events Error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Failed to load events"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD EVENTS
  // ==========================================

  useEffect(() => {

    fetchEvents();

  }, []);


  // ==========================================
  // REGISTER FOR EVENT
  // ==========================================

  const handleRegister = async (eventId) => {

    try {

      setRegisteringId(eventId);

      setError("");

      setSuccess("");


      // ======================================
      // GET TOKEN
      // ======================================

      const token =
        localStorage.getItem("token");


      if (!token) {

        setError(
          "Please login first to register for an event."
        );

        return;

      }


      // ======================================
      // REGISTER API
      // ======================================

      const response = await axios.post(

        `${REGISTRATION_API}/register/${eventId}`,

        {},

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

          },
        }

      );


      // ======================================
      // SUCCESS
      // ======================================

      setSuccess(

        response.data.message ||

        "Event registered successfully!"

      );


    } catch (error) {

      console.error(

        "Register Event Error:",

        error

      );


      setError(

        error.response?.data?.message ||

        "Failed to register for event"

      );

    } finally {

      setRegisteringId(null);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#071525",
          color: "white",
        }}
      >

        <Container
          className="
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
          style={{
            minHeight: "80vh",
          }}
        >

          <Spinner
            animation="border"
          />

          <p className="mt-3">

            Loading Events...

          </p>

        </Container>

      </div>

    );

  }


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div
      style={{
        minHeight: "100vh",

        background:

          "linear-gradient(135deg, #071525, #0B1D31, #071525)",

        padding: "40px 15px",

        color: "#F1F5F9",
      }}
    >

      <Container>


        {/* ================================= */}
        {/* PAGE TITLE */}
        {/* ================================= */}

        <div className="text-center mb-5">

          <h2>

            📅 Available Events

          </h2>

          <p
            style={{
              color: "#B7C9DB",
            }}
          >

            Explore and register for upcoming events

          </p>

        </div>


        {/* ================================= */}
        {/* ALERTS */}
        {/* ================================= */}

        {error && (

          <Alert
            variant="danger"
          >

            {error}

          </Alert>

        )}


        {success && (

          <Alert
            variant="success"
          >

            {success}

          </Alert>

        )}


        {/* ================================= */}
        {/* NO EVENTS */}
        {/* ================================= */}

        {events.length === 0 ? (

          <Card
            style={{
              background: "#102238",

              border:
                "1px solid #1E4E78",

              color: "white",

              textAlign: "center",

              padding: "30px",
            }}
          >

            <h4>

              No Upcoming Events

            </h4>

            <p>

              Please check again later.

            </p>

          </Card>

        ) : (


          /* =============================== */
          /* EVENT CARDS */
          /* =============================== */

          <Row>

            {events.map((event) => (

              <Col
                md={6}
                lg={4}
                className="mb-4"
                key={event._id}
              >
<Card
  style={{
    height: "100%",
    borderRadius: "18px",
    overflow: "hidden",
    position: "relative",
    border: "1px solid #1E4E78",
    color: "#F1F5F9",
    background: "#071525",
    boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
  }}
>
  {/* =============================== */}
  {/* EVENT IMAGE BACKGROUND */}
  {/* =============================== */}

  {event.eventImage && (
    <div
      style={{
        position: "absolute",
        inset: 0,

        backgroundImage: `url(https://eventsphere-5fey.onrender.com/uploads/${event.eventImage})`,

        backgroundSize: "cover",
        backgroundPosition: "center",

        filter: "blur(7px)",

        transform: "scale(1.12)",

        opacity: 0.55,
      }}
    />
  )}

  {/* =============================== */}
  {/* DARK OVERLAY */}
  {/* =============================== */}

  <div
    style={{
      position: "absolute",
      inset: 0,

      background:
        "linear-gradient(135deg, rgba(7,21,37,0.88), rgba(11,29,49,0.78))",
    }}
  />

  {/* =============================== */}
  {/* EVENT CONTENT */}
  {/* =============================== */}

  <Card.Body
    className="d-flex flex-column"
    style={{
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* EVENT TITLE */}

    <Card.Title
      style={{
        fontSize: "23px",
        fontWeight: "700",
        marginBottom: "20px",
      }}
    >
      {event.eventTitle}
    </Card.Title>


    {/* DATE */}

    <p>
      📅 <b>Date:</b>

      <br />

      {new Date(
        event.dateTime
      ).toLocaleString()}
    </p>


    {/* VENUE */}

    <p>
      📍 <b>Venue:</b>

      <br />

      {event.venue}
    </p>


    {/* CAPACITY */}

    <p>
      👥 <b>Capacity:</b>{" "}

      {event.capacity}
    </p>


    {/* DESCRIPTION */}

    <p
      style={{
        color: "#D6E2EE",
        lineHeight: "1.6",
      }}
    >
      {event.description ||
        "No description available."}
    </p>


    {/* SPACER */}

    <div
      style={{
        flexGrow: 1,
      }}
    />


    {/* REGISTER BUTTON */}

    <Button
      onClick={() =>
        handleRegister(event._id)
      }
      disabled={
        registeringId === event._id
      }
      style={{
        background:
          "linear-gradient(135deg, #3478D4, #1D4F9E)",

        border:
          "1px solid #3D89E6",

        borderRadius:
          "10px",

        position:
          "relative",

        zIndex: 3,
      }}
    >
      {registeringId ===
      event._id ? (
        <>
          <Spinner
            animation="border"
            size="sm"
          />

          {" "}

          Registering...

        </>
      ) : (
        "🎟️ Register Now"
      )}
    </Button>

  </Card.Body>
</Card>

              </Col>

            ))}

          </Row>

        )}


      </Container>

    </div>

  );

}