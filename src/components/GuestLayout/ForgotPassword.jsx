import React from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from "react-bootstrap";

const API_BASE = "https://eventsphere-5fey.onrender.com/users";

export default class ForgotPassword extends React.Component {
  state = {
    email: "",
    loading: false,
    error: "",
    success: "",
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "", success: "" });

    const { email } = this.state;
    if (!email) return this.setState({ error: "Please enter your email address." });

    this.setState({ loading: true });
    try {
      const res = await axios.post(`${API_BASE}/forgot-password`, { email });
      this.setState({
        success: res.data?.message || "Temporary password sent to your email.",
        email: "",
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to send temporary password. Try again.";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, loading, error, success } = this.state;

    return (
      <>
        <style>
          {`
            .dark-theme-wrapper {
              background-color: #061121;
              min-height: 100vh;
              color: #ffffff;
              display: flex;
              align-items: center;
            }
            .dark-theme-wrapper .card {
              background-color: #0a1930;
              border: 1px solid #1a5cff;
              border-radius: 16px;
              box-shadow: 0 0 20px rgba(26, 92, 255, 0.15);
            }
            .dark-theme-wrapper h4 {
              color: #ffffff;
              font-weight: 700;
              font-size: 2rem;
              margin-bottom: 1.5rem !important;
            }
            .dark-theme-wrapper .form-label {
              color: #ffffff;
              font-weight: 600;
              font-size: 0.9rem;
            }
            .dark-theme-wrapper .form-control {
              background-color: #112240;
              border: 1px solid #233554;
              color: #ffffff;
              padding: 0.6rem 1rem;
              border-radius: 8px;
            }
            .dark-theme-wrapper .form-control:focus {
              background-color: #112240;
              color: #ffffff;
              border-color: #1a5cff;
              box-shadow: 0 0 0 0.25rem rgba(26, 92, 255, 0.25);
            }
            .dark-theme-wrapper .form-control::placeholder {
              color: #64748b;
            }
            .dark-theme-wrapper .btn-primary {
              background-color: #1a5cff;
              border: none;
              font-weight: 600;
              padding: 0.6rem;
              border-radius: 8px;
              transition: all 0.3s ease;
            }
            .dark-theme-wrapper .btn-primary:hover,
            .dark-theme-wrapper .btn-primary:focus {
              background-color: #0d42cc !important;
              box-shadow: 0 0 10px rgba(26, 92, 255, 0.4) !important;
            }
          `}
        </style>

        <div className="dark-theme-wrapper">
          <Container className="py-4">
            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={6}>
                <Card className="shadow-sm">
                  <Card.Body className="p-4 p-md-5">
                    <h4 className="mb-3 text-center">Forgot Password</h4>
                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group className="mb-4" controlId="fpEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      <div className="d-grid mt-2">
                        <Button variant="primary" type="submit" disabled={loading}>
                          {loading ? <><Spinner size="sm" className="me-2" /> Sending...</> : "Send Temporary Password"}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}