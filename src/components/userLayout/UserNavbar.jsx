import React from "react";
import { NavLink } from "react-router-dom";

export const UserNavbar = () => {
  return (
    <aside className="user-sidebar">

      {/* =========================
          SIDEBAR TITLE
      ========================= */}

      <div className="sidebar-heading">
        USER PANEL
      </div>

      <div className="sidebar-line"></div>


      {/* =========================
          SIDEBAR MENU
      ========================= */}

      <nav className="sidebar-menu">


        {/* HOME */}

        <NavLink
          to="/user/home"
          className="sidebar-link"
        >
          <span className="sidebar-icon">🏠</span>

          <span>Home</span>
        </NavLink>


        {/* EVENTS */}

        <NavLink
          to="/user/events"
          className="sidebar-link"
        >
          <span className="sidebar-icon">📅</span>

          <span>Events</span>
        </NavLink>


        {/* MY REGISTERED EVENTS */}

        <NavLink
          to="/user/my-events"
          className="sidebar-link"
        >
          <span className="sidebar-icon">🎟️</span>

          <span>My Events</span>
        </NavLink>


        {/* PROFILE */}

        <NavLink
          to="/user/profile"
          className="sidebar-link"
        >
          <span className="sidebar-icon">👤</span>

          <span>Profile</span>
        </NavLink>

      </nav>


      {/* =========================
          LOGOUT
      ========================= */}

      <div className="sidebar-bottom">

        <NavLink
          to="/user/logout"
          className="sidebar-link logout-link"
        >
          <span className="sidebar-icon">🚪</span>

          <span>Logout</span>
        </NavLink>

      </div>

    </aside>
  );
};

export default UserNavbar;