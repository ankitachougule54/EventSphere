import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

import {
  MdEdit,
  MdDelete,
  MdAdd,
  MdClose,
  MdCode,
  MdRefresh,
} from "react-icons/md";

const API_URL = "http://localhost:9000/tech";

const Tech = () => {
  // ============================
  // STATES
  // ============================

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    createdBy: "",
  });

  const [techs, setTechs] = useState([]);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // ============================
  // HANDLE INPUT
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ============================
  // RESET FORM
  // ============================

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      skills: "",
      createdBy: "",
    });

    setEditId(null);
  };

  // ============================
  // FETCH TECHNOLOGIES
  // ============================

  const fetchTechs = async () => {
    try {
      setFetching(true);
      setError("");

      const response = await axios.get(API_URL);

      setTechs(response.data.techs || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Error fetching technologies."
      );
    } finally {
      setFetching(false);
    }
  };

  // ============================
  // LOAD DATA
  // ============================

  useEffect(() => {
    fetchTechs();
  }, []);

  // ============================
  // ADD / UPDATE
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.title.trim() === "") {
      setError("Please enter technology title.");
      return;
    }

    if (formData.skills.trim() === "") {
      setError("Please enter skills.");
      return;
    }

    if (formData.createdBy.trim() === "") {
      setError("Please enter created by.");
      return;
    }

    try {
      setLoading(true);

      // ============================
      // UPDATE
      // ============================

      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, {
          title: formData.title,
          description: formData.description,
          skills: formData.skills,
          createdBy: formData.createdBy,
        });

        setMessage("Technology updated successfully.");
      }

      // ============================
      // ADD
      // ============================

      else {
        await axios.post(API_URL, {
          title: formData.title,
          description: formData.description,
          skills: formData.skills,
          createdBy: formData.createdBy,
        });

        setMessage("Technology added successfully.");
      }

      resetForm();
      await fetchTechs();

    } catch (err) {
      console.error("SAVE ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save technology."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // EDIT
  // ============================

  const handleEdit = (tech) => {
    setFormData({
      title: tech.title || "",
      description: tech.description || "",
      skills: tech.skills || "",
      createdBy: tech.createdBy || "",
    });

    setEditId(tech._id);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================
  // DELETE
  // ============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this technology?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setMessage("");
      setError("");
      setLoading(true);

      await axios.delete(`${API_URL}/${id}`);

      setMessage("Technology deleted successfully.");

      await fetchTechs();

    } catch (err) {
      console.error("DELETE ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to delete technology."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // CANCEL EDIT
  // ============================

  const handleCancel = () => {
    resetForm();
    setMessage("");
    setError("");
  };

  // ============================
  // UI
  // ============================

  return (
    <div className="tech-page">

      <Container>

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="tech-header">

          <div className="header-content">

            <div>

              <div className="small-heading">
                TECHNOLOGY MANAGEMENT
              </div>

              <h1>
                Manage Technologies
              </h1>

              <p>
                Add, update and manage all technologies
                in one place.
              </p>

            </div>

            {/* TOTAL TECHNOLOGIES */}

            <div className="total-card">

              <div className="total-icon">
                <MdCode />
              </div>

              <div>

                <span>
                  Total Technologies
                </span>

                <strong>
                  {techs.length}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* =========================================
            SUCCESS / ERROR MESSAGE
        ========================================= */}

        {message && (
          <div className="message success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="message error-message">
            {error}
          </div>
        )}


        {/* =========================================
            FORM CARD
        ========================================= */}

        <div className="form-card">

          {/* FORM HEADER */}

          <div className="form-heading">

            <div className="plus-icon">

              {editId !== null ? (
                <MdEdit />
              ) : (
                <MdAdd />
              )}

            </div>

            <div>

              <h2>
                {editId !== null
                  ? "Edit Technology"
                  : "Add New Technology"}
              </h2>

              <p>
                {editId !== null
                  ? "Update technology information."
                  : "Enter details to add a new technology."}
              </p>

            </div>

          </div>


          {/* FORM */}

          <Form onSubmit={handleSubmit}>

            <Row>

              {/* TITLE */}

              <Col md={6}>

                <div className="input-group-custom">

                  <Form.Label>
                    Technology Title
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter technology title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* CREATED BY */}

              <Col md={6}>

                <div className="input-group-custom">

                  <Form.Label>
                    Created By
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="createdBy"
                    placeholder="Enter creator name"
                    value={formData.createdBy}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>


              {/* SKILLS */}

              <Col md={12}>

                <div className="input-group-custom">

                  <Form.Label>
                    Skills
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="skills"
                    placeholder="Example: React, Node.js, MongoDB"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                  />

                  <small>
                    Enter skills separated by commas.
                  </small>

                </div>

              </Col>


              {/* DESCRIPTION */}

              <Col md={12}>

                <div className="input-group-custom">

                  <Form.Label>
                    Description
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    placeholder="Enter technology description"
                    value={formData.description}
                    onChange={handleChange}
                  />

                </div>

              </Col>

            </Row>


            {/* BUTTONS */}

            <div className="form-buttons">

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                    />

                    <span>
                      Processing...
                    </span>
                  </>
                ) : editId !== null ? (
                  <>
                    <MdEdit />

                    Update Technology
                  </>
                ) : (
                  <>
                    <MdAdd />

                    Add Technology
                  </>
                )}

              </button>


              {editId !== null && (

                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                  disabled={loading}
                >

                  <MdClose />

                  Cancel

                </button>

              )}

            </div>

          </Form>

        </div>


        {/* =========================================
            TECHNOLOGY LIST HEADER
        ========================================= */}

        <div className="list-header">

          <div>

            <div className="small-heading">
              YOUR TECHNOLOGIES
            </div>

            <h2>
              Technology List
            </h2>

            <p>
              Manage all available technologies.
            </p>

          </div>


          {/* REFRESH */}

          <button
            className="refresh-button"
            onClick={fetchTechs}
            disabled={fetching}
          >

            <MdRefresh />

            {fetching
              ? "Refreshing..."
              : "Refresh"}

          </button>

        </div>


        {/* =========================================
            LOADING
        ========================================= */}

        {fetching ? (

          <div className="loading-box">

            <Spinner animation="border" />

            <p>
              Loading technologies...
            </p>

          </div>

        ) : techs.length === 0 ? (

          /* =========================================
              EMPTY
          ========================================= */

          <div className="empty-box">

            <MdCode size={55} />

            <h3>
              No Technologies Found
            </h3>

            <p>
              Add your first technology using
              the form above.
            </p>

          </div>

        ) : (

          /* =========================================
              TECHNOLOGY CARDS
          ========================================= */

          <Row>

            {techs.map((tech, index) => (

              <Col
                md={6}
                lg={4}
                key={tech._id}
                className="mb-4"
              >

                <div
                  className="tech-card"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >

                  {/* CARD TOP */}

                  <div className="card-top">

                    <div className="tech-icon">

                      <MdCode />

                    </div>

                    <div>

                      <div className="tech-label">
                        TECHNOLOGY
                      </div>

                      <h3>
                        {tech.title}
                      </h3>

                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <div className="tech-section">

                    <label>
                      Description
                    </label>

                    <p>
                      {tech.description ||
                        "No description available."}
                    </p>

                  </div>


                  {/* SKILLS */}

                  <div className="tech-section">

                    <label>
                      Skills
                    </label>

                    <div className="skills-container">

                      {tech.skills
                        ? tech.skills
                            .split(",")
                            .map(
                              (skill, skillIndex) => (
                                <span
                                  className="skill-badge"
                                  key={skillIndex}
                                >
                                  {skill.trim()}
                                </span>
                              )
                            )
                        : (
                          <span className="skill-badge">
                            No skills
                          </span>
                        )}

                    </div>

                  </div>


                  {/* CREATED BY */}

                  <div className="created-by">

                    <span>
                      Created By
                    </span>

                    <strong>
                      {tech.createdBy}
                    </strong>

                  </div>


                  {/* ACTIONS */}

                  <div className="card-actions">

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(tech)
                      }
                      title="Edit Technology"
                    >

                      <MdEdit />

                      Edit

                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(tech._id)
                      }
                      title="Delete Technology"
                    >

                      <MdDelete />

                      Delete

                    </button>

                  </div>

                </div>

              </Col>

            ))}

          </Row>

        )}

      </Container>


      {/* =========================================
          CSS
      ========================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        /* =========================================
           MAIN PAGE
        ========================================= */

        .tech-page {

          min-height: 100vh;

          background:
            radial-gradient(
              circle at top right,
              rgba(0, 119, 255, 0.12),
              transparent 35%
            ),
            #06182b;

          color: white;

          padding: 40px 0 90px;

        }


        /* =========================================
           HEADER
        ========================================= */

        .tech-header {

          background: #0b223b;

          border: 1px solid #087dcc;

          border-radius: 24px;

          padding: 48px 50px;

          margin-bottom: 50px;

          box-shadow:
            0 0 30px rgba(0, 126, 255, 0.05);

          animation:
            slideDown 0.7s ease forwards;

        }


        .header-content {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 30px;

        }


        .small-heading {

          color: #199cff;

          font-size: 14px;

          font-weight: 700;

          letter-spacing: 4px;

          margin-bottom: 20px;

        }


        .tech-header h1 {

          color: #ffffff;

          font-size: 50px;

          font-weight: 800;

          margin: 0 0 12px;

        }


        .tech-header p {

          color: #8eaccb;

          font-size: 20px;

          margin: 0;

        }


        /* =========================================
           TOTAL CARD
        ========================================= */

        .total-card {

          min-width: 270px;

          background: #102e4b;

          border: 1px solid #167fc5;

          border-radius: 20px;

          padding: 25px 30px;

          display: flex;

          align-items: center;

          gap: 20px;

          animation:
            fadeInRight 0.8s ease forwards;

        }


        .total-icon {

          width: 62px;

          height: 62px;

          border-radius: 50%;

          background: #0879ec;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 32px;

          color: white;

          box-shadow:
            0 0 25px rgba(0, 125, 255, 0.5);

          animation:
            iconPulse 2.5s infinite;

        }


        .total-card span {

          display: block;

          color: #8da9c6;

          font-size: 16px;

          margin-bottom: 3px;

        }


        .total-card strong {

          display: block;

          color: white;

          font-size: 34px;

          line-height: 1;

        }


        /* =========================================
           MESSAGES
        ========================================= */

        .message {

          padding: 15px 20px;

          border-radius: 12px;

          margin-bottom: 25px;

          animation:
            fadeIn 0.4s ease;

        }


        .success-message {

          background: rgba(25, 180, 110, 0.12);

          border: 1px solid #198754;

          color: #7ee2b3;

        }


        .error-message {

          background: rgba(220, 53, 69, 0.12);

          border: 1px solid #dc3545;

          color: #ff8995;

        }


        /* =========================================
           FORM CARD
        ========================================= */

        .form-card {

          background: #0b223b;

          border: 1px solid #087dcc;

          border-radius: 24px;

          padding: 55px 60px;

          margin-bottom: 60px;

          box-shadow:
            0 0 30px rgba(0, 126, 255, 0.04);

          animation:
            fadeUp 0.8s ease forwards;

        }


        .form-heading {

          display: flex;

          align-items: center;

          gap: 22px;

          margin-bottom: 42px;

        }


        .plus-icon {

          width: 74px;

          height: 74px;

          border-radius: 50%;

          background: #0879ec;

          color: white;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 36px;

          flex-shrink: 0;

          box-shadow:
            0 0 25px rgba(0, 125, 255, 0.45);

          transition: 0.3s;

        }


        .plus-icon:hover {

          transform:
            rotate(8deg)
            scale(1.08);

        }


        .form-heading h2 {

          color: white;

          font-size: 36px;

          font-weight: 750;

          margin: 0 0 5px;

        }


        .form-heading p {

          color: #91adca;

          font-size: 18px;

          margin: 0;

        }


        /* =========================================
           INPUTS
        ========================================= */

        .input-group-custom {

          margin-bottom: 28px;

        }


        .input-group-custom label {

          color: #ffffff;

          font-size: 17px;

          font-weight: 650;

          margin-bottom: 11px;

          display: block;

        }


        .input-group-custom .form-control {

          background: #143654;

          color: white;

          border: 1px solid #267eb4;

          border-radius: 14px;

          padding: 17px 20px;

          font-size: 16px;

          min-height: 64px;

          box-shadow: none;

          transition: 0.25s;

        }


        .input-group-custom textarea.form-control {

          min-height: 140px;

          resize: vertical;

        }


        .input-group-custom .form-control::placeholder {

          color: #7898b8;

        }


        .input-group-custom .form-control:focus {

          background: #143654;

          color: white;

          border-color: #168ef0;

          box-shadow:
            0 0 0 3px rgba(0, 126, 255, 0.13);

          transform: translateY(-1px);

        }


        .input-group-custom small {

          display: block;

          margin-top: 7px;

          color: #7898b8;

        }


        /* =========================================
           FORM BUTTONS
        ========================================= */

        .form-buttons {

          display: flex;

          gap: 12px;

          margin-top: 30px;

        }


        .primary-button,
        .cancel-button {

          border-radius: 10px;

          padding: 13px 25px;

          font-size: 16px;

          font-weight: 650;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          cursor: pointer;

          transition: 0.25s;

        }


        .primary-button {

          background: #0879ec;

          color: white;

          border: none;

          box-shadow:
            0 5px 20px rgba(0, 121, 236, 0.2);

        }


        .primary-button:hover {

          background: #168cf5;

          transform: translateY(-2px);

          box-shadow:
            0 8px 25px rgba(0, 121, 236, 0.35);

        }


        .cancel-button {

          background: #263b50;

          color: #d8e3ee;

          border: 1px solid #405a73;

        }


        .cancel-button:hover {

          background: #344e67;

          transform: translateY(-2px);

        }


        /* =========================================
           LIST HEADER
        ========================================= */

        .list-header {

          display: flex;

          justify-content: space-between;

          align-items: flex-end;

          gap: 25px;

          margin-bottom: 30px;

          animation:
            fadeUp 0.8s ease;

        }


        .list-header .small-heading {

          margin-bottom: 12px;

        }


        .list-header h2 {

          color: white;

          font-size: 36px;

          font-weight: 750;

          margin: 0 0 5px;

        }


        .list-header p {

          color: #8da8c4;

          margin: 0;

          font-size: 17px;

        }


        /* =========================================
           REFRESH
        ========================================= */

        .refresh-button {

          background: #102e4b;

          color: #9cccf2;

          border: 1px solid #267eb4;

          border-radius: 10px;

          padding: 11px 20px;

          display: flex;

          align-items: center;

          gap: 7px;

          font-size: 15px;

          cursor: pointer;

          transition: 0.25s;

        }


        .refresh-button:hover {

          background: #143c5d;

          color: white;

          transform: translateY(-2px);

        }


        /* =========================================
           TECHNOLOGY CARD
        ========================================= */

        .tech-card {

          height: 100%;

          background: #0b223b;

          border: 1px solid #087dcc;

          border-radius: 20px;

          padding: 28px;

          box-shadow:
            0 0 30px rgba(0, 126, 255, 0.04);

          opacity: 0;

          animation:
            cardAppear 0.6s ease forwards;

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;

        }


        .tech-card:hover {

          transform: translateY(-8px);

          border-color: #168ef0;

          box-shadow:
            0 12px 35px rgba(0, 126, 255, 0.16);

        }


        /* =========================================
           CARD TOP
        ========================================= */

        .card-top {

          display: flex;

          align-items: center;

          gap: 15px;

          padding-bottom: 22px;

          border-bottom: 1px solid #183b58;

          margin-bottom: 22px;

        }


        .tech-icon {

          width: 58px;

          height: 58px;

          border-radius: 15px;

          background: #0879ec;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 29px;

          color: white;

          flex-shrink: 0;

          box-shadow:
            0 0 20px rgba(0, 125, 255, 0.35);

          transition: 0.3s;

        }


        .tech-card:hover .tech-icon {

          transform:
            rotate(-5deg)
            scale(1.08);

        }


        .tech-label {

          color: #199cff;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 2px;

          margin-bottom: 3px;

        }


        .card-top h3 {

          color: white;

          font-size: 23px;

          font-weight: 750;

          margin: 0;

          word-break: break-word;

        }


        /* =========================================
           CARD SECTIONS
        ========================================= */

        .tech-section {

          margin-bottom: 20px;

        }


        .tech-section label {

          display: block;

          color: #8da9c6;

          font-size: 13px;

          font-weight: 700;

          letter-spacing: 0.5px;

          margin-bottom: 7px;

          text-transform: uppercase;

        }


        .tech-section p {

          color: #c4d5e5;

          font-size: 15px;

          line-height: 1.6;

          margin: 0;

          display: -webkit-box;

          -webkit-line-clamp: 4;

          -webkit-box-orient: vertical;

          overflow: hidden;

        }


        /* =========================================
           SKILLS
        ========================================= */

        .skills-container {

          display: flex;

          flex-wrap: wrap;

          gap: 7px;

        }


        .skill-badge {

          display: inline-block;

          background: #143654;

          color: #91c9f5;

          border: 1px solid #286c99;

          padding: 6px 10px;

          border-radius: 20px;

          font-size: 12px;

          font-weight: 600;

          transition: 0.2s;

        }


        .skill-badge:hover {

          background: #17466b;

          border-color: #168ef0;

          transform: translateY(-2px);

        }


        /* =========================================
           CREATED BY
        ========================================= */

        .created-by {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 10px;

          padding: 14px 0;

          border-top: 1px solid #183b58;

          border-bottom: 1px solid #183b58;

          margin-top: 8px;

        }


        .created-by span {

          color: #7898b5;

          font-size: 13px;

        }


        .created-by strong {

          color: #ffffff;

          font-size: 14px;

        }


        /* =========================================
           CARD ACTIONS
        ========================================= */

        .card-actions {

          display: flex;

          gap: 10px;

          margin-top: 20px;

        }


        .edit-button,
        .delete-button {

          flex: 1;

          border: none;

          border-radius: 9px;

          padding: 10px 14px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 6px;

          color: white;

          font-weight: 600;

          cursor: pointer;

          transition: 0.25s;

        }


        .edit-button {

          background: #b77b16;

        }


        .edit-button:hover {

          background: #d89720;

          transform: translateY(-2px);

        }


        .delete-button {

          background: #b52c3b;

        }


        .delete-button:hover {

          background: #d93649;

          transform: translateY(-2px);

        }


        /* =========================================
           LOADING
        ========================================= */

        .loading-box {

          text-align: center;

          padding: 70px 20px;

          color: #8da8c4;

        }


        .loading-box .spinner-border {

          color: #168ef0;

        }


        .loading-box p {

          margin-top: 15px;

        }


        /* =========================================
           EMPTY
        ========================================= */

        .empty-box {

          background: #0b223b;

          border: 1px solid #087dcc;

          border-radius: 20px;

          padding: 70px 20px;

          text-align: center;

          animation:
            fadeUp 0.6s ease;

        }


        .empty-box svg {

          color: #187fc8;

          margin-bottom: 15px;

        }


        .empty-box h3 {

          color: white;

          margin-bottom: 8px;

        }


        .empty-box p {

          color: #7898b5;

          margin: 0;

        }


        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes slideDown {

          from {

            opacity: 0;

            transform:
              translateY(-30px);

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }

        }


        @keyframes fadeUp {

          from {

            opacity: 0;

            transform:
              translateY(30px);

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }

        }


        @keyframes fadeInRight {

          from {

            opacity: 0;

            transform:
              translateX(30px);

          }

          to {

            opacity: 1;

            transform:
              translateX(0);

          }

        }


        @keyframes fadeIn {

          from {

            opacity: 0;

          }

          to {

            opacity: 1;

          }

        }


        @keyframes cardAppear {

          from {

            opacity: 0;

            transform:
              translateY(25px);

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }

        }


        @keyframes iconPulse {

          0%,
          100% {

            box-shadow:
              0 0 20px rgba(
                0,
                125,
                255,
                0.35
              );

          }

          50% {

            box-shadow:
              0 0 35px rgba(
                0,
                125,
                255,
                0.65
              );

          }

        }


        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 992px) {

          .tech-header h1 {

            font-size: 40px;

          }

          .form-card {

            padding: 40px 35px;

          }

          .tech-header {

            padding: 35px;

          }

        }


        @media (max-width: 768px) {

          .tech-page {

            padding: 20px 0 60px;

          }


          .tech-header {

            padding: 28px 22px;

            border-radius: 18px;

          }


          .header-content {

            flex-direction: column;

            align-items: flex-start;

          }


          .tech-header h1 {

            font-size: 34px;

          }


          .tech-header p {

            font-size: 16px;

          }


          .total-card {

            width: 100%;

            min-width: 0;

          }


          .form-card {

            padding: 30px 20px;

            border-radius: 18px;

          }


          .form-heading h2 {

            font-size: 28px;

          }


          .form-heading p {

            font-size: 15px;

          }


          .list-header {

            flex-direction: column;

            align-items: stretch;

          }


          .refresh-button {

            width: 100%;

          }

        }

      `}</style>

    </div>
  );
};

export default Tech;