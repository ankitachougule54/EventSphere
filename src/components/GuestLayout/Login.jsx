import React, { useState } from "react";
import axios from "axios";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // ============================
    // HANDLE INPUT CHANGE
    // ============================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ============================
    // HANDLE FORM SUBMIT
    // ============================

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
            const res = await axios.post(
                "http://localhost:9000/users/login",
                formData
            );

            setMessage({
                text: res.data.message,
                type: "success",
            });

            // Save user details
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            // ============================
            // TEMPORARY PASSWORD
            // ============================

            if (res.data.user.isTemporaryPassword === true) {

            navigate("/changePassword");
            }

            // ============================
            // ROLE BASED REDIRECT
            // ============================

            else if (res.data.user.role === "admin") {

            navigate("/admin/Dashboard");

            }

            else {

            navigate("/user/home");

            }

            setFormData({
                email: "",
                password: "",
            });

            setValidated(false);

        } catch (err) {
            setMessage({
                text:
                    err.response?.data?.message ||
                    "Something went wrong ❌",
                type: "danger",
            });

        } finally {
            setIsLoading(false);
        }
    };

    // ============================
    // FORGOT PASSWORD
    // ============================

    const handleForgotPassword = () => {
        navigate("/forgotPassword");
    };

    // ============================
    // REGISTER
    // ============================

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <>
            {/* =====================================
                LOGIN PAGE STYLE
            ===================================== */}

            <style>
                {`

                /* ================================
                   MAIN LOGIN PAGE
                ================================= */

                .login-page {
                    min-height: 100vh;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    padding: 30px;

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
                }


                /* ================================
                   LOGIN CARD
                ================================= */

                .login-card {
                    width: 430px;
                    max-width: 100%;

                    padding: 45px 35px;

                    background: #0b1f36;

                    border: 1px solid
                        rgba(50, 150, 255, 0.45);

                    border-radius: 25px;

                    box-shadow:
                        0 0 20px
                        rgba(0, 110, 255, 0.25),

                        0 20px 50px
                        rgba(0, 0, 0, 0.4);

                    animation:
                        loginCardAnimation
                        0.6s ease;
                }


                /* ================================
                   CARD ANIMATION
                ================================= */

                @keyframes loginCardAnimation {

                    from {
                        opacity: 0;

                        transform:
                            translateY(30px)
                            scale(0.95);
                    }

                    to {
                        opacity: 1;

                        transform:
                            translateY(0)
                            scale(1);
                    }

                }


                /* ================================
                   LOGIN ICON
                ================================= */

                .login-icon {
                    width: 90px;
                    height: 90px;

                    margin: 0 auto 25px;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    border-radius: 50%;

                    background:
                        linear-gradient(
                            135deg,
                            #0878e8,
                            #1251c7
                        );

                    color: white;

                    font-size: 42px;

                    box-shadow:
                        0 0 20px
                        rgba(0, 130, 255, 0.55);

                    animation:
                        iconPulse
                        2s infinite;
                }


                @keyframes iconPulse {

                    0% {
                        box-shadow:
                            0 0 10px
                            rgba(0, 130, 255, 0.4);
                    }

                    50% {
                        box-shadow:
                            0 0 25px
                            rgba(0, 130, 255, 0.8);
                    }

                    100% {
                        box-shadow:
                            0 0 10px
                            rgba(0, 130, 255, 0.4);
                    }

                }


                /* ================================
                   TITLE
                ================================= */

                .login-title {
                    text-align: center;

                    color: #ffffff;

                    font-size: 30px;

                    font-weight: 700;

                    margin-bottom: 8px;
                }


                .login-subtitle {
                    text-align: center;

                    color: #a9bfd5;

                    font-size: 15px;

                    margin-bottom: 30px;
                }


                /* ================================
                   LABEL
                ================================= */

                .login-label {
                    display: block;

                    color: #d7e5f5;

                    font-size: 15px;

                    font-weight: 600;

                    margin-bottom: 8px;
                }


                /* ================================
                   INPUT
                ================================= */

                .login-input {
                    width: 100%;

                    padding: 13px 15px;

                    color: #ffffff;

                    background: #132b45;

                    border: 1px solid
                        rgba(70, 150, 220, 0.4);

                    border-radius: 12px;

                    outline: none;

                    font-size: 15px;

                    transition: all 0.3s ease;

                    box-sizing: border-box;

                    margin-bottom: 20px;
                }


                .login-input::placeholder {
                    color: #7f9bb5;
                }


                .login-input:focus {
                    background: #102b47;

                    border-color: #168cff;

                    box-shadow:
                        0 0 10px
                        rgba(0, 140, 255, 0.4);
                }


                /* ================================
                   FORGOT PASSWORD
                ================================= */

                .forgot-password {
                    display: block;

                    text-align: right;

                    color: #4daaff;

                    font-size: 14px;

                    cursor: pointer;

                    margin-top: -8px;

                    margin-bottom: 25px;

                    transition: all 0.3s ease;
                }


                .forgot-password:hover {
                    color: #ffffff;

                    text-decoration: underline;
                }


                /* ================================
                   LOGIN BUTTON
                ================================= */

                .login-btn {
                    width: 100%;

                    border: none;

                    padding: 13px;

                    border-radius: 12px;

                    font-size: 16px;

                    font-weight: 600;

                    color: white;

                    background:
                        linear-gradient(
                            135deg,
                            #0878e8,
                            #1251c7
                        );

                    cursor: pointer;

                    transition: all 0.3s ease;

                    box-shadow:
                        0 5px 15px
                        rgba(0, 110, 255, 0.3);
                }


                .login-btn:hover {
                    transform: translateY(-3px);

                    background:
                        linear-gradient(
                            135deg,
                            #1592ff,
                            #1761df
                        );

                    box-shadow:
                        0 8px 22px
                        rgba(0, 130, 255, 0.55);
                }


                .login-btn:disabled {
                    opacity: 0.7;

                    cursor: not-allowed;

                    transform: none;
                }


                /* ================================
                   REGISTER SECTION
                ================================= */

                .register-section {
                    text-align: center;

                    margin-top: 25px;

                    padding-top: 20px;

                    border-top: 1px solid
                        rgba(120, 160, 200, 0.15);

                    color: #a9bfd5;

                    font-size: 14px;
                }


                .register-link {
                    color: #4daaff;

                    font-weight: 600;

                    cursor: pointer;

                    margin-left: 5px;

                    transition: all 0.3s ease;
                }


                .register-link:hover {
                    color: #ffffff;

                    text-decoration: underline;
                }


                /* ================================
                   ALERT
                ================================= */

                .login-alert {
                    border-radius: 10px;

                    margin-bottom: 20px;

                    text-align: center;
                }


                /* ================================
                   MOBILE
                ================================= */

                @media (max-width: 576px) {

                    .login-page {
                        padding: 20px;
                    }

                    .login-card {
                        padding: 35px 22px;
                    }

                    .login-title {
                        font-size: 25px;
                    }

                }

                `}
            </style>


            {/* =====================================
                LOGIN PAGE
            ===================================== */}

            <div className="login-page">

                <div className="login-card">

                    {/* LOGIN ICON */}

                    <div className="login-icon">
                        ⇥
                    </div>


                    {/* TITLE */}

                    <h1 className="login-title">
                        Welcome Back
                    </h1>

                    <p className="login-subtitle">
                        Please sign in to your account
                    </p>


                    {/* MESSAGE */}

                    {message && (
                        <Alert
                            variant={message.type}
                            className="login-alert"
                        >
                            {message.text}
                        </Alert>
                    )}


                    {/* LOGIN FORM */}

                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >

                        {/* EMAIL */}

                        <label className="login-label">
                            Email Address
                        </label>

                        <Form.Control
                            className="login-input"
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


                        {/* PASSWORD */}

                        <label className="login-label">
                            Password
                        </label>

                        <Form.Control
                            className="login-input"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Form.Control.Feedback type="invalid">
                            Please provide your password.
                        </Form.Control.Feedback>


                        {/* FORGOT PASSWORD */}

                        <span
                            className="forgot-password"
                            onClick={handleForgotPassword}
                        >
                            Forgot password?
                        </span>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Signing In..."
                                : "Sign In"}
                        </button>

                    </Form>


                    {/* REGISTER */}

                    <div className="register-section">

                        Don't have an account?

                        <span
                            className="register-link"
                            onClick={handleRegister}
                        >
                            Sign up
                        </span>

                    </div>

                </div>

            </div>
        </>
    );
};

export default Login;

