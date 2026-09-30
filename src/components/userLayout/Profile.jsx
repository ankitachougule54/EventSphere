import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";

const API_BASE = "http://localhost:9000/users";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= FETCH PROFILE =================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        `${API_BASE}/profile`,
        config
      );

      setProfile(res.data.user);

      setFormData({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        contact: res.data.user.contact || "",
        profileImage: null,
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to fetch profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT PROFILE =================

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  // ================= CANCEL =================

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setSuccess("");

    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        contact: profile.contact || "",
        profileImage: null,
      });
    }
  };

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      setFormData({
        ...formData,
        profileImage: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // ================= UPDATE PROFILE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      // FormData for image upload
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("contact", formData.contact);

      if (formData.profileImage) {
        data.append(
          "profileImage",
          formData.profileImage
        );
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.put(
        `${API_BASE}/profile`,
        data,
        config
      );

      setProfile(res.data.user);

      setSuccess("Profile updated successfully ✅");

      setIsEditing(false);

      setFormData({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        contact: res.data.user.contact || "",
        profileImage: null,
      });

      // Update localStorage user
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            ...res.data.user,
          })
        );
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to update profile"
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#071525",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // ================= UI =================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071525",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <Container>
        <Row className="justify-content-center">

          <Col md={8} lg={6}>

            {/* ================= PROFILE CARD ================= */}

            <Card
              style={{
                background: "#102238",
                border: "1px solid #1E4E78",
                borderRadius: "25px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
                color: "#F1F5F9",
              }}
            >

              <Card.Body
                style={{
                  padding: "45px",
                }}
              >

                {/* ================= PROFILE HEADER ================= */}

                <div className="text-center mb-5">

                  {/* PROFILE IMAGE */}

                  <div
  style={{
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #3478D4, #1D4F9E)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: "38px",
    boxShadow:
      "0 8px 25px rgba(37,99,184,0.45)",
    overflow: "hidden",
  }}
>
  {profile?.profileImage ? (
    <img
      src={`http://localhost:9000${profile.profileImage}`}
      alt="Profile"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : (
    "👤"
  )}
</div>

                  <h2
                    style={{
                      fontWeight: "700",
                      color: "#F1F5F9",
                    }}
                  >
                    My Profile
                  </h2>

                  {!isEditing && (
                    <p
                      style={{
                        color: "#B8C7D9",
                        marginTop: "10px",
                      }}
                    >
                      Your Event Management account information
                    </p>
                  )}

                </div>


                {/* ================= ALERTS ================= */}

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


                {/* ================= EDIT MODE ================= */}

                {isEditing ? (

                  <Form onSubmit={handleSubmit}>

                    {/* PROFILE IMAGE */}

                    <Form.Group className="mb-4">

                      <Form.Label
                        style={{
                          color: "#D6E3F2",
                        }}
                      >
                        Profile Image
                      </Form.Label>

                      <Form.Control
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleChange}
                        style={{
                          background: "#14283F",
                          border: "1px solid #294866",
                          color: "white",
                          borderRadius: "10px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>


                    {/* NAME */}

                    <Form.Group className="mb-4">

                      <Form.Label
                        style={{
                          color: "#D6E3F2",
                        }}
                      >
                        Full Name
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                          background: "#14283F",
                          border: "1px solid #294866",
                          color: "white",
                          borderRadius: "10px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>


                    {/* EMAIL */}

                    <Form.Group className="mb-4">

                      <Form.Label
                        style={{
                          color: "#D6E3F2",
                        }}
                      >
                        Email Address
                      </Form.Label>

                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          background: "#14283F",
                          border: "1px solid #294866",
                          color: "white",
                          borderRadius: "10px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>


                    {/* CONTACT */}

                    <Form.Group className="mb-4">

                      <Form.Label
                        style={{
                          color: "#D6E3F2",
                        }}
                      >
                        Contact Number
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        style={{
                          background: "#14283F",
                          border: "1px solid #294866",
                          color: "white",
                          borderRadius: "10px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>


                    {/* BUTTONS */}

                    <Row className="g-3">

                      <Col md={6}>

                        <Button
                          type="submit"
                          className="w-100"
                          style={{
                            background: "#2563B8",
                            border: "none",
                            padding: "13px",
                            borderRadius: "12px",
                            fontWeight: "600",
                          }}
                        >
                          💾 Save Changes
                        </Button>

                      </Col>


                      <Col md={6}>

                        <Button
                          type="button"
                          onClick={handleCancel}
                          className="w-100"
                          style={{
                            background: "transparent",
                            border: "1px solid #496581",
                            color: "#D6E3F2",
                            padding: "13px",
                            borderRadius: "12px",
                            fontWeight: "600",
                          }}
                        >
                          Cancel
                        </Button>

                      </Col>

                    </Row>

                  </Form>

                ) : (

                  profile && (

                    <>

                      {/* ================= PROFILE DETAILS ================= */}

                      <div>

                        {/* NAME */}

                        <div
                          style={{
                            background: "#14283F",
                            border: "1px solid rgba(65,130,190,0.15)",
                            padding: "16px",
                            borderRadius: "12px",
                            marginBottom: "15px",
                          }}
                        >

                          <small
                            style={{
                              color: "#8FA9C2",
                              fontWeight: "600",
                            }}
                          >
                            FULL NAME
                          </small>

                          <h5
                            style={{
                              color: "#F1F5F9",
                              marginTop: "8px",
                              marginBottom: "0",
                            }}
                          >
                            👤 {profile.name}
                          </h5>

                        </div>


                        {/* EMAIL */}

                        <div
                          style={{
                            background: "#14283F",
                            border: "1px solid rgba(65,130,190,0.15)",
                            padding: "16px",
                            borderRadius: "12px",
                            marginBottom: "15px",
                          }}
                        >

                          <small
                            style={{
                              color: "#8FA9C2",
                              fontWeight: "600",
                            }}
                          >
                            EMAIL ADDRESS
                          </small>

                          <h5
                            style={{
                              color: "#F1F5F9",
                              marginTop: "8px",
                              marginBottom: "0",
                            }}
                          >
                            📧 {profile.email}
                          </h5>

                        </div>


                        {/* CONTACT */}

                        <div
                          style={{
                            background: "#14283F",
                            border: "1px solid rgba(65,130,190,0.15)",
                            padding: "16px",
                            borderRadius: "12px",
                            marginBottom: "15px",
                          }}
                        >

                          <small
                            style={{
                              color: "#8FA9C2",
                              fontWeight: "600",
                            }}
                          >
                            CONTACT NUMBER
                          </small>

                          <h5
                            style={{
                              color: "#F1F5F9",
                              marginTop: "8px",
                              marginBottom: "0",
                            }}
                          >
                            📱 {profile.contact}
                          </h5>

                        </div>


                        {/* ROLE */}

                        <div
                          style={{
                            background: "#14283F",
                            border: "1px solid rgba(65,130,190,0.15)",
                            padding: "16px",
                            borderRadius: "12px",
                            marginBottom: "30px",
                          }}
                        >

                          <small
                            style={{
                              color: "#8FA9C2",
                              fontWeight: "600",
                            }}
                          >
                            ACCOUNT ROLE
                          </small>

                          <h5
                            style={{
                              color: "#F1F5F9",
                              marginTop: "8px",
                              marginBottom: "0",
                              textTransform: "capitalize",
                            }}
                          >
                            🔐 {profile.role}
                          </h5>

                        </div>

                      </div>


                      {/* ================= EDIT BUTTON ================= */}

                      <Button
                        onClick={handleEdit}
                        className="w-100"
                        style={{
                          background: "#2563B8",
                          border: "none",
                          padding: "14px",
                          borderRadius: "12px",
                          fontWeight: "600",
                          fontSize: "16px",
                          boxShadow:
                            "0 6px 18px rgba(37,99,184,0.3)",
                        }}
                      >
                        ✏️ Edit Profile
                      </Button>


                      <Button
                        onClick={() =>
                          navigate("/user/changePassword")
                        }
                        className="w-100 mt-3"
                        style={{
                          background: "transparent",
                          border: "1px solid #2563B8",
                          color: "#D6E3F2",
                          padding: "14px",
                          borderRadius: "12px",
                          fontWeight: "600",
                          fontSize: "16px",
                        }}
                      >
                        🔐 Change Password
                      </Button>

                    </>

                  )

                )}

              </Card.Body>

            </Card>

          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Profile;