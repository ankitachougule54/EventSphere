import React from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from "react-bootstrap";


const API_BASE = "https://eventsphere-5fey.onrender.com/users"; 
 
export default class ChangePassword extends React.Component { 
  state = { 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "", 
    loading: false, 
    error: "", 
    success: "", 
  }; 
 
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value }); 
 
  handleSubmit = async (e) => { 
    e.preventDefault(); 
    this.setState({ error: "", success: "" }); 
 
    const { currentPassword, newPassword, confirmPassword } = this.state; 
 
    // Get email from localStorage 
    const storedUser = localStorage.getItem('user'); 
    const parsedUser = storedUser ? JSON.parse(storedUser) : null; 
    const email = parsedUser?.email; 
 
    if (!email) { 
      return this.setState({ error: "Could not determine your email. Please sign in and try again." }); 
    } 
    if (!currentPassword || !newPassword) { 
      return this.setState({ error: "Please fill all required fields." }); 
    } 
    if (newPassword.length < 6) { 
      return this.setState({ error: "New password should be at least 6 characters." }); 
    } 
    if (newPassword !== confirmPassword) { 
      return this.setState({ error: "New password and confirmation do not match." }); 
    } 
 
    this.setState({ loading: true }); 
    try { 
      const payload = { email, currentPassword, newPassword }; 
      const res = await axios.post(`${API_BASE}/change-password`, payload); 
      this.setState({ 
        success: res.data?.message || "Password changed successfully.", 
        currentPassword: "", 
        newPassword: "", 
        confirmPassword: "", 
      }); 
    } catch (err) { 
      const msg = err?.response?.data?.message || "Failed to change password. Try again."; 
      this.setState({ error: msg }); 
    } finally { 
      this.setState({ loading: false }); 
    } 
  }; 
 
  render() { 
    const { currentPassword, newPassword, confirmPassword, loading, error, success } = this.state; 
    
    return ( 
      <>
        <style>
          {`
            /* ChangePassword.css */
            .dark-page-container {
              /* You can remove this if your app's global body already handles the dark background */
              background-color: #061121; 
              min-height: 100vh;
              display: flex;
              align-items: center;
              color: #ffffff;
            }

            .auth-card {
              background-color: #0a1930; /* Darker navy for the card */
              border: 1px solid #1a5cff; /* Neon blue border */
              border-radius: 16px;
              box-shadow: 0 0 20px rgba(26, 92, 255, 0.15); /* Subtle glow effect */
              padding: 1rem;
            }

            .auth-card-title {
              font-weight: 700;
              font-size: 2rem;
              color: #ffffff;
            }

            .auth-card-subtitle {
              color: #8892b0;
              font-size: 0.95rem;
            }

            .auth-label {
              color: #ffffff;
              font-weight: 600;
              font-size: 0.9rem;
              margin-bottom: 0.4rem;
            }

            .auth-input {
              background-color: #112240; /* Dark input background */
              border: 1px solid #233554; /* Subtle inner border */
              color: #ffffff;
              padding: 0.6rem 1rem;
              border-radius: 8px;
            }

            .auth-input:focus {
              background-color: #112240;
              color: #ffffff;
              border-color: #1a5cff;
              box-shadow: 0 0 0 0.25rem rgba(26, 92, 255, 0.25);
            }

            .auth-input::placeholder {
              color: #64748b;
            }

            .auth-btn {
              background-color: #1a5cff;
              border: none;
              font-weight: 600;
              padding: 0.6rem;
              border-radius: 8px;
              transition: all 0.3s ease;
            }

            .auth-btn:hover, .auth-btn:focus, .auth-btn:active {
              background-color: #0d42cc !important;
              box-shadow: 0 0 10px rgba(26, 92, 255, 0.4) !important;
            }
          `}
        </style>
        
        <div className="dark-page-container pt-5 pb-5">
          <Container> 
            <Row className="justify-content-center"> 
              <Col xs={12} md={9} lg={6}> 
                <Card className="auth-card"> 
                  <Card.Body className="p-4 p-md-5"> 
                    <h2 className="mb-2 text-center auth-card-title">Change Password</h2> 
                    <p className="text-center mb-4 auth-card-subtitle">Please enter your current and new password</p>
                    
                    {success && <Alert variant="success">{success}</Alert>} 
                    {error && <Alert variant="danger">{error}</Alert>} 
                    
                    <Form onSubmit={this.handleSubmit}> 
                      <Form.Group controlId="cpCurrent" className="mb-4"> 
                        <Form.Label className="auth-label">Current Password</Form.Label> 
                        <Form.Control 
                          className="auth-input"
                          name="currentPassword" 
                          type="password" 
                          placeholder="Enter your current password" 
                          value={currentPassword} 
                          onChange={this.handleChange} 
                          required 
                        /> 
                      </Form.Group> 
                      
                      <Form.Group controlId="cpNew" className="mb-4"> 
                        <Form.Label className="auth-label">New Password</Form.Label> 
                        <Form.Control 
                          className="auth-input"
                          name="newPassword" 
                          type="password" 
                          placeholder="Enter new password (min 6 chars)" 
                          value={newPassword} 
                          onChange={this.handleChange} 
                          required 
                        /> 
                      </Form.Group> 
                        
                      <Form.Group controlId="cpConfirm" className="mb-5"> 
                        <Form.Label className="auth-label">Confirm New Password</Form.Label> 
                        <Form.Control 
                          className="auth-input"
                          name="confirmPassword" 
                          type="password" 
                          placeholder="Confirm new password" 
                          value={confirmPassword} 
                          onChange={this.handleChange} 
                          required 
                        /> 
                      </Form.Group> 
                      
                      <div className="d-grid"> 
                        <Button className="auth-btn" type="submit" disabled={loading}> 
                          {loading ? <><Spinner size="sm" className="me-2" /> Updating...</> : "Update Password"} 
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