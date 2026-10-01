import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Card,
  Button,
  Alert,
  Spinner,
  Badge,
  Row,
  Col,
  Form,
} from "react-bootstrap";


const CONTACT_API =
  "https://eventsphere-5fey.onrender.com/contact";


const ManageContactMessages = () => {


  // ==========================================
  // STATES
  // ==========================================

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [selectedMessage, setSelectedMessage] =
    useState(null);


  // REPLY STATES

  const [replyText, setReplyText] =
    useState("");

  const [sendingReply, setSendingReply] =
    useState(false);


  // ==========================================
  // GET ALL CONTACT MESSAGES
  // ==========================================

  const fetchMessages = async () => {

    try {

      setLoading(true);

      setError("");


      const response =
        await axios.get(
          CONTACT_API
        );


      console.log(
        "Contact Messages:",
        response.data
      );


      setMessages(
        response.data.messages || []
      );


    } catch (error) {

      console.error(
        "Fetch Contact Messages Error:",
        error
      );


      setError(

        error.response?.data?.message ||

        "Failed to fetch contact messages."

      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD MESSAGES
  // ==========================================

  useEffect(() => {

    fetchMessages();

  }, []);


  // ==========================================
  // MARK MESSAGE AS READ
  // ==========================================

  const handleMarkAsRead = async (id) => {

    try {

      setError("");

      setSuccess("");


      const response =
        await axios.put(

          `${CONTACT_API}/read/${id}`

        );


      setSuccess(

        response.data.message ||

        "Message marked as Read."

      );


      // Update UI

      setMessages(

        (previousMessages) =>

          previousMessages.map(

            (message) =>

              message._id === id

                ? {
                    ...message,
                    status: "Read",
                  }

                : message

          )

      );


      // Update selected message

      if (
        selectedMessage &&
        selectedMessage._id === id
      ) {

        setSelectedMessage({

          ...selectedMessage,

          status: "Read",

        });

      }


    } catch (error) {

      console.error(
        "Mark As Read Error:",
        error
      );


      setError(

        error.response?.data?.message ||

        "Failed to mark message as Read."

      );

    }

  };


  // ==========================================
  // SEND REPLY
  // ==========================================

  const handleSendReply = async () => {

    if (!replyText.trim()) {

      setError(
        "Please write a reply first."
      );

      return;

    }


    try {

      setSendingReply(true);

      setError("");

      setSuccess("");


      const response =
        await axios.post(

          `${CONTACT_API}/reply/${selectedMessage._id}`,

          {
            reply: replyText,
          }

        );


      setSuccess(

        response.data.message ||

        "Reply sent successfully!"

      );


      const updatedMessage =
        response.data.contact;


      // UPDATE MESSAGE LIST

      setMessages(

        (previousMessages) =>

          previousMessages.map(

            (message) =>

              message._id ===
              selectedMessage._id

                ? updatedMessage

                : message

          )

      );


      // UPDATE SELECTED MESSAGE

      setSelectedMessage(
        updatedMessage
      );


      // CLEAR TEXTAREA

      setReplyText("");


    } catch (error) {

      console.error(
        "Send Reply Error:",
        error
      );


      setError(

        error.response?.data?.message ||

        "Failed to send reply."

      );

    } finally {

      setSendingReply(false);

    }

  };


  // ==========================================
  // DELETE MESSAGE
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(

        "Are you sure you want to delete this message?"

      );


    if (!confirmDelete) return;


    try {

      setError("");

      setSuccess("");


      const response =
        await axios.delete(

          `${CONTACT_API}/${id}`

        );


      setSuccess(

        response.data.message ||

        "Message deleted successfully."

      );


      // Remove from UI

      setMessages(

        (previousMessages) =>

          previousMessages.filter(

            (message) =>

              message._id !== id

          )

      );


      // Close selected message

      if (
        selectedMessage &&
        selectedMessage._id === id
      ) {

        setSelectedMessage(null);

      }


    } catch (error) {

      console.error(
        "Delete Message Error:",
        error
      );


      setError(

        error.response?.data?.message ||

        "Failed to delete message."

      );

    }

  };


  // ==========================================
  // GET STATUS BADGE
  // ==========================================

  const getStatusBadge = (status) => {

    if (status === "New") {

      return (

        <Badge bg="danger">

          New

        </Badge>

      );

    }


    if (status === "Read") {

      return (

        <Badge bg="success">

          Read

        </Badge>

      );

    }


    if (status === "Replied") {

      return (

        <Badge bg="primary">

          Replied

        </Badge>

      );

    }


    return (

      <Badge bg="secondary">

        Unknown

      </Badge>

    );

  };


  return (

    <div

      style={{

        minHeight: "100vh",

        background:

          "linear-gradient(135deg, #071525, #0B1D31, #071525)",

        padding:

          "40px 15px",

        color:

          "#F1F5F9",

      }}

    >

      <Container>


        {/* ====================================== */}
        {/* PAGE HEADER */}
        {/* ====================================== */}

        <div className="text-center mb-5">

          <h2>

            📩 Manage Contact Messages

          </h2>


          <p

            style={{

              color:

                "#B7C9DB",

            }}

          >

            View, manage and reply to user messages

          </p>

        </div>


        {/* ====================================== */}
        {/* ALERTS */}
        {/* ====================================== */}

        {error && (

          <Alert variant="danger">

            ❌ {error}

          </Alert>

        )}


        {success && (

          <Alert variant="success">

            ✅ {success}

          </Alert>

        )}


        {/* ====================================== */}
        {/* REFRESH BUTTON */}
        {/* ====================================== */}

        <div className="d-flex justify-content-end mb-4">

          <Button

            onClick={fetchMessages}

            disabled={loading}

            style={{

              background:

                "linear-gradient(135deg, #3478D4, #1D4F9E)",

              border:

                "1px solid #3D89E6",

            }}

          >

            🔄 Refresh

          </Button>

        </div>


        {/* ====================================== */}
        {/* LOADING */}
        {/* ====================================== */}

        {loading && (

          <div className="text-center mb-4">

            <Spinner animation="border" />

            <p className="mt-2">

              Loading messages...

            </p>

          </div>

        )}


        {/* ====================================== */}
        {/* NO MESSAGES */}
        {/* ====================================== */}

        {!loading &&
          messages.length === 0 && (

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

              📭 No Contact Messages

            </h4>


            <p

              style={{

                color:

                  "#B7C9DB",

              }}

            >

              No messages have been received yet.

            </p>

          </Card>

        )}


        {/* ====================================== */}
        {/* MESSAGE CARDS */}
        {/* ====================================== */}

        <Row>


          {messages.map(

            (message) => (

              <Col

                md={6}

                lg={4}

                className="mb-4"

                key={message._id}

              >

                <Card

                  style={{

                    height:

                      "100%",

                    background:

                      "linear-gradient(145deg, #102238, #0C1C2E)",

                    border:

                      "1px solid #1E4E78",

                    borderRadius:

                      "18px",

                    color:

                      "#F1F5F9",

                    boxShadow:

                      "0 15px 35px rgba(0,0,0,0.3)",

                  }}

                >

                  <Card.Body

                    className="d-flex flex-column"

                  >


                    {/* NAME + STATUS */}

                    <div

                      className="d-flex justify-content-between align-items-start mb-3"

                    >

                      <Card.Title>

                        👤 {message.name}

                      </Card.Title>


                      {getStatusBadge(
                        message.status
                      )}

                    </div>


                    {/* EMAIL */}

                    <p>

                      📧 <b>Email:</b>

                      <br />

                      {message.email}

                    </p>


                    {/* SUBJECT */}

                    <p>

                      📝 <b>Subject:</b>

                      <br />

                      {message.subject}

                    </p>


                    {/* DATE */}

                    <p>

                      📅 <b>Received:</b>

                      <br />

                      {message.createdAt

                        ? new Date(
                            message.createdAt
                          ).toLocaleString()

                        : "N/A"}

                    </p>


                    <div

                      style={{

                        flexGrow: 1,

                      }}

                    />


                    {/* VIEW BUTTON */}

                    <Button

                      className="mb-2"

                      onClick={() => {

                        setSelectedMessage(
                          message
                        );

                        setReplyText("");

                      }}

                      style={{

                        background:

                          "linear-gradient(135deg, #3478D4, #1D4F9E)",

                        border:

                          "1px solid #3D89E6",

                      }}

                    >

                      👁 View Message

                    </Button>


                    {/* MARK AS READ */}

                    {message.status ===
                      "New" && (

                      <Button

                        variant="success"

                        className="mb-2"

                        onClick={() =>

                          handleMarkAsRead(
                            message._id
                          )

                        }

                      >

                        ✓ Mark as Read

                      </Button>

                    )}


                    {/* DELETE */}

                    <Button

                      variant="danger"

                      onClick={() =>

                        handleDelete(
                          message._id
                        )

                      }

                    >

                      🗑 Delete

                    </Button>


                  </Card.Body>


                </Card>

              </Col>

            )

          )}


        </Row>


        {/* ====================================== */}
        {/* VIEW MESSAGE */}
        {/* ====================================== */}

        {selectedMessage && (

          <Card

            className="mt-4"

            style={{

              background:

                "linear-gradient(145deg, #102238, #0C1C2E)",

              border:

                "1px solid #3D89E6",

              borderRadius:

                "18px",

              color:

                "#F1F5F9",

              boxShadow:

                "0 15px 35px rgba(0,0,0,0.4)",

            }}

          >

            <Card.Body>


              <div

                className="d-flex justify-content-between align-items-center mb-4"

              >

                <h4>

                  📩 Message Details

                </h4>


                <Button

                  variant="secondary"

                  size="sm"

                  onClick={() => {

                    setSelectedMessage(null);

                    setReplyText("");

                  }}

                >

                  ✖ Close

                </Button>

              </div>


              <hr />


              <p>

                👤 <b>Name:</b>{" "}

                {selectedMessage.name}

              </p>


              <p>

                📧 <b>Email:</b>{" "}

                {selectedMessage.email}

              </p>


              <p>

                📝 <b>Subject:</b>{" "}

                {selectedMessage.subject}

              </p>


              <p>

                📊 <b>Status:</b>{" "}

                {getStatusBadge(
                  selectedMessage.status
                )}

              </p>


              <hr />


              {/* USER MESSAGE */}

              <h5>

                💬 User Message

              </h5>


              <p

                style={{

                  background:

                    "#071525",

                  padding:

                    "20px",

                  borderRadius:

                    "12px",

                  color:

                    "#B7C9DB",

                  whiteSpace:

                    "pre-wrap",

                }}

              >

                {selectedMessage.message}

              </p>


              {/* ================================= */}
              {/* PREVIOUS REPLY */}
              {/* ================================= */}

              {selectedMessage.status ===
                "Replied" && (

                <>

                  <h5 className="mt-4">

                    📧 Admin Reply

                  </h5>


                  <p

                    style={{

                      background:

                        "#0D2E4A",

                      padding:

                        "20px",

                      borderRadius:

                        "12px",

                      color:

                        "#B7C9DB",

                      whiteSpace:

                        "pre-wrap",

                    }}

                  >

                    {selectedMessage.reply}

                  </p>


                  {selectedMessage.repliedAt && (

                    <small

                      style={{

                        color:

                          "#8FAEC7",

                      }}

                    >

                      Replied on:{" "}

                      {new Date(

                        selectedMessage.repliedAt

                      ).toLocaleString()}

                    </small>

                  )}

                </>

              )}


              {/* ================================= */}
              {/* REPLY FORM */}
              {/* ================================= */}

              {selectedMessage.status !==
                "Replied" && (

                <div className="mt-4">


                  <h5>

                    ✉️ Reply to User

                  </h5>


                  <Form.Group>

                    <Form.Control

                      as="textarea"

                      rows={5}

                      placeholder="Write your reply here..."

                      value={replyText}

                      onChange={(e) =>

                        setReplyText(
                          e.target.value
                        )

                      }

                      style={{

                        background:

                          "#071525",

                        color:

                          "#F1F5F9",

                        border:

                          "1px solid #1E4E78",

                      }}

                    />

                  </Form.Group>


                  <Button

                    className="mt-3"

                    onClick={handleSendReply}

                    disabled={sendingReply}

                    style={{

                      background:

                        "linear-gradient(135deg, #3478D4, #1D4F9E)",

                      border:

                        "1px solid #3D89E6",

                    }}

                  >

                    {sendingReply ? (

                      <>

                        <Spinner

                          animation="border"

                          size="sm"

                        />

                        {" "}

                        Sending Reply...

                      </>

                    ) : (

                      "📧 Send Reply"

                    )}

                  </Button>


                </div>

              )}


            </Card.Body>

          </Card>

        )}


      </Container>

    </div>

  );

};


export default ManageContactMessages;