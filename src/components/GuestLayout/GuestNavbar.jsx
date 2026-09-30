import React from "react";
import { NavLink } from "react-router-dom";

export const GuestNavbar = () => {
  return (
    <aside className="guest-sidebar">

      {/* SIDEBAR TITLE */}
      <div className="guest-sidebar-heading">
        EXPLORE
      </div>

      <div className="guest-sidebar-line"></div>


      {/* MAIN MENU */}

      <nav className="guest-sidebar-menu">

        <NavLink
          to="/home"
          className="guest-sidebar-link"
        >
          <span className="guest-sidebar-icon">
            🏠
          </span>

          Home
        </NavLink>


        <NavLink
          to="/about"
          className="guest-sidebar-link"
        >
          <span className="guest-sidebar-icon">
            ℹ️
          </span>

          About
        </NavLink>


        <NavLink
          to="/services"
          className="guest-sidebar-link"
        >
          <span className="guest-sidebar-icon">
            ⚙️
          </span>

          Services
        </NavLink>


        <NavLink
          to="/contact"
          className="guest-sidebar-link"
        >
          <span className="guest-sidebar-icon">
            📞
          </span>

          Contact
        </NavLink>

      </nav>


      {/* ACCOUNT SECTION */}

      <div className="guest-sidebar-account">

        <div className="guest-account-title">
          ACCOUNT
        </div>

        <NavLink
          to="/register"
          className="guest-sidebar-link"
        >
          <span className="guest-sidebar-icon">
            📝
          </span>

          Register
        </NavLink>


        <NavLink
          to="/login"
          className="guest-sidebar-link"
        >
          <span className="guest-sidebar-icon">
            🔐
          </span>

          Login
        </NavLink>

      </div>


      {/* USER & ADMIN */}

      <div className="guest-sidebar-bottom">

        <NavLink
          to="/user"
          className="guest-sidebar-link guest-user-link"
        >
          <span className="guest-sidebar-icon">
            👤
          </span>

          User
        </NavLink>


        <NavLink
          to="/admin"
          className="guest-sidebar-link guest-admin-link"
        >
          <span className="guest-sidebar-icon">
            🛡️
          </span>

          Admin
        </NavLink>

      </div>

    </aside>
  );
};

export default GuestNavbar;