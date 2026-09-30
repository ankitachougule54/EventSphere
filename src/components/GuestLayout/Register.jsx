import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    address: "",
    pincode: "",
    age: ""
  });

  // PROFILE IMAGE STATE
  const [profileImage, setProfileImage] = useState(null);

  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);

    try {

      // CREATE FORMDATA
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("contact", formData.contact);
      data.append("password", formData.password);
      data.append("address", formData.address);
      data.append("pincode", formData.pincode);
      data.append("age", formData.age);

      // ADD PROFILE IMAGE
      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const res = await axios.post(
        "http://localhost:9000/users/register",
        data
      );

      setMessage({
        text: res.data.message,
        type: "success"
      });

      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        address: "",
        pincode: "",
        age: ""
      });

      // RESET IMAGE
      setProfileImage(null);

      setValidated(false);

    } catch (err) {

      setMessage({
        text: err.response?.data?.message || "Something went wrong",
        type: "danger"
      });

    } finally {

      setIsLoading(false);

    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body>

              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Create Account</h2>
                <p className="text-muted">
                  Please fill in your details to register
                </p>
              </div>

              {message && (
                <Alert variant={message.type} className="mb-3">
                  {message.text}
                </Alert>
              )}

              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide your name.
                  </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>

                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>

                  <Form.Control
                    type="text"
                    name="contact"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide your contact number.
                  </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>address</Form.Label>

                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide your address.
                  </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>

                  <Form.Control
                    type="text"
                    name="pincode"
                    placeholder="Enter your pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide your pincode.
                  </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>

                  <Form.Control
                    type="text"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide your age.
                  </Form.Control.Feedback>
                </Form.Group>


                {/* PROFILE IMAGE */}
                <Form.Group className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>

                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setProfileImage(e.target.files[0])
                    }
                  />

                  <Form.Text className="text-muted">
                    Upload your profile picture
                  </Form.Text>
                </Form.Group>


                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />

                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters.
                  </Form.Control.Feedback>

                  <Form.Text className="text-muted">
                    Must be at least 6 characters long.
                  </Form.Text>
                </Form.Group>


                <div className="d-grid">

                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                  >

                    {isLoading
                      ? 'Creating Account...'
                      : 'Register'}

                  </Button>

                </div>

              </Form>


              <div className="text-center mt-3">
                <p className="text-muted">

                  Already have an account?{" "}

                  <a
                    href="/login"
                    className="text-decoration-none"
                  >
                    Sign in
                  </a>

                </p>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>


<style>{` 
  /* ================================ 
     REGISTER PAGE - DARK BLUE DESIGN 
     ================================ */ 
 
  html, 
  body, 
  #root { 
    margin: 0; 
    padding: 0; 
    min-height: 100%; 
    background: #061525 !important; 
  } 
 
  body { 
    background: linear-gradient( 
      135deg, 
      #061525 0%, 
      #081b30 50%, 
      #061525 100% 
    ) !important; 
    color: #ffffff; 
  } 
 
  /* Main container */ 
  .mt-5 { 
    margin-top: 0 !important; 
    min-height: 100vh; 
    padding: 45px 15px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
  } 
 
  /* Row */ 
  .justify-content-center { 
    width: 100%; 
  } 
 
  /* Register card column */ 
  .justify-content-center > .col-md-6 { 
    width: 100%; 
    max-width: 540px; 
  } 
 
  /* ================================ 
     CARD 
     ================================ */ 
 
  .card { 
    background: #0b223b !important; 
    border: 1px solid #1264a3 !important; 
    border-radius: 30px !important; 
    box-shadow: 
      0 0 20px rgba(0, 123, 255, 0.15), 
      0 0 50px rgba(0, 123, 255, 0.08) !important; 
    overflow: hidden; 
    color: #ffffff !important; 
  } 
 
  .card-body { 
    padding: 42px 45px !important; 
  } 
 
  /* ================================ 
     HEADING 
     ================================ */ 
 
  .card h2 { 
    color: #ffffff !important; 
    font-size: 36px; 
    font-weight: 700; 
    margin-bottom: 8px; 
  } 
 
  .card .text-muted { 
    color: #9db5d0 !important; 
  } 
 
  /* ================================ 
     FORM LABELS 
     ================================ */ 
 
  .form-label { 
    color: #ffffff !important; 
    font-size: 16px; 
    font-weight: 600; 
    margin-bottom: 9px; 
  } 
 
  /* ================================ 
     INPUTS 
     ================================ */ 
 
  .form-control { 
    background: #142f4a !important; 
    border: 1px solid #28628e !important; 
    color: #ffffff !important; 
    border-radius: 15px !important; 
    padding: 14px 18px !important; 
    font-size: 16px; 
    min-height: 52px; 
    transition: all 0.3s ease; 
  } 
 
  .form-control::placeholder { 
    color: #86a3c3 !important; 
    opacity: 1; 
  } 
 
  .form-control:focus { 
    background: #163650 !important; 
    color: #ffffff !important; 
    border-color: #1687ff !important; 
    box-shadow: 
      0 0 0 2px rgba(22, 135, 255, 0.15), 
      0 0 15px rgba(22, 135, 255, 0.25) !important; 
    outline: none; 
  } 
 
  /* ================================ 
     VALIDATION TEXT 
     ================================ */ 
 
  .invalid-feedback { 
    color: #ff7b7b !important; 
  } 
 
  .form-text { 
    color: #8ea9c5 !important; 
  } 
 
  /* ================================ 
     REGISTER BUTTON 
     ================================ */ 
 
  .btn-primary { 
    background: linear-gradient( 
      90deg, 
      #087ff5, 
      #1458d4 
    ) !important; 
 
    border: none !important; 
    border-radius: 15px !important; 
 
    min-height: 58px; 
    padding: 14px 20px !important; 
 
    font-size: 18px; 
    font-weight: 700; 
 
    color: #ffffff !important; 
 
    box-shadow: 
      0 8px 20px rgba(0, 110, 255, 0.25); 
 
    transition: all 0.3s ease; 
  } 
 
  .btn-primary:hover { 
    transform: translateY(-2px); 
    background: linear-gradient( 
      90deg, 
      #168cff, 
      #1768ed 
    ) !important; 
 
    box-shadow: 
      0 10px 25px rgba(0, 123, 255, 0.4); 
  } 
 
  .btn-primary:active { 
    transform: scale(0.98); 
  } 
 
  .btn-primary:disabled { 
    opacity: 0.7; 
    transform: none; 
  } 
 
  /* ================================ 
     ALERT 
     ================================ */ 
 
  .alert { 
    border-radius: 12px !important; 
    border: none !important; 
  } 
 
  /* ================================ 
     BOTTOM LOGIN LINK 
     ================================ */ 
 
  .card-body > .text-center:last-child { 
    margin-top: 25px !important; 
    padding-top: 20px; 
    border-top: 1px solid rgba(120, 170, 210, 0.18); 
  } 
 
  .card-body > .text-center:last-child p { 
    color: #9db5d0 !important; 
    margin-bottom: 0; 
  } 
 
  .card-body a { 
    color: #2998ff !important; 
    font-weight: 600; 
    text-decoration: none !important; 
    transition: all 0.3s ease; 
  } 
 
  .card-body a:hover { 
    color: #66b8ff !important; 
    text-shadow: 0 0 8px rgba(41, 152, 255, 0.5); 
  } 
 
  /* ================================ 
     SPACING 
     ================================ */ 
 
  .mb-3 { 
    margin-bottom: 20px !important; 
  } 
 
  .mb-4 { 
    margin-bottom: 25px !important; 
  } 
 
  /* ================================ 
     RESPONSIVE 
     ================================ */ 
 
  @media (max-width: 768px) { 
 
    .mt-5 { 
      padding: 25px 15px; 
      align-items: flex-start; 
    } 
 
    .card-body { 
      padding: 35px 25px !important; 
    } 
 
    .card h2 { 
      font-size: 30px; 
    } 
 
    .form-control { 
      min-height: 50px; 
    } 
  } 
 
  @media (max-width: 480px) { 
 
    .mt-5 { 
      padding: 15px 10px; 
    } 
 
    .card { 
      border-radius: 22px !important; 
    } 
 
    .card-body { 
      padding: 30px 20px !important; 
    } 
 
    .card h2 { 
      font-size: 27px; 
    } 
 
    .form-label { 
      font-size: 15px; 
    } 
 
    .form-control { 
      font-size: 15px; 
      padding: 12px 15px !important; 
    } 
  } 
`}</style>

    </Container>
  );
};

export default Register;