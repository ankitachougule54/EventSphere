
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";

import {
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEvents: 0,
    totalUsers: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    recentEvents: [],
    recentUsers: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH DASHBOARD DATA
  // ==========================================

  useEffect(() => {

  const fetchDashboardData = async () => {

    try {

      setLoading(true);

      // Get token from Local Storage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Login token not found. Please login again.");
        return;
      }


      // Send token with API request
      const response = await axios.get(
        "https://eventsphere-5fey.onrender.com/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setDashboardData(response.data);

      setError("");


    } catch (error) {

      console.error(
        "Dashboard Fetch Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to fetch dashboard data"
      );

    } finally {

      setLoading(false);

    }

  };


  fetchDashboardData();

}, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#071525",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" variant="primary" />
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
        backgroundColor: "#071525",
        padding: "30px",
        color: "#F1F5F9",
      }}
    >
      <Container fluid>

        {/* HEADER */}

        <div className="mb-4">

          <h2 style={{ fontWeight: "bold" }}>
            Admin Dashboard
          </h2>

          <p style={{ color: "#94A3B8" }}>
            Welcome back! Here's what's happening in your event management system.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}


        {/* STATISTICS CARDS */}

        <Row className="g-4 mb-4">

          {/* TOTAL EVENTS */}

          <Col lg={3} md={6}>

            <Card
              style={{
                backgroundColor: "#102238",
                border: "1px solid #1E4E78",
                borderRadius: "18px",
                color: "#F1F5F9",
              }}
            >

              <Card.Body>

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p style={{ color: "#94A3B8" }}>
                      Total Events
                    </p>

                    <h2>
                      {dashboardData.totalEvents}
                    </h2>

                  </div>

                  <FaCalendarAlt
                    size={35}
                    color="#3478D4"
                  />

                </div>

              </Card.Body>

            </Card>

          </Col>


          {/* TOTAL USERS */}

          <Col lg={3} md={6}>

            <Card
              style={{
                backgroundColor: "#102238",
                border: "1px solid #1E4E78",
                borderRadius: "18px",
                color: "#F1F5F9",
              }}
            >

              <Card.Body>

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p style={{ color: "#94A3B8" }}>
                      Total Users
                    </p>

                    <h2>
                      {dashboardData.totalUsers}
                    </h2>

                  </div>

                  <FaUsers
                    size={35}
                    color="#3478D4"
                  />

                </div>

              </Card.Body>

            </Card>

          </Col>


          {/* UPCOMING EVENTS */}

          <Col lg={3} md={6}>

            <Card
              style={{
                backgroundColor: "#102238",
                border: "1px solid #1E4E78",
                borderRadius: "18px",
                color: "#F1F5F9",
              }}
            >

              <Card.Body>

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p style={{ color: "#94A3B8" }}>
                      Upcoming Events
                    </p>

                    <h2>
                      {dashboardData.upcomingEvents}
                    </h2>

                  </div>

                  <FaClock
                    size={35}
                    color="#3478D4"
                  />

                </div>

              </Card.Body>

            </Card>

          </Col>


          {/* COMPLETED EVENTS */}

          <Col lg={3} md={6}>

            <Card
              style={{
                backgroundColor: "#102238",
                border: "1px solid #1E4E78",
                borderRadius: "18px",
                color: "#F1F5F9",
              }}
            >

              <Card.Body>

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p style={{ color: "#94A3B8" }}>
                      Completed Events
                    </p>

                    <h2>
                      {dashboardData.completedEvents}
                    </h2>

                  </div>

                  <FaCheckCircle
                    size={35}
                    color="#3478D4"
                  />

                </div>

              </Card.Body>

            </Card>

          </Col>

        </Row>


        {/* RECENT EVENTS + RECENT USERS */}

        <Row className="g-4">

          {/* RECENT EVENTS */}

          <Col lg={8}>

            <Card
              style={{
                backgroundColor: "#102238",
                border: "1px solid #1E4E78",
                borderRadius: "18px",
                color: "#F1F5F9",
              }}
            >

              <Card.Body>

                <h4 className="mb-4">
                  Recent Events
                </h4>


                <Table
                  responsive
                  borderless
                  style={{
                    color: "#F1F5F9",
                  }}
                >

                  <thead>

                    <tr style={{ color: "#94A3B8" }}>

                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Venue</th>
                      <th>Status</th>

                    </tr>

                  </thead>


                  <tbody>

                    {dashboardData.recentEvents.length > 0 ? (

                      dashboardData.recentEvents.map((event) => (

                        <tr key={event._id}>

                          <td>
                            {event.eventTitle}
                          </td>

                          <td>
                            {new Date(
                              event.dateTime
                            ).toLocaleDateString()}
                          </td>

                          <td>
                            {event.venue}
                          </td>

                          <td>

                            <Badge
                              bg={
                                event.status === "Completed"
                                  ? "secondary"
                                  : event.status === "Cancelled"
                                  ? "danger"
                                  : "primary"
                              }
                            >
                              {event.status}
                            </Badge>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center"
                        >
                          No events found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </Table>

              </Card.Body>

            </Card>

          </Col>


          {/* RECENT USERS */}

          <Col lg={4}>

            <Card
              style={{
                backgroundColor: "#102238",
                border: "1px solid #1E4E78",
                borderRadius: "18px",
                color: "#F1F5F9",
              }}
            >

              <Card.Body>

                <h4 className="mb-4">
                  Recent Users
                </h4>


                {dashboardData.recentUsers.length > 0 ? (

                  dashboardData.recentUsers.map(
                    (user, index) => (

                      <React.Fragment
                        key={user._id}
                      >

                        <div className="mb-3">

                          <strong>
                            {user.name}
                          </strong>

                          <br />

                          <small
                            style={{
                              color: "#94A3B8",
                            }}
                          >
                            {user.email}
                          </small>

                        </div>


                        {index <
                          dashboardData.recentUsers.length - 1 && (
                          <hr
                            style={{
                              borderColor: "#1E4E78",
                            }}
                          />
                        )}

                      </React.Fragment>

                    )
                  )

                ) : (

                  <p
                    style={{
                      color: "#94A3B8",
                    }}
                  >
                    No users found
                  </p>

                )}

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>
    </div>
  );
};

export default Dashboard;

