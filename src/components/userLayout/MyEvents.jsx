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


const REGISTRATION_API =
  "http://localhost:9000/event-registration";


export default function MyEvents() {


  // ==========================================
  // STATES
  // ==========================================

  const [registrations, setRegistrations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [cancellingId, setCancellingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // ==========================================
  // GET MY REGISTERED EVENTS
  // ==========================================

  const fetchMyEvents = async () => {

    try {

      setLoading(true);

      setError("");


      // ======================================
      // GET JWT TOKEN
      // ======================================

      const token =
        localStorage.getItem("token");


      if (!token) {

        setError(
          "Please login first."
        );

        return;

      }


      // ======================================
      // API REQUEST
      // ======================================

      const response =
        await axios.get(

          `${REGISTRATION_API}/my-events`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`,

            },
          }

        );


      console.log(
        "My Registered Events:",
        response.data
      );


      // Backend response:
      // {
      //   registrations: [...]
      // }

      setRegistrations(
        response.data.registrations || []
      );


    } catch (error) {

      console.error(
        "Fetch My Events Error:",
        error
      );


      setError(

        error.response?.data?.message ||

        "Failed to load registered events"

      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD REGISTERED EVENTS
  // ==========================================

  useEffect(() => {

    fetchMyEvents();

  }, []);


  // ==========================================
  // CANCEL REGISTRATION
  // ==========================================

  const handleCancel = async (
    registrationId
  ) => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this event registration?"
      );


    if (!confirmCancel) return;


    try {

      setCancellingId(
        registrationId
      );

      setError("");

      setSuccess("");


      // ======================================
      // GET TOKEN
      // ======================================

      const token =
        localStorage.getItem("token");


      if (!token) {

        setError(
          "Login token not found."
        );

        return;

      }


      // ======================================
      // CANCEL API
      // ======================================

      const response =
        await axios.put(

          `${REGISTRATION_API}/cancel/${registrationId}`,

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

        "Registration cancelled successfully!"

      );


      // ======================================
      // REMOVE EVENT FROM UI
      // ======================================

      setRegistrations(

        (previousRegistrations) =>

          previousRegistrations.filter(

            (registration) =>

              registration._id !==
              registrationId

          )

      );


    } catch (error) {

      console.error(

        "Cancel Registration Error:",

        error

      );


      setError(

        error.response?.data?.message ||

        "Failed to cancel registration"

      );


    } finally {

      setCancellingId(null);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div
        style={{

          minHeight:
            "100vh",

          background:
            "#071525",

          color:
            "#F1F5F9",

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

            minHeight:
              "80vh",

          }}

        >

          <Spinner
            animation="border"
          />

          <p className="mt-3">

            Loading Your Events...

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

        minHeight:
          "100vh",

        background:

          "linear-gradient(135deg, #071525, #0B1D31, #071525)",

        padding:
          "40px 15px",

        color:
          "#F1F5F9",

      }}

    >

      <Container>


        {/* ================================= */}
        {/* PAGE TITLE */}
        {/* ================================= */}

        <div className="text-center mb-5">

          <h2>

            🎟️ My Registered Events

          </h2>

          <p

            style={{

              color:
                "#B7C9DB",

            }}

          >

            Events you have successfully registered for

          </p>

        </div>


        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (

          <Alert
            variant="danger"
          >

            {error}

          </Alert>

        )}


        {/* ================================= */}
        {/* SUCCESS */}
        {/* ================================= */}

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

        {registrations.length === 0 ? (

          <Card

            style={{

              background:

                "linear-gradient(145deg, #102238, #0C1C2E)",

              border:

                "1px solid #1E4E78",

              borderRadius:
                "18px",

              color:
                "#F1F5F9",

              textAlign:
                "center",

              padding:
                "40px",

            }}

          >

            <h4>

              No Registered Events

            </h4>

            <p

              style={{

                color:
                  "#B7C9DB",

              }}

            >

              You have not registered for any event yet.

            </p>

          </Card>

        ) : (


          /* ================================= */
          /* EVENT CARDS */
          /* ================================= */

          <Row>


            {registrations.map(

              (registration) => {


                const event =
                  registration.event;


                // In case event was deleted

                if (!event) {

                  return null;

                }


                return (

                  <Col

                    md={6}

                    lg={4}

                    className="mb-4"

                    key={
                      registration._id
                    }

                  >


                    <Card
  style={{
    height: "100%",
    borderRadius: "18px",
    overflow: "hidden",
    position: "relative",
    border: "1px solid #1E4E78",
    color: "#F1F5F9",
    boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
    background: "#071525",
  }}
>
  {/* ================================= */}
  {/* EVENT BACKGROUND IMAGE */}
  {/* ================================= */}

  {event.eventImage && (
    <div
      style={{
        position: "absolute",
        inset: 0,

        backgroundImage: `url(http://localhost:9000/uploads/${event.eventImage})`,

        backgroundSize: "cover",

        backgroundPosition: "center",

        filter: "blur(6px)",

        transform: "scale(1.1)",

        opacity: 0.45,
      }}
    />
  )}

  {/* ================================= */}
  {/* DARK OVERLAY */}
  {/* ================================= */}

  <div
    style={{
      position: "absolute",

      inset: 0,

      background:
        "linear-gradient(135deg, rgba(7,21,37,0.88), rgba(11,29,49,0.82))",
    }}
  />

  {/* ================================= */}
  {/* EVENT CONTENT */}
  {/* ================================= */}

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
      }}
    >
      {event.eventTitle}
    </Card.Title>

    {/* STATUS */}

    <div className="mb-3">
      <span
        style={{
          background:
            "rgba(29,79,158,0.9)",

          padding: "6px 12px",

          borderRadius: "20px",

          fontSize: "13px",

          border:
            "1px solid rgba(100,160,255,0.4)",
        }}
      >
        ✅ Registered
      </span>
    </div>

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
        color: "#D0DCE8",
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

    {/* CANCEL BUTTON */}

    <Button
      variant="danger"
      onClick={() =>
        handleCancel(
          registration._id
        )
      }
      disabled={
        cancellingId ===
        registration._id
      }
      style={{
        borderRadius: "10px",
      }}
    >
      {cancellingId ===
      registration._id ? (
        <>
          <Spinner
            animation="border"
            size="sm"
          />

          {" "}

          Cancelling...
        </>
      ) : (
        "❌ Cancel Registration"
      )}
    </Button>
  </Card.Body>
</Card>


                  </Col>

                );

              }

            )}


          </Row>

        )}


      </Container>


    </div>

  );

}