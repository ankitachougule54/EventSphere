import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
} from "react-bootstrap";


const API_BASE = "http://localhost:9000/admin";
const SERVER_URL = "http://localhost:9000";


export default function AdminProfile() {


  // ==========================================
  // ADMIN DATA
  // ==========================================

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    profileImage: "",
    role: "",
  });


  // ==========================================
  // STATES
  // ==========================================

  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");


  // ==========================================
  // GET ADMIN PROFILE
  // ==========================================

  const fetchAdminProfile = async () => {

  try {

    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Login token not found");
      return;
    }

    const response = await axios.get(
      API_BASE,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "Admin Profile:",
      response.data
    );

    const adminData =
      response.data.admin;

    setAdmin(adminData);

    if (adminData.profileImage) {

      setImagePreview(
        `${SERVER_URL}${adminData.profileImage}`
      );

    } else {

      setImagePreview("");

    }

  } catch (error) {

    console.error(
      "Get Admin Profile Error:",
      error
    );

    setError(
      error.response?.data?.message ||
      "Failed to load admin profile"
    );

  } finally {

    setLoading(false);

  }

};


  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {

    fetchAdminProfile();

  }, []);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } =
      e.target;


    setAdmin((prevAdmin) => ({

      ...prevAdmin,

      [name]: value,

    }));

  };


  // ==========================================
  // HANDLE IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];


    if (!file) return;


    // Check image type

    if (!file.type.startsWith("image/")) {

      setError(
        "Please select a valid image file."
      );

      return;

    }


    setError("");


    setSelectedImage(file);


    // Preview selected image

    const previewURL =
      URL.createObjectURL(file);


    setImagePreview(previewURL);

  };


  // ==========================================
  // UPDATE ADMIN PROFILE
  // ==========================================

  const handleUpdate = async (e) => {

    e.preventDefault();


    try {

      setUpdating(true);

      setError("");

      setSuccess("");


      // Create FormData

      const formData =
        new FormData();


      formData.append(
        "name",
        admin.name
      );


      formData.append(
        "contact",
        admin.contact
      );


      formData.append(
        "address",
        admin.address
      );


      // Add profile image only if selected

      if (selectedImage) {

        formData.append(

          "profileImage",

          selectedImage

        );

      }


      // ==========================================
// PUT REQUEST
// ==========================================

const token = localStorage.getItem("token");

if (!token) {
  setError("Login token not found");
  return;
}

const response = await axios.put(
  API_BASE,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      // Update admin state

      const updatedAdmin =
        response.data.admin;


      setAdmin(updatedAdmin);


      // Update image preview

      if (updatedAdmin.profileImage) {

        setImagePreview(

          `${SERVER_URL}${updatedAdmin.profileImage}`

        );

      }


      // Clear selected image

      setSelectedImage(null);


      // Success message

      setSuccess(

        "Admin profile updated successfully!"

      );


      // Close edit mode

      setEditing(false);


    } catch (error) {


      console.error(

        "Update Admin Profile Error:",

        error

      );


      setError(

        error.response?.data?.message ||

        "Failed to update admin profile"

      );


    } finally {

      setUpdating(false);

    }

  };


  // ==========================================
  // EDIT PROFILE
  // ==========================================

  const handleEdit = () => {

    setEditing(true);

    setError("");

    setSuccess("");

  };


  // ==========================================
  // CANCEL EDITING
  // ==========================================

  const handleCancel = () => {

    setEditing(false);

    setError("");

    setSuccess("");

    setSelectedImage(null);


    // Load original profile again

    fetchAdminProfile();

  };


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="admin-profile-page">

        <Container
          className="
            d-flex
            flex-column
            justify-content-center
            align-items-center
            admin-loading
          "
        >

          <Spinner
            animation="border"
            className="admin-spinner"
          />

          <p className="mt-3">

            Loading Admin Profile...

          </p>

        </Container>

      </div>

    );

  }


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="admin-profile-page">


      {/* =====================================
          ONLY UI / STYLE
      ===================================== */}

      <style>

        {`

        /* =====================================
           PAGE BACKGROUND
        ===================================== */

        .admin-profile-page {

          min-height: 100vh;

          background:

            linear-gradient(
              135deg,
              #071525,
              #0B1D31,
              #071525
            );

          padding: 40px 15px;

          color: #F1F5F9;

        }


        /* =====================================
           MAIN CONTAINER
        ===================================== */

        .admin-main-container {

          min-height: 85vh;

        }


        /* =====================================
           PROFILE CARD
        ===================================== */

        .admin-profile-card {

          background:

            linear-gradient(
              145deg,
              #102238,
              #0C1C2E
            ) !important;

          border:

            1px solid #1E4E78 !important;

          border-radius:

            25px !important;

          box-shadow:

            0 20px 50px
            rgba(0, 0, 0, 0.45),

            0 0 25px
            rgba(30, 78, 120, 0.12);

          overflow: hidden;

          color: #F1F5F9;

        }


        /* =====================================
           CARD BODY
        ===================================== */

        .admin-profile-card .card-body {

          background:

            transparent;

        }


        /* =====================================
           TITLE
        ===================================== */

        .admin-profile-title {

          font-weight: 700;

          color: #F1F5F9;

          letter-spacing: 0.5px;

          text-shadow:

            0 0 15px
            rgba(52, 120, 212, 0.2);

        }


        /* =====================================
           PROFILE IMAGE
        ===================================== */

        .admin-profile-image {

          width: 130px;

          height: 130px;

          border-radius: 50%;

          object-fit: cover;

          border:

            4px solid #3478D4;

          box-shadow:

            0 10px 30px
            rgba(0, 0, 0, 0.4),

            0 0 25px
            rgba(52, 120, 212, 0.25);

        }


        /* =====================================
           DEFAULT PROFILE ICON
        ===================================== */

        .admin-default-image {

          width: 130px;

          height: 130px;

          border-radius: 50%;

          margin: auto;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 52px;

          background:

            linear-gradient(
              135deg,
              #3478D4,
              #1D4F9E
            );

          border:

            4px solid #3E82D8;

          box-shadow:

            0 10px 30px
            rgba(0, 0, 0, 0.4),

            0 0 25px
            rgba(52, 120, 212, 0.25);

        }


        /* =====================================
           LABELS
        ===================================== */

        .admin-profile-card .form-label {

          color: #B7C9DB;

          font-weight: 500;

          margin-bottom: 7px;

        }


        /* =====================================
           INPUT FIELDS
        ===================================== */

        .admin-profile-card .form-control {

          background-color:

            #162C43;

          border:

            1px solid #294B69;

          color:

            #F1F5F9;

          border-radius:

            10px;

          padding:

            11px 14px;

          transition:

            all 0.3s ease;

          box-shadow:

            inset 0 1px 3px
            rgba(0, 0, 0, 0.2);

        }


        /* =====================================
           INPUT PLACEHOLDER
        ===================================== */

        .admin-profile-card
        .form-control::placeholder {

          color:

            #8094A8;

        }


        /* =====================================
           INPUT FOCUS
        ===================================== */

        .admin-profile-card
        .form-control:focus {

          background-color:

            #19334D;

          color:

            #FFFFFF;

          border-color:

            #3478D4;

          box-shadow:

            0 0 0 3px
            rgba(52, 120, 212, 0.18);

        }


        /* =====================================
           DISABLED INPUT
        ===================================== */

        .admin-profile-card
        .form-control:disabled {

          background-color:

            #12263A;

          color:

            #B7C9DB;

          opacity: 1;

          cursor: not-allowed;

          border-color:

            #223F5A;

        }


        /* =====================================
           FILE INPUT
        ===================================== */

        .admin-profile-card
        input[type="file"] {

          background-color:

            #162C43;

          color:

            #C9D8E7;

        }


        /* =====================================
           PRIMARY BUTTON
        ===================================== */

        .admin-profile-card
        .btn-primary {

          background:

            linear-gradient(
              135deg,
              #3478D4,
              #1D4F9E
            );

          border:

            1px solid #3D89E6;

          border-radius:

            10px;

          padding:

            11px 15px;

          font-weight:

            500;

          box-shadow:

            0 7px 18px
            rgba(0, 0, 0, 0.25);

          transition:

            all 0.3s ease;

        }


        .admin-profile-card
        .btn-primary:hover {

          background:

            linear-gradient(
              135deg,
              #4087E5,
              #245EB7
            );

          transform:

            translateY(-2px);

          box-shadow:

            0 10px 25px
            rgba(52, 120, 212, 0.25);

        }


        /* =====================================
           SECONDARY BUTTON
        ===================================== */

        .admin-profile-card
        .btn-secondary {

          background:

            #263B50;

          border:

            1px solid #40566B;

          border-radius:

            10px;

          padding:

            11px 15px;

          color:

            #E5EDF5;

          transition:

            all 0.3s ease;

        }


        .admin-profile-card
        .btn-secondary:hover {

          background:

            #324B63;

          border-color:

            #58738B;

          transform:

            translateY(-2px);

        }


        /* =====================================
           ALERT
        ===================================== */

        .admin-profile-card
        .alert {

          border-radius:

            10px;

        }


        /* =====================================
           LOADING
        ===================================== */

        .admin-loading {

          min-height: 80vh;

          color: #E5EDF5;

        }


        .admin-spinner {

          color: #3478D4;

          width: 45px;

          height: 45px;

        }


        /* =====================================
           RESPONSIVE
        ===================================== */

        @media (max-width: 576px) {

          .admin-profile-page {

            padding:

              20px 10px;

          }


          .admin-profile-card
          .card-body {

            padding:

              25px !important;

          }


          .admin-profile-title {

            font-size:

              25px;

          }

        }

        `}

      </style>


      <Container

        className="
          d-flex
          justify-content-center
          align-items-center
          admin-main-container
        "

      >


        <Row className="w-100 justify-content-center">


          <Col md={8} lg={6}>


            {/* PROFILE CARD */}

            <Card
              className="admin-profile-card"
            >


              <Card.Body className="p-5">


                {/* TITLE */}

                <h2
                  className="
                    text-center
                    mb-4
                    admin-profile-title
                  "
                >

                  👨‍💼 Admin Profile

                </h2>


                {/* ============================= */}
                {/* PROFILE IMAGE */}
                {/* ============================= */}

                <div
                  className="
                    text-center
                    mb-4
                  "
                >


                  {imagePreview ? (

                    <img

                      src={imagePreview}

                      alt="Admin Profile"

                      className="
                        admin-profile-image
                      "

                    />

                  ) : (

                    <div
                      className="
                        admin-default-image
                      "
                    >

                      👨‍💼

                    </div>

                  )}


                  {/* IMAGE INPUT */}

                  {editing && (

                    <div className="mt-3">

                      <Form.Control

                        type="file"

                        accept="image/*"

                        onChange={
                          handleImageChange
                        }

                      />

                    </div>

                  )}


                </div>


                {/* ============================= */}
                {/* ERROR MESSAGE */}
                {/* ============================= */}

                {error && (

                  <Alert
                    variant="danger"
                  >

                    {error}

                  </Alert>

                )}


                {/* ============================= */}
                {/* SUCCESS MESSAGE */}
                {/* ============================= */}

                {success && (

                  <Alert
                    variant="success"
                  >

                    {success}

                  </Alert>

                )}


                {/* ============================= */}
                {/* FORM */}
                {/* ============================= */}

                <Form
                  onSubmit={
                    handleUpdate
                  }
                >


                  {/* NAME */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>

                      Name

                    </Form.Label>


                    <Form.Control

                      type="text"

                      name="name"

                      value={
                        admin.name || ""
                      }

                      onChange={
                        handleChange
                      }

                      disabled={
                        !editing
                      }

                      required

                    />

                  </Form.Group>


                  {/* EMAIL */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>

                      Email

                    </Form.Label>


                    <Form.Control

                      type="email"

                      value={
                        admin.email || ""
                      }

                      disabled

                    />

                  </Form.Group>


                  {/* contact */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>

                      contact Number

                    </Form.Label>


                    <Form.Control

                      type="text"

                      name="contact"

                      value={
                        admin.contact || ""
                      }

                      onChange={
                        handleChange
                      }

                      disabled={
                        !editing
                      }

                      required

                    />

                  </Form.Group>


                  {/* ADDRESS */}

                  <Form.Group
                    className="mb-3"
                  >

                    <Form.Label>

                      Address

                    </Form.Label>


                    <Form.Control

                      as="textarea"

                      rows={3}

                      name="address"

                      value={
                        admin.address || ""
                      }

                      onChange={
                        handleChange
                      }

                      disabled={
                        !editing
                      }

                      required

                    />

                  </Form.Group>


                  {/* ROLE */}

                  <Form.Group
                    className="mb-4"
                  >

                    <Form.Label>

                      Role

                    </Form.Label>


                    <Form.Control

                      type="text"

                      value={

                        admin.role ||

                        "Administrator"

                      }

                      disabled

                    />

                  </Form.Group>


                  {/* ============================= */}
                  {/* BUTTONS */}
                  {/* ============================= */}

                  {!editing ? (

                    <Button

                      type="button"

                      className="w-100"

                      onClick={
                        handleEdit
                      }

                    >

                      ✏️ Edit Profile

                    </Button>

                  ) : (

                    <Row>


                      {/* SAVE BUTTON */}

                      <Col>

                        <Button

                          type="submit"

                          className="w-100"

                          disabled={
                            updating
                          }

                        >

                          {updating ? (

                            <>

                              <Spinner

                                animation="border"

                                size="sm"

                              />

                              {" "}

                              Saving...

                            </>

                          ) : (

                            "💾 Save Changes"

                          )}

                        </Button>

                      </Col>


                      {/* CANCEL BUTTON */}

                      <Col>

                        <Button

                          type="button"

                          variant="secondary"

                          className="w-100"

                          onClick={
                            handleCancel
                          }

                          disabled={
                            updating
                          }

                        >

                          Cancel

                        </Button>

                      </Col>


                    </Row>

                  )}


                </Form>


              </Card.Body>


            </Card>


          </Col>


        </Row>


      </Container>


    </div>

  );

}