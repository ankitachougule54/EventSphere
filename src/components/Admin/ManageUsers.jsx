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
  Modal,
  Badge,
} from "react-bootstrap";

const API_BASE = "https://eventsphere-5fey.onrender.com/users";

const ManageUsers = () => {
  // =========================
  // STATES
  // =========================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    pincode: "",
    age: "",
    role: "user",
  });

  // =========================
  // GET ALL USERS
  // =========================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

const response = await axios.get(
  "https://eventsphere-5fey.onrender.com/users",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      console.log("Users Response:", response.data);

      // Supports:
      // { users: [...] }
      // OR
      // [...]

      const userData = response.data.users || response.data;

      if (Array.isArray(userData)) {
        setUsers(userData);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("GET USERS ERROR:", err);

      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD USERS
  // =========================

  useEffect(() => {
    fetchUsers();
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
  // VIEW USER
  // =========================

  const handleView = (user) => {
    setSelectedUser(user);

    setShowViewModal(true);
  };

  // =========================
  // CLOSE VIEW MODAL
  // =========================

  const handleCloseView = () => {
    setSelectedUser(null);

    setShowViewModal(false);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEdit = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      contact: user.contact || "",
      address: user.address || "",
      pincode: user.pincode || "",
      age: user.age || "",
      role: user.role || "user",
    });

    setShowEditModal(true);
  };

  // =========================
  // CLOSE EDIT MODAL
  // =========================

  const handleCloseEdit = () => {
    setEditingUser(null);

    setShowEditModal(false);

    setFormData({
      name: "",
      email: "",
      contact: "",
      address: "",
      pincode: "",
      age: "",
      role: "user",
    });
  };

  // =========================
  // UPDATE USER
  // =========================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      await axios.put(
        `${API_BASE}/${editingUser._id}`,
        formData
      );

      setSuccess("User updated successfully!");

      setShowEditModal(false);

      setEditingUser(null);

      fetchUsers();
    } catch (err) {
      console.error("UPDATE USER ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update user."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE USER
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      await axios.delete(`${API_BASE}/${id}`);

      setSuccess("User deleted successfully!");

      fetchUsers();
    } catch (err) {
      console.error("DELETE USER ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete user."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ROLE BADGE
  // =========================

  const getRoleBadge = (role) => {
    if (role === "admin") {
      return (
        <Badge bg="danger">
          Admin
        </Badge>
      );
    }

    return (
      <Badge bg="primary">
        User
      </Badge>
    );
  };

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString();
  };

  // =========================
  // UI
  // =========================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07182e",
        padding: "40px 0",
        color: "white",
      }}
    >
      <Container>

        {/* ================= HEADER ================= */}

        <div className="text-center mb-4">

          <h2 className="fw-bold">
            Manage Users
          </h2>

          <p
            style={{
              color: "#aebbd0",
            }}
          >
            View, edit and manage registered users
          </p>

        </div>

        {/* ================= ALERTS ================= */}

        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            variant="success"
            dismissible
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        )}

        {/* ================= MAIN CARD ================= */}

        <Card
          className="shadow"
          style={{
            background: "#102a4c",
            border: "1px solid #29476a",
            color: "white",
          }}
        >

          <Card.Body>

            {/* ================= CARD HEADER ================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <h4 className="mb-1">
                  👥 All Users
                </h4>

                <small
                  style={{
                    color: "#aebbd0",
                  }}
                >
                  Total Users: {users.length}
                </small>
              </div>

              <Button
                variant="outline-light"
                onClick={fetchUsers}
                disabled={loading}
              >
                🔄 Refresh
              </Button>

            </div>

            {/* ================= LOADING ================= */}

            {loading && users.length === 0 ? (

              <div className="text-center py-5">

                <Spinner animation="border" />

                <p className="mt-2">
                  Loading users...
                </p>

              </div>

            ) : users.length === 0 ? (

              /* ================= NO USERS ================= */

              <div className="text-center py-5">

                <h5>
                  No users found
                </h5>

                <p
                  style={{
                    color: "#aebbd0",
                  }}
                >
                  Registered users will appear here.
                </p>

              </div>

            ) : (

              /* ================= USER TABLE ================= */

              <div className="table-responsive">

                <table
                  className="table table-dark table-hover align-middle"
                  style={{
                    background: "#07182e",
                  }}
                >

                  <thead>

                    <tr>

                      <th>#</th>

                      <th>Name</th>

                      <th>Email</th>

                      <th>Contact</th>

                      <th>Age</th>

                      <th>Role</th>

                      <th>Registered</th>

                      <th>Actions</th>

                    </tr>

                  </thead>

                  <tbody>

                    {users.map((user, index) => (

                      <tr key={user._id}>

                        <td>
                          {index + 1}
                        </td>

                        <td>
                          <strong>
                            {user.name}
                          </strong>
                        </td>

                        <td>
                          {user.email}
                        </td>

                        <td>
                          {user.contact}
                        </td>

                        <td>
                          {user.age}
                        </td>

                        <td>
                          {getRoleBadge(user.role)}
                        </td>

                        <td>
                          {formatDate(user.createdAt)}
                        </td>

                        <td>

                          <div className="d-flex gap-2">

                            {/* VIEW */}

                            <Button
                              variant="info"
                              size="sm"
                              onClick={() =>
                                handleView(user)
                              }
                            >
                              👁️
                            </Button>

                            {/* EDIT */}

                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() =>
                                handleEdit(user)
                              }
                            >
                              ✏️
                            </Button>

                            {/* DELETE */}

                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() =>
                                handleDelete(user._id)
                              }
                            >
                              🗑️
                            </Button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </Card.Body>

        </Card>

      </Container>

      {/* ===================================================== */}
      {/* VIEW USER MODAL */}
      {/* ===================================================== */}

      <Modal
        show={showViewModal}
        onHide={handleCloseView}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            👤 User Details
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          {selectedUser && (

            <div>

              <Row>

                <Col xs={6}>
                  <strong>Name</strong>
                </Col>

                <Col xs={6}>
                  {selectedUser.name}
                </Col>

              </Row>

              <hr />

              <Row>

                <Col xs={6}>
                  <strong>Email</strong>
                </Col>

                <Col xs={6}>
                  {selectedUser.email}
                </Col>

              </Row>

              <hr />

              <Row>

                <Col xs={6}>
                  <strong>Contact</strong>
                </Col>

                <Col xs={6}>
                  {selectedUser.contact}
                </Col>

              </Row>

              <hr />

              <Row>

                <Col xs={6}>
                  <strong>Address</strong>
                </Col>

                <Col xs={6}>
                  {selectedUser.address}
                </Col>

              </Row>

              <hr />

              <Row>

                <Col xs={6}>
                  <strong>Pincode</strong>
                </Col>

                <Col xs={6}>
                  {selectedUser.pincode}
                </Col>

              </Row>

              <hr />

              <Row>

                <Col xs={6}>
                  <strong>Age</strong>
                </Col>

                <Col xs={6}>
                  {selectedUser.age}
                </Col>

              </Row>

              <hr />

              <Row>

                <Col xs={6}>
                  <strong>Role</strong>
                </Col>

                <Col xs={6}>
                  {getRoleBadge(selectedUser.role)}
                </Col>

              </Row>

              <hr />

              <Row>

                <Col xs={6}>
                  <strong>Registered Date</strong>
                </Col>

                <Col xs={6}>
                  {formatDate(
                    selectedUser.createdAt
                  )}
                </Col>

              </Row>

            </div>

          )}

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={handleCloseView}
          >
            Close
          </Button>

        </Modal.Footer>

      </Modal>

      {/* ===================================================== */}
      {/* EDIT USER MODAL */}
      {/* ===================================================== */}

      <Modal
        show={showEditModal}
        onHide={handleCloseEdit}
        centered
        size="lg"
      >

        <Modal.Header closeButton>

          <Modal.Title>
            ✏️ Edit User
          </Modal.Title>

        </Modal.Header>

        <Form onSubmit={handleUpdate}>

          <Modal.Body>

            <Row>

              {/* NAME */}

              <Col md={6}>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Name
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

              </Col>

              {/* EMAIL */}

              <Col md={6}>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Email
                  </Form.Label>

                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

              </Col>

            </Row>

            <Row>

              {/* CONTACT */}

              <Col md={6}>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Contact
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

              </Col>

              {/* AGE */}

              <Col md={3}>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Age
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

              </Col>

              {/* ROLE */}

              <Col md={3}>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Role
                  </Form.Label>

                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >

                    <option value="user">
                      User
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </Form.Select>

                </Form.Group>

              </Col>

            </Row>

            {/* ADDRESS */}

            <Form.Group className="mb-3">

              <Form.Label>
                Address
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

            </Form.Group>

            {/* PINCODE */}

            <Form.Group className="mb-3">

              <Form.Label>
                Pincode
              </Form.Label>

              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />

            </Form.Group>

            <Alert variant="info">
              Password cannot be changed from this
              form. Use the password management flow
              separately.
            </Alert>

          </Modal.Body>

          <Modal.Footer>

            <Button
              variant="secondary"
              type="button"
              onClick={handleCloseEdit}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <Spinner
                    size="sm"
                    className="me-2"
                  />

                  Updating...
                </>
              ) : (
                "Update User"
              )}

            </Button>

          </Modal.Footer>

        </Form>

      </Modal>

    </div>
  );
};

export default ManageUsers;

