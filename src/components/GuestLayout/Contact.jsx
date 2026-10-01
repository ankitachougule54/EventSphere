import React, { useState } from "react";
import axios from "axios";

const CONTACT_API = "https://eventsphere-5fey.onrender.com/contact";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear messages while typing
    setError("");
    setSuccess("");
  };

  // ==========================================
  // FORM SUBMIT + AXIOS
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      // ==========================================
      // AXIOS POST REQUEST
      // ==========================================

      const response = await axios.post(
        CONTACT_API,
        formData
      );

      console.log(
        "Contact Response:",
        response.data
      );

      // ==========================================
      // SUCCESS MESSAGE
      // ==========================================

      setSuccess(
        response.data.message ||
          "Your message has been sent successfully!"
      );

      // ==========================================
      // CLEAR FORM
      // ==========================================

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {

      console.error(
        "Contact Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={styles.container}>

      {/* PAGE HEADING */}

      <div style={styles.header}>

        <h1 style={styles.heading}>
          Contact Us
        </h1>

        <p style={styles.subtitle}>
          We are here to help you with your events
        </p>

      </div>


      {/* CONTACT CONTENT */}

      <div style={styles.contactWrapper}>


        {/* LEFT SIDE */}

        <div style={styles.contactInfo}>

          <h2>
            Get In Touch
          </h2>

          <p style={styles.infoText}>
            Have questions about an event?
            Need help with registration or
            event management? Contact us.
          </p>


          {/* EMAIL */}

          <div style={styles.infoItem}>

            <h3>📧 Email</h3>

            <p>
              ankitachougule999@gmail.com
            </p>

          </div>


          {/* PHONE */}

          <div style={styles.infoItem}>

            <h3>📞 Phone</h3>

            <p>
              +91 7483823161
            </p>

          </div>


          {/* LOCATION */}

          <div style={styles.infoItem}>

            <h3>📍 Location</h3>

            <p>
              Karnataka, India
            </p>

          </div>


          {/* WORKING HOURS */}

          <div style={styles.infoItem}>

            <h3>🕐 Working Hours</h3>

            <p>
              Monday - Friday
              <br />
              9:00 AM - 6:00 PM
            </p>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div style={styles.formBox}>

          <h2>
            Send Us a Message
          </h2>


          {/* SUCCESS MESSAGE */}

          {success && (

            <div style={styles.successMessage}>

              ✅ {success}

            </div>

          )}


          {/* ERROR MESSAGE */}

          {error && (

            <div style={styles.errorMessage}>

              ❌ {error}

            </div>

          )}


          <form onSubmit={handleSubmit}>


            {/* NAME */}

            <div style={styles.formGroup}>

              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                style={styles.input}
              />

            </div>


            {/* EMAIL */}

            <div style={styles.formGroup}>

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                style={styles.input}
              />

            </div>


            {/* SUBJECT */}

            <div style={styles.formGroup}>

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={loading}
                style={styles.input}
              />

            </div>


            {/* MESSAGE */}

            <div style={styles.formGroup}>

              <label>
                Message
              </label>

              <textarea
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
                disabled={loading}
                style={styles.textarea}
              />

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              style={{
                ...styles.button,

                opacity: loading ? 0.7 : 1,

                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
              disabled={loading}
            >

              {loading
                ? "Sending..."
                : "Send Message"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}


/* =========================
   CSS / STYLES
========================= */

const styles = {

  container: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #061525, #081d33, #06254a)",
    padding: "50px 30px",
    boxSizing: "border-box",
    color: "#ffffff",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "38px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#ffffff",
  },

  subtitle: {
    fontSize: "17px",
    color: "#9bb9d8",
  },

  contactWrapper: {
    maxWidth: "1050px",
    margin: "0 auto",
    display: "flex",
    gap: "30px",
    alignItems: "stretch",
  },


  /* LEFT CONTACT INFORMATION */

  contactInfo: {
    flex: 1,
    background:
      "linear-gradient(145deg, #0b2541, #09203a)",
    color: "#ffffff",
    padding: "35px",
    borderRadius: "18px",
    border: "1px solid #155c98",
    boxShadow:
      "0 0 25px rgba(0, 123, 255, 0.15)",
    boxSizing: "border-box",
  },

  infoText: {
    lineHeight: "1.7",
    marginBottom: "30px",
    color: "#a9c4df",
  },

  infoItem: {
    marginBottom: "25px",
    paddingBottom: "15px",
    borderBottom:
      "1px solid rgba(80, 160, 220, 0.2)",
  },


  /* RIGHT FORM */

  formBox: {
    flex: 1,
    background: "#0b223b",
    padding: "35px",
    borderRadius: "18px",
    border: "1px solid #1b659f",
    boxShadow:
      "0 0 30px rgba(0, 123, 255, 0.12)",
    boxSizing: "border-box",
  },

  formGroup: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    marginTop: "8px",
    border: "1px solid #28699d",
    borderRadius: "12px",
    fontSize: "15px",
    backgroundColor: "#142f4a",
    color: "#ffffff",
    boxSizing: "border-box",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "14px 16px",
    marginTop: "8px",
    border: "1px solid #28699d",
    borderRadius: "12px",
    fontSize: "15px",
    backgroundColor: "#142f4a",
    color: "#ffffff",
    boxSizing: "border-box",
    resize: "vertical",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(90deg, #087bea, #1856cf)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow:
      "0 8px 20px rgba(0, 123, 255, 0.3)",
    transition: "all 0.3s ease",
  },


  /* SUCCESS */

  successMessage: {
    background: "#164b35",
    color: "#8ff0b3",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
  },


  /* ERROR */

  errorMessage: {
    background: "#4a1c24",
    color: "#ff9ca8",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

};


export default Contact;