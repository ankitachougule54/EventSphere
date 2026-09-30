import React from "react";

const UserHeader = () => {
  return (
    <header className="user-header">

      <div className="header-brand">

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPX8nOYCnfq7o4D7iat6kxeM6bbrpMoIRdV3B2LSKXA&s=10"
          alt="Event Management Logo"
          className="header-logo"
        />

        <div className="header-title">
          <span className="header-event">
            Event
          </span>

          <span className="header-management">
            Management
          </span>
        </div>

      </div>

      <div className="header-right">

        <span className="user-welcome">
          User Panel
        </span>

      </div>

    </header>
  );
};

export default UserHeader;