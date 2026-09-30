import React from "react";
import { NavLink } from "react-router-dom";

export const AdminNavbar = () => {
  return (
    <aside className="admin-sidebar">

      {/* =========================
          SIDEBAR HEADING
      ========================= */}

      <div className="sidebar-heading">
        ADMIN PANEL
      </div>

      <div className="sidebar-line"></div>


      {/* =========================
          SIDEBAR MENU
      ========================= */}

      <nav className="sidebar-menu">

        {/* DASHBOARD */}

        <NavLink
          to="/admin/Dashboard"
          className="sidebar-link"
        >
          <span className="sidebar-icon">📊</span>
          <span>Dashboard</span>
        </NavLink>


       


        {/* CREATE EVENT */}

        <NavLink
          to="/admin/CreateEvent"
          className="sidebar-link"
        >
          <span className="sidebar-icon">➕</span>
          <span>Create Event</span>
        </NavLink>


        {/* MANAGE EVENTS */}

        <NavLink
          to="/admin/manageEvents"
          className="sidebar-link"
        >
          <span className="sidebar-icon">📅</span>
          <span>Manage Events</span>
        </NavLink>


        {/* MANAGE USERS */}

        <NavLink
          to="/admin/ManageUsers"
          className="sidebar-link"
        >
          <span className="sidebar-icon">👥</span>
          <span>Manage Users</span>
        </NavLink>


        {/* ITEMS */}

        <NavLink
          to="/admin/Items"
          className="sidebar-link"
        >
          <span className="sidebar-icon">📦</span>
          <span>Items</span>
        </NavLink>


        {/* EMPLOYEE */}

        <NavLink
          to="/admin/Employee"
          className="sidebar-link"
        >
          <span className="sidebar-icon">💼</span>
          <span>Employee</span>
        </NavLink>


        {/* GALLERY */}

        <NavLink
          to="/admin/Gallery"
          className="sidebar-link"
        >
          <span className="sidebar-icon">🖼️</span>
          <span>Gallery</span>
        </NavLink>


        {/* TECH */}

        <NavLink
          to="/admin/Tech"
          className="sidebar-link"
        >
          <span className="sidebar-icon">💻</span>
          <span>Tech</span>
        </NavLink>



         {/* ADMIN PROFILE */}

        <NavLink
          to="/admin/Adminprofile"
          className="sidebar-link"
        >
          <span className="sidebar-icon">👤</span>
          <span>Admin Profile</span>
        </NavLink>

        {/* MANAGE CONTACT MESSAGES */}

        <NavLink
          to="/admin/manage-contact-messages"
          className="sidebar-link">
          <span className="sidebar-icon">📩</span>
          <span>Contact Messages</span>
        </NavLink>

      

      </nav>

    </aside>
  );
};

export default AdminNavbar;