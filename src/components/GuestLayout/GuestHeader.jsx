import React from "react";
import { NavLink } from "react-router-dom";

const GuestHeader = () => {
  return (
    <header className="guest-header">

      <NavLink to="/home" className="guest-header-brand">

        <img
          src="https://t4.ftcdn.net/jpg/06/58/52/67/240_F_658526752_reKZ5XIBNmCwlkeeAJS5lS1RMUxw6VWV.jpg"
          alt="Event Management Logo"
          className="guest-header-logo"
        />

        <div className="guest-header-title">
          <span className="guest-header-event">
            Event
          </span>

          <span className="guest-header-management">
            Management
          </span>
        </div>

      </NavLink>

      <div className="guest-header-right">
        <span className="guest-header-text">
          Event Management System
        </span>
      </div>

    </header>
  );
};

export default GuestHeader;