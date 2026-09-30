import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    // ============================
    // LOGOUT FUNCTION
    // ============================
    const handleLogout = () => {
        // Remove login information
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("admin");

        // Redirect to login page
        navigate("/login");
    };

    // ============================
    // CANCEL FUNCTION
    // ============================
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <style>
                {`
                /* ================================
                   PAGE
                ================================= */

                .logout-page {
                    min-height: calc(100vh - 70px);

                    display: flex;
                    justify-content: center;
                    align-items: center;

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

                    padding: 30px;
                }


                /* ================================
                   LOGOUT CARD
                ================================= */

                .logout-card {
                    width: 430px;
                    max-width: 100%;

                    background: #0b1f36;

                    border: 1px solid rgba(50, 150, 255, 0.45);

                    border-radius: 25px;

                    padding: 45px 35px;

                    text-align: center;

                    box-shadow:
                        0 0 20px rgba(0, 110, 255, 0.25),
                        0 20px 50px rgba(0, 0, 0, 0.4);

                    animation: logoutCardAnimation 0.6s ease;
                }


                @keyframes logoutCardAnimation {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }


                /* ================================
                   LOGOUT ICON
                ================================= */

                .logout-icon {
                    width: 90px;
                    height: 90px;

                    margin: 0 auto 25px;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    border-radius: 50%;

                    background: linear-gradient(
                        135deg,
                        #0878e8,
                        #1251c7
                    );

                    color: white;

                    font-size: 42px;

                    box-shadow:
                        0 0 20px rgba(0, 130, 255, 0.55);

                    animation: iconPulse 2s infinite;
                }


                @keyframes iconPulse {
                    0% {
                        box-shadow:
                            0 0 10px rgba(0, 130, 255, 0.4);
                    }

                    50% {
                        box-shadow:
                            0 0 25px rgba(0, 130, 255, 0.8);
                    }

                    100% {
                        box-shadow:
                            0 0 10px rgba(0, 130, 255, 0.4);
                    }
                }


                /* ================================
                   TITLE
                ================================= */

                .logout-title {
                    color: #ffffff;

                    font-size: 30px;

                    font-weight: 700;

                    margin-bottom: 15px;
                }


                /* ================================
                   DESCRIPTION
                ================================= */

                .logout-description {
                    color: #a9bfd5;

                    font-size: 16px;

                    line-height: 1.6;

                    margin-bottom: 30px;
                }


                /* ================================
                   BUTTON CONTAINER
                ================================= */

                .logout-buttons {
                    display: flex;

                    justify-content: center;

                    gap: 12px;
                }


                /* ================================
                   LOGOUT BUTTON
                ================================= */

                .logout-btn {
                    border: none;

                    padding: 12px 25px;

                    border-radius: 12px;

                    font-size: 16px;

                    font-weight: 600;

                    color: white;

                    background: linear-gradient(
                        135deg,
                        #0878e8,
                        #1251c7
                    );

                    cursor: pointer;

                    transition: all 0.3s ease;

                    box-shadow:
                        0 5px 15px rgba(0, 110, 255, 0.3);
                }


                .logout-btn:hover {
                    transform: translateY(-3px);

                    box-shadow:
                        0 8px 22px rgba(0, 130, 255, 0.55);

                    background: linear-gradient(
                        135deg,
                        #1592ff,
                        #1761df
                    );
                }


                /* ================================
                   CANCEL BUTTON
                ================================= */

                .cancel-btn {
                    border: 1px solid rgba(150, 180, 210, 0.4);

                    padding: 12px 25px;

                    border-radius: 12px;

                    font-size: 16px;

                    font-weight: 600;

                    color: #d7e5f5;

                    background: #132b45;

                    cursor: pointer;

                    transition: all 0.3s ease;
                }


                .cancel-btn:hover {
                    background: #1c3b5c;

                    border-color: #4b8cc9;

                    color: white;

                    transform: translateY(-3px);
                }


                /* ================================
                   MOBILE
                ================================= */

                @media (max-width: 576px) {

                    .logout-page {
                        padding: 20px;
                    }

                    .logout-card {
                        padding: 35px 22px;
                    }

                    .logout-title {
                        font-size: 25px;
                    }

                    .logout-buttons {
                        flex-direction: column;
                    }

                    .logout-btn,
                    .cancel-btn {
                        width: 100%;
                    }
                }
                `}
            </style>


            {/* ================================
                LOGOUT PAGE
            ================================= */}

            <div className="logout-page">

                <div className="logout-card">

                    {/* ICON */}

                    <div className="logout-icon">
                        ⇥
                    </div>


                    {/* TITLE */}

                    <h1 className="logout-title">
                        Logout
                    </h1>


                    {/* DESCRIPTION */}

                    <p className="logout-description">
                        Are you sure you want to logout
                        from your Event Management account?
                    </p>


                    {/* BUTTONS */}

                    <div className="logout-buttons">

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Yes, Logout
                        </button>


                        <button
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
};

export default Logout;