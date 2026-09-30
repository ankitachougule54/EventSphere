import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);

  // Form states
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [galleryImage, setGalleryImage] = useState(null);

  // Edit states
  const [editingGallery, setEditingGallery] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // Image modal
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    fetchGalleries();
  }, []);

  // =====================================================
  // GET ALL GALLERY
  // =====================================================

  const fetchGalleries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/gallery"
      );

      setGalleries(response.data.galleries || []);
    } catch (error) {
      console.error("Error fetching galleries:", error);
    }
  };

  // =====================================================
  // SELECT IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    setGalleryImage(e.target.files[0]);
  };

  // =====================================================
  // ADD GALLERY
  // =====================================================

  const handleAddGallery = async (e) => {
    e.preventDefault();

    if (!galleryImage) {
      alert("Please select a gallery image");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("event", event);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("galleryImage", galleryImage);

    try {
      const response = await axios.post(
        "http://localhost:9000/gallery",
        formData
      );

      console.log(response.data);

      alert("Gallery image added successfully!");

      // Clear form
      setTitle("");
      setEvent("");
      setCategory("");
      setDescription("");
      setGalleryImage(null);

      document.getElementById("galleryImage").value = "";

      fetchGalleries();
    } catch (error) {
      console.error(
        "Error adding gallery:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Error uploading gallery image"
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:9000/gallery/${id}`
      );

      alert("Gallery image deleted successfully!");

      fetchGalleries();
    } catch (error) {
      console.error("Delete error:", error);

      alert("Error deleting gallery image");
    }
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEdit = (gallery) => {
    setEditingGallery({
      ...gallery,
    });

    setEditImage(null);
  };

  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingGallery) return;

    const formData = new FormData();

    formData.append(
      "title",
      editingGallery.title
    );

    formData.append(
      "event",
      editingGallery.event
    );

    formData.append(
      "category",
      editingGallery.category || ""
    );

    formData.append(
      "description",
      editingGallery.description || ""
    );

    if (editImage) {
      formData.append(
        "galleryImage",
        editImage
      );
    }

    try {
      await axios.put(
        `http://localhost:9000/gallery/${editingGallery._id}`,
        formData
      );

      alert("Gallery updated successfully!");

      setEditingGallery(null);
      setEditImage(null);

      fetchGalleries();
    } catch (error) {
      console.error(
        "Update error:",
        error.response?.data || error.message
      );

      alert("Error updating gallery");
    }
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    return `http://localhost:9000/uploads/${image}`;
  };

  return (
    <div className="gallery-page">

      <Container>

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="page-header"
          data-aos="fade-down"
        >

          <div className="header-content">

            <div>
              <div className="small-heading">
                GALLERY MANAGEMENT
              </div>

              <h1>
                Manage Your Gallery
              </h1>

              <p>
                Add, update and manage all event
                photos in one place.
              </p>
            </div>

            <div className="total-card">

              <div className="total-icon">
                ▣
              </div>

              <div>
                <span>
                  Total Images
                </span>

                <strong>
                  {galleries.length}
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            ADD GALLERY FORM
        ================================================= */}

        <div
          className="form-card"
          data-aos="fade-up"
        >

          <div className="form-heading">

            <div className="plus-icon">
              +
            </div>

            <div>
              <h2>
                Add New Gallery Image
              </h2>

              <p>
                Enter details to add a new
                gallery image.
              </p>
            </div>

          </div>

          <form onSubmit={handleAddGallery}>

            <Row>

              {/* TITLE */}

              <Col md={6}>

                <div className="input-group-custom">

                  <label>
                    Image Title
                  </label>

                  <input
                    type="text"
                    placeholder="Enter image title"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    required
                  />

                </div>

              </Col>

              {/* EVENT */}

              <Col md={6}>

                <div className="input-group-custom">

                  <label>
                    Event Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter event name"
                    value={event}
                    onChange={(e) =>
                      setEvent(e.target.value)
                    }
                    required
                  />

                </div>

              </Col>

              {/* CATEGORY */}

              <Col md={6}>

                <div className="input-group-custom">

                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  />

                </div>

              </Col>

              {/* IMAGE */}

              <Col md={6}>

                <div className="input-group-custom">

                  <label>
                    Gallery Image
                  </label>

                  <input
                    id="galleryImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />

                </div>

              </Col>

              {/* DESCRIPTION */}

              <Col md={12}>

                <div className="input-group-custom">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Write image description..."
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                  />

                </div>

              </Col>

            </Row>

            {/* BUTTON */}

            <div className="form-button-container">

              <button
                type="submit"
                className="add-button"
              >
                + Add Gallery Image
              </button>

            </div>

          </form>

        </div>

        {/* =================================================
            GALLERY LIST
        ================================================= */}

        <div
          className="gallery-section"
          data-aos="fade-up"
        >

          <div className="section-header">

            <div>
              <div className="small-heading">
                YOUR COLLECTION
              </div>

              <h2>
                Gallery Images
              </h2>
            </div>

            <span className="image-count">
              {galleries.length} Images
            </span>

          </div>

          <Row>

            {galleries.length === 0 ? (

              <Col md={12}>

                <div className="empty-gallery">

                  <div>
                    🖼️
                  </div>

                  <h3>
                    No Gallery Images
                  </h3>

                  <p>
                    Add your first event image
                    using the form above.
                  </p>

                </div>

              </Col>

            ) : (

              galleries.map((gallery, index) => (

                <Col
                  md={6}
                  lg={4}
                  key={gallery._id}
                  className="mb-4"
                >

                  <motion.div
                    className="gallery-card"
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >

                    {/* IMAGE */}

                    <div
                      className="card-image"
                      onClick={() =>
                        setSelectedImage(
                          getImageUrl(
                            gallery.galleryImage
                          )
                        )
                      }
                    >

                      <img
                        src={getImageUrl(
                          gallery.galleryImage
                        )}
                        alt={gallery.title}
                      />

                      <div className="image-hover">
                        View Image
                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="card-content">

                      <h3>
                        {gallery.title}
                      </h3>

                      <p className="event-name">
                        {gallery.event}
                      </p>

                      <p className="description">
                        {gallery.description}
                      </p>

                      <div className="card-actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(gallery)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              gallery._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </motion.div>

                </Col>

              ))

            )}

          </Row>

        </div>

      </Container>

      {/* =================================================
          IMAGE MODAL
      ================================================= */}

      <Modal
        show={selectedImage !== null}
        onHide={() =>
          setSelectedImage(null)
        }
        centered
        size="lg"
      >

        <Modal.Header closeButton>
          <Modal.Title>
            Gallery Image
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">

          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery"
              className="large-image"
            />
          )}

        </Modal.Body>

      </Modal>

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      <Modal
        show={editingGallery !== null}
        onHide={() =>
          setEditingGallery(null)
        }
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Edit Gallery Image
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          {editingGallery && (

            <form onSubmit={handleUpdate}>

              <div className="edit-field">

                <label>
                  Image Title
                </label>

                <input
                  type="text"
                  value={
                    editingGallery.title
                  }
                  onChange={(e) =>
                    setEditingGallery({
                      ...editingGallery,
                      title:
                        e.target.value,
                    })
                  }
                  required
                />

              </div>

              <div className="edit-field">

                <label>
                  Event Name
                </label>

                <input
                  type="text"
                  value={
                    editingGallery.event ||
                    ""
                  }
                  onChange={(e) =>
                    setEditingGallery({
                      ...editingGallery,
                      event:
                        e.target.value,
                    })
                  }
                  required
                />

              </div>

              <div className="edit-field">

                <label>
                  Category
                </label>

                <input
                  type="text"
                  value={
                    editingGallery.category ||
                    ""
                  }
                  onChange={(e) =>
                    setEditingGallery({
                      ...editingGallery,
                      category:
                        e.target.value,
                    })
                  }
                />

              </div>

              <div className="edit-field">

                <label>
                  Description
                </label>

                <textarea
                  rows="4"
                  value={
                    editingGallery.description ||
                    ""
                  }
                  onChange={(e) =>
                    setEditingGallery({
                      ...editingGallery,
                      description:
                        e.target.value,
                    })
                  }
                />

              </div>

              <div className="edit-field">

                <label>
                  Change Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditImage(
                      e.target.files[0]
                    )
                  }
                />

              </div>

              <button
                type="submit"
                className="update-button"
              >
                Update Gallery
              </button>

            </form>

          )}

        </Modal.Body>

      </Modal>

      {/* =================================================
          CSS
      ================================================= */}

      <style>{`

/* ================================
   GALLERY PAGE - LOGIN STYLE
================================ */

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #061525 !important;
  color: #ffffff;
}

/* ================================
   MAIN PAGE
================================ */

.gallery-page {
  min-height: 100vh;
  width: 100%;
  background: #061525;
  padding: 40px 0 80px;
  color: #ffffff;
}

/* ================================
   HEADER
================================ */

.page-header {
  background: #0b2038;
  border: 1px solid #1768ad;
  border-radius: 20px;
  padding: 35px 40px;
  margin-bottom: 40px;

  box-shadow:
    0 0 25px rgba(0, 123, 255, 0.12);

  transition: 0.3s ease;
}

.page-header:hover {
  box-shadow:
    0 0 35px rgba(0, 123, 255, 0.22);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.small-heading {
  font-size: 13px;
  letter-spacing: 3px;
  font-weight: 700;
  color: #299cff;
  margin-bottom: 12px;
}

.page-header h1 {
  font-size: 42px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 10px;
}

.page-header p {
  font-size: 17px;
  color: #91afd0;
  margin: 0;
}

/* ================================
   TOTAL CARD
================================ */

.total-card {
  background: #102d4a;
  border: 1px solid #246da9;
  border-radius: 15px;
  padding: 20px 28px;

  display: flex;
  align-items: center;
  gap: 15px;

  min-width: 210px;

  box-shadow:
    0 0 18px rgba(0, 123, 255, 0.10);

  transition: 0.3s ease;
}

.total-card:hover {
  transform: translateY(-3px);

  box-shadow:
    0 0 25px rgba(0, 123, 255, 0.25);
}

.total-icon {
  width: 50px;
  height: 50px;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #087df0,
    #1856c8
  );

  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 23px;

  box-shadow:
    0 0 20px rgba(0, 123, 255, 0.45);
}

.total-card span {
  display: block;
  color: #91afd0;
  font-size: 14px;
  margin-bottom: 3px;
}

.total-card strong {
  display: block;
  color: #ffffff;
  font-size: 28px;
}

/* ================================
   ADD FORM
================================ */

.form-card {
  background: #0b2038;

  border: 1px solid #1768ad;
  border-radius: 20px;

  padding: 45px 50px;
  margin-bottom: 55px;

  box-shadow:
    0 0 25px rgba(0, 123, 255, 0.10);

  transition: 0.3s ease;
}

.form-card:hover {
  box-shadow:
    0 0 35px rgba(0, 123, 255, 0.18);
}

.form-heading {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 35px;
}

.plus-icon {
  width: 58px;
  height: 58px;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #087df0,
    #1856c8
  );

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;

  box-shadow:
    0 0 20px rgba(0, 123, 255, 0.40);
}

.form-heading h2 {
  margin: 0 0 5px;

  font-size: 28px;
  font-weight: 700;

  color: #ffffff;
}

.form-heading p {
  margin: 0;

  font-size: 15px;
  color: #91afd0;
}

/* ================================
   FORM INPUTS
================================ */

.input-group-custom {
  margin-bottom: 22px;
}

.input-group-custom label {
  display: block;

  font-size: 15px;
  font-weight: 600;

  color: #ffffff;

  margin-bottom: 9px;
}

.input-group-custom input,
.input-group-custom textarea {
  width: 100%;

  background: #132f4c;
  color: #ffffff;

  border: 1px solid #286795;
  border-radius: 12px;

  padding: 14px 16px;

  font-size: 15px;

  outline: none;

  transition: 0.3s ease;
}

.input-group-custom input::placeholder,
.input-group-custom textarea::placeholder {
  color: #7191b5;
}

.input-group-custom input:focus,
.input-group-custom textarea:focus {
  border-color: #1688ff;

  box-shadow:
    0 0 0 3px rgba(0, 123, 255, 0.12),
    0 0 15px rgba(0, 123, 255, 0.12);

  background: #153652;
}

.input-group-custom input[type="file"] {
  padding: 11px;
  color: #91afd0;
}

/* ================================
   ADD BUTTON
================================ */

.form-button-container {
  display: flex;
  justify-content: flex-end;

  margin-top: 15px;
}

.add-button {
  border: none;

  background: linear-gradient(
    90deg,
    #087df0,
    #1856c8
  );

  color: #ffffff;

  padding: 14px 28px;

  border-radius: 10px;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.3s ease;

  box-shadow:
    0 5px 18px rgba(0, 123, 255, 0.25);
}

.add-button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 25px rgba(0, 123, 255, 0.40);
}

/* ================================
   GALLERY SECTION
================================ */

.gallery-section {
  margin-top: 20px;
}

.section-header {
  display: flex;

  justify-content: space-between;
  align-items: flex-end;

  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 32px;
  font-weight: 700;

  color: #ffffff;

  margin: 0;
}

.image-count {
  background: #102d4a;

  border: 1px solid #246da9;

  padding: 9px 18px;

  border-radius: 20px;

  color: #5eb5ff;

  font-weight: 600;
}

/* ================================
   GALLERY CARD
================================ */

.gallery-card {
  background: #0b2038;

  border: 1px solid #1b5d91;

  border-radius: 18px;

  overflow: hidden;

  height: 100%;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.30);

  transition: 0.35s ease;
}

.gallery-card:hover {
  transform: translateY(-6px);

  border-color: #1688ff;

  box-shadow:
    0 10px 30px rgba(0, 123, 255, 0.20);
}

/* ================================
   IMAGE
================================ */

.card-image {
  height: 250px;

  position: relative;

  overflow: hidden;

  cursor: pointer;

  background: #102d4a;
}

.card-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: 0.5s ease;
}

.card-image:hover img {
  transform: scale(1.07);
}

/* ================================
   IMAGE HOVER
================================ */

.image-hover {
  position: absolute;

  inset: 0;

  background: rgba(4, 19, 35, 0.65);

  color: #ffffff;

  display: flex;

  align-items: center;
  justify-content: center;

  opacity: 0;

  transition: 0.3s ease;

  font-size: 18px;
  font-weight: 600;

  text-shadow:
    0 0 10px rgba(0, 123, 255, 0.8);
}

.card-image:hover .image-hover {
  opacity: 1;
}

/* ================================
   CARD CONTENT
================================ */

.card-content {
  padding: 22px;
}

.card-content h3 {
  color: #ffffff;

  font-size: 22px;
  font-weight: 700;

  margin-bottom: 8px;
}

.event-name {
  color: #299cff;

  font-size: 15px;
  font-weight: 600;

  margin-bottom: 10px;
}

.description {
  color: #91afd0;

  min-height: 45px;

  line-height: 1.5;
}

/* ================================
   ACTION BUTTONS
================================ */

.card-actions {
  display: flex;

  gap: 10px;

  margin-top: 20px;
}

.edit-btn,
.delete-btn {
  flex: 1;

  padding: 10px;

  border-radius: 8px;

  border: 1px solid transparent;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s ease;
}

.edit-btn {
  background: #123e62;
  color: #4eafff;

  border-color: #246da9;
}

.edit-btn:hover {
  background: #18527e;

  color: #ffffff;

  transform: translateY(-2px);
}

.delete-btn {
  background: #4a1f2a;
  color: #ff6b7c;

  border-color: #7d3040;
}

.delete-btn:hover {
  background: #642536;

  color: #ffffff;

  transform: translateY(-2px);
}

/* ================================
   EMPTY GALLERY
================================ */

.empty-gallery {
  text-align: center;

  padding: 70px 20px;

  background: #0b2038;

  border: 1px solid #1768ad;

  border-radius: 18px;
}

.empty-gallery div {
  font-size: 50px;
  margin-bottom: 15px;
}

.empty-gallery h3 {
  color: #ffffff;
}

.empty-gallery p {
  color: #91afd0;
}

/* ================================
   EDIT MODAL FORM
================================ */

.edit-field {
  margin-bottom: 20px;
}

.edit-field label {
  display: block;

  color: #ffffff;

  font-weight: 600;

  margin-bottom: 8px;
}

.edit-field input,
.edit-field textarea {
  width: 100%;

  padding: 12px 14px;

  background: #132f4c;

  color: #ffffff;

  border: 1px solid #286795;

  border-radius: 9px;

  outline: none;

  transition: 0.3s ease;
}

.edit-field input:focus,
.edit-field textarea:focus {
  border-color: #1688ff;

  box-shadow:
    0 0 0 3px rgba(0, 123, 255, 0.12);
}

/* ================================
   UPDATE BUTTON
================================ */

.update-button {
  width: 100%;

  border: none;

  padding: 13px;

  background: linear-gradient(
    90deg,
    #087df0,
    #1856c8
  );

  color: white;

  border-radius: 9px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s ease;

  box-shadow:
    0 5px 18px rgba(0, 123, 255, 0.25);
}

.update-button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 25px rgba(0, 123, 255, 0.40);
}

/* ================================
   BOOTSTRAP MODAL - DARK
================================ */

.modal-content {
  background: #0b2038 !important;

  border: 1px solid #1768ad !important;

  border-radius: 15px !important;

  color: #ffffff;

  box-shadow:
    0 0 35px rgba(0, 123, 255, 0.25);
}

.modal-header {
  background: #0b2038 !important;

  border-bottom: 1px solid #214968 !important;

  color: #ffffff;
}

.modal-title {
  color: #ffffff !important;

  font-weight: 600;
}

.modal-body {
  background: #0b2038 !important;

  color: #ffffff;
}

.modal-footer {
  background: #0b2038 !important;

  border-top: 1px solid #214968 !important;
}

.modal-header .btn-close {
  filter: invert(1);
}

.large-image {
  max-width: 100%;
  max-height: 70vh;

  object-fit: contain;

  border-radius: 10px;
}

/* ================================
   RESPONSIVE
================================ */

@media (max-width: 768px) {

  .gallery-page {
    padding: 25px 15px 60px;
  }

  .page-header {
    padding: 25px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-header h1 {
    font-size: 32px;
  }

  .page-header p {
    font-size: 15px;
  }

  .total-card {
    width: 100%;
  }

  .form-card {
    padding: 30px 20px;
  }

  .form-heading h2 {
    font-size: 23px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;

    gap: 15px;
  }

  .section-header h2 {
    font-size: 28px;
  }

  .card-image {
    height: 220px;
  }

}

`}</style>

    </div>
  );
};

export default Gallery;