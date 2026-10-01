import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Item = () => {
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("https://eventsphere-5fey.onrender.com/item");
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Container className="view-item-container">
      <h2 className="text-center mb-5 section-title" data-aos="fade-down">
        Our Inventory
      </h2>

      <Row>
        {items.map((item, index) => (
          <Col key={item._id} md={6} lg={4} className="mb-4">
            <motion.div
              className="item-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className="item-image-container"
                onClick={() =>
                  handleImageClick(
                    `https://eventsphere-5fey.onrender.com/uploads/${item.itemImage}`
                  )
                }
              >
                <img
                  src={`https://eventsphere-5fey.onrender.com/uploads/${item.itemImage}`}
                  alt={item.itemName}
                  className="item-image"
                />
                <div className="image-overlay">
                  <span className="view-text">Click to View</span>
                </div>
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.itemName}</h3>
                <p className="item-description">{item.description}</p>

                <div className="item-meta">
                  <div className="meta-item">
                    <span className="meta-label">Quantity:</span>
                    <span className="meta-value">{item.quantity}</span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">
                      {item.category?.name || item.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Image Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        className="image-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Item Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size"
              className="img-fluid modal-image"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
     <style>
{`

/* =====================================
   WHOLE PAGE BACKGROUND
===================================== */

html,
body,
#root {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background: #071525 !important;
}

body {
    min-height: 100vh;
}


/* =====================================
   FULL VIEW ITEM PAGE
===================================== */

.view-item-page {
    min-height: 100vh;

    background:
        radial-gradient(
            circle at top right,
            rgba(0, 110, 255, 0.18),
            transparent 35%
        ),
        radial-gradient(
            circle at bottom left,
            rgba(0, 70, 160, 0.18),
            transparent 35%
        ),
        #071525;

    color: white;
}


/* =====================================
   CONTAINER
===================================== */

.view-item-container {
    padding: 2rem 0;
    min-height: 100vh;

    background: transparent !important;
}


/* =====================================
   TITLE
===================================== */

.section-title {
    font-size: 2.5rem;
    font-weight: 700;

    color: #ffffff;

    margin-bottom: 3rem;

    position: relative;
}

.section-title::after {
    content: "";

    position: absolute;

    bottom: -10px;
    left: 50%;

    transform: translateX(-50%);

    width: 90px;
    height: 4px;

    background: linear-gradient(
        90deg,
        #0878e8,
        #33c1ff
    );

    border-radius: 10px;

    box-shadow:
        0 0 12px
        rgba(0, 140, 255, 0.7);
}


/* =====================================
   ITEM CARD
===================================== */

.item-card {
    background: #0b1f36;

    border-radius: 20px;

    overflow: hidden;

    border: 1px solid
        rgba(50, 150, 255, 0.35);

    box-shadow:
        0 8px 25px
        rgba(0, 0, 0, 0.35);

    transition: all 0.3s ease;

    height: 100%;
}


/* =====================================
   CARD HOVER
===================================== */

.item-card:hover {
    transform: translateY(-8px);

    border-color: #168cff;

    box-shadow:
        0 12px 30px
        rgba(0, 0, 0, 0.45),

        0 0 20px
        rgba(0, 120, 255, 0.3);
}


/* =====================================
   IMAGE CONTAINER
===================================== */

.item-image-container {
    position: relative;

    height: 250px;

    overflow: hidden;

    cursor: pointer;

    background: #071525;
}


/* =====================================
   ITEM IMAGE
===================================== */

.item-image {
    width: 100%;

    height: 100%;

    object-fit: cover;

    transition:
        transform 0.5s ease;
}

.item-image-container:hover
.item-image {
    transform: scale(1.08);
}


/* =====================================
   IMAGE OVERLAY
===================================== */

.image-overlay {
    position: absolute;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    background:
        rgba(0, 40, 80, 0.65);

    opacity: 0;

    transition:
        opacity 0.3s ease;
}

.item-image-container:hover
.image-overlay {
    opacity: 1;
}


/* =====================================
   VIEW BUTTON
===================================== */

.view-text {
    color: white;

    font-weight: 600;

    font-size: 1.2rem;

    padding: 12px 22px;

    border-radius: 12px;

    background:
        linear-gradient(
            135deg,
            #0878e8,
            #1251c7
        );

    border: 1px solid
        rgba(255, 255, 255, 0.3);

    box-shadow:
        0 0 18px
        rgba(0, 140, 255, 0.5);
}


/* =====================================
   ITEM DETAILS
===================================== */

.item-details {
    padding: 1.5rem;
}


/* =====================================
   ITEM NAME
===================================== */

.item-name {
    font-size: 1.4rem;

    font-weight: 700;

    color: #ffffff;

    margin-bottom: 0.8rem;
}


/* =====================================
   DESCRIPTION
===================================== */

.item-description {
    color: #a9bfd5;

    margin-bottom: 1.2rem;

    line-height: 1.5;
}


/* =====================================
   META
===================================== */

.item-meta {
    display: flex;

    justify-content: space-between;

    border-top: 1px solid
        rgba(120, 160, 200, 0.15);

    padding-top: 1rem;
}


.meta-item {
    display: flex;

    flex-direction: column;
}


.meta-label {
    font-size: 0.8rem;

    color: #7f9bb5;

    font-weight: 600;

    text-transform: uppercase;

    margin-bottom: 0.2rem;
}


.meta-value {
    font-size: 1rem;

    color: #4daaff;

    font-weight: 600;
}


/* =====================================
   MODAL
===================================== */

.image-modal .modal-content {
    border-radius: 18px;

    overflow: hidden;

    background: #0b1f36;

    border: 1px solid
        rgba(50, 150, 255, 0.45);

    box-shadow:
        0 0 30px
        rgba(0, 120, 255, 0.35);
}


/* =====================================
   MODAL HEADER
===================================== */

.image-modal .modal-header {
    background: #0b1f36;

    border-bottom: 1px solid
        rgba(120, 160, 200, 0.15);
}


.image-modal .modal-title {
    color: #ffffff;

    font-weight: 600;
}


.image-modal .btn-close {
    filter: invert(1);

    opacity: 0.8;
}


/* =====================================
   MODAL BODY
===================================== */

.image-modal .modal-body {
    background: #071525;
}


.modal-image {
    border-radius: 10px;

    max-height: 70vh;

    object-fit: contain;
}


/* =====================================
   MODAL FOOTER
===================================== */

.image-modal .modal-footer {
    background: #0b1f36;

    border-top: 1px solid
        rgba(120, 160, 200, 0.15);
}


/* =====================================
   CLOSE BUTTON
===================================== */

.image-modal .btn-secondary {
    background:
        linear-gradient(
            135deg,
            #0878e8,
            #1251c7
        );

    border: none;

    border-radius: 12px;

    padding: 0.6rem 1.5rem;

    font-weight: 600;

    transition: all 0.3s ease;
}


.image-modal .btn-secondary:hover {
    transform: translateY(-2px);

    background:
        linear-gradient(
            135deg,
            #1592ff,
            #1761df
        );

    box-shadow:
        0 0 15px
        rgba(0, 130, 255, 0.5);
}


/* =====================================
   RESPONSIVE
===================================== */

@media (max-width: 768px) {

    .view-item-container {
        padding: 1rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .item-meta {
        flex-direction: column;

        gap: 0.8rem;
    }

}

`}
</style>
    </Container>
  );
};

export default Item;