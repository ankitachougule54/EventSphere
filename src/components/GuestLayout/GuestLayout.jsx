import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import GuestNavbar from "./GuestNavbar";
import GuestFooter from "./GuestFooter";

const GuestLayout = () => {
  return (
    <>
      {/* ================= CSS ================= */}

      <style>
        {`

        /* ==========================================
           GLOBAL GUEST DASHBOARD
        ========================================== */

        .guest-dashboard {
          min-height: 100vh;
          background: #0b1726;
          color: #ffffff;
          font-family: "Segoe UI", Arial, sans-serif;
        }


        /* ==========================================
           HEADER
        ========================================== */

        .guest-header {
          height: 82px;
          background: #142237;
          border-bottom: 1px solid #29435f;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 35px;

          position: relative;
          z-index: 100;
        }


        /* ==========================================
           HEADER BRAND
        ========================================== */

        .guest-header-brand {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
        }


        .guest-header-logo {
          width: 58px;
          height: 58px;

          object-fit: cover;
          border-radius: 50%;

          box-shadow:
            0 4px 15px
            rgba(0, 0, 0, 0.25);

          transition: 0.3s ease;
        }


        .guest-header-logo:hover {
          transform: scale(1.06);
        }


        /* ==========================================
           EVENT MANAGEMENT TEXT
        ========================================== */

        .guest-header-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: 0.5px;

          display: flex;
          gap: 10px;
        }


        .guest-header-event {

          background: linear-gradient(
            90deg,
            #ffb347,
            #ff8c00
          );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          font-weight: 900;
        }


        .guest-header-management {

          background: linear-gradient(
            90deg,
            #ff4f81,
            #9b7cff,
            #33c1ff
          );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          font-weight: 800;
        }


        /* ==========================================
           HEADER RIGHT
        ========================================== */

        .guest-header-text {

          color: #a9c7e5;

          font-size: 17px;
          font-weight: 600;

          padding: 10px 18px;

          border-radius: 10px;

          background: #0d1b2d;

          border:
            1px solid
            rgba(49, 130, 206, 0.35);
        }


        /* ==========================================
           DASHBOARD BODY
        ========================================== */

        .guest-dashboard-body {

          display: flex;

          min-height:
            calc(100vh - 82px);
        }


        /* ==========================================
           SIDEBAR
        ========================================== */

        .guest-sidebar {

          width: 280px;
          min-width: 280px;

          background: #142237;

          border-right:
            1px solid #29435f;

          padding: 28px 16px;

          display: flex;
          flex-direction: column;
        }


        /* ==========================================
           SIDEBAR HEADING
        ========================================== */

        .guest-sidebar-heading {

          font-size: 21px;
          font-weight: 800;

          letter-spacing: 1px;

          color: #f1f5f9;

          padding: 8px 10px 18px;
        }


        .guest-sidebar-line {

          height: 1px;

          background: #314966;

          margin-bottom: 25px;
        }


        /* ==========================================
           SIDEBAR MENU
        ========================================== */

        .guest-sidebar-menu {

          display: flex;
          flex-direction: column;

          gap: 12px;
        }


        /* ==========================================
           SIDEBAR LINKS
        ========================================== */

        .guest-sidebar-link {

          display: flex;

          align-items: center;

          gap: 16px;

          padding: 15px 18px;

          border-radius: 12px;

          color: #b8c7d9;

          text-decoration: none;

          font-size: 18px;

          font-weight: 600;

          transition: all 0.25s ease;
        }


        /* ==========================================
           ICON
        ========================================== */

        .guest-sidebar-icon {

          width: 28px;

          text-align: center;

          font-size: 19px;
        }


        /* ==========================================
           HOVER
        ========================================== */

        .guest-sidebar-link:hover {

          background: #1b3550;

          color: #ffffff;

          transform: translateX(5px);
        }


        /* ==========================================
           ACTIVE LINK
        ========================================== */

        .guest-sidebar-link.active {

          background: linear-gradient(
            135deg,
            #0878e8,
            #1251c7
          );

          color: #ffffff;

          box-shadow:
            0 5px 18px
            rgba(0, 110, 255, 0.25);
        }


        /* ==========================================
           ACCOUNT SECTION
        ========================================== */

        .guest-sidebar-account {

          margin-top: 35px;

          display: flex;

          flex-direction: column;

          gap: 12px;
        }


        .guest-account-title {

          font-size: 15px;

          font-weight: 800;

          letter-spacing: 1px;

          color: #7189a3;

          padding: 0 15px 10px;
        }


        /* ==========================================
           USER + ADMIN
        ========================================== */

        .guest-sidebar-bottom {

          margin-top: auto;

          display: flex;

          flex-direction: column;

          gap: 12px;
        }


        .guest-user-link {
          color: #9dcaff;
        }


        .guest-admin-link {
          color: #d3b4ff;
        }


        /* ==========================================
           RIGHT SECTION
        ========================================== */

        .guest-dashboard-right {

          flex: 1;

          display: flex;

          flex-direction: column;

          min-width: 0;
        }


        /* ==========================================
           MAIN CONTENT
        ========================================== */

        .guest-dashboard-content {

          flex: 1;

          padding: 30px;

          background: #0b1726;

          min-height: 600px;
        }


        /* ==========================================
           FOOTER
        ========================================== */

        .guest-footer {

          background: #18293c;

          border-top:
            1px solid #29435f;

          padding: 18px 30px;

          text-align: center;

          color: #c2cfdd;

          font-size: 16px;
        }


        .guest-footer-title {

          font-size: 18px;

          font-weight: 700;

          margin-bottom: 8px;
        }


        .guest-footer-text span {

          color: #4da3ff;

          margin-left: 5px;
        }


        /* ==========================================
           RESPONSIVE
        ========================================== */

        @media (max-width: 992px) {

          .guest-sidebar {

            width: 230px;

            min-width: 230px;
          }


          .guest-sidebar-link {

            font-size: 16px;

            padding: 13px;
          }


          .guest-header-title {

            font-size: 26px;
          }

        }


        @media (max-width: 768px) {

          .guest-header {

            padding: 0 18px;
          }


          .guest-dashboard-body {

            flex-direction: column;
          }


          .guest-sidebar {

            width: 100%;

            min-width: 100%;

            padding: 15px;
          }


          .guest-sidebar-menu {

            flex-direction: row;

            flex-wrap: wrap;
          }


          .guest-sidebar-link {

            flex: 1;

            min-width: 140px;
          }


          .guest-sidebar-bottom {

            margin-top: 20px;

            flex-direction: row;

            flex-wrap: wrap;
          }

        }


        @media (max-width: 576px) {

          .guest-header-logo {

            width: 45px;

            height: 45px;
          }


          .guest-header-title {

            font-size: 20px;

            gap: 5px;
          }


          .guest-header-text {

            display: none;
          }


          .guest-dashboard-content {

            padding: 20px 15px;
          }

        }

        `}
      </style>


      {/* ================= MAIN LAYOUT ================= */}

      <div className="guest-dashboard">

        {/* HEADER */}

        <GuestHeader />


        {/* DASHBOARD BODY */}

        <div className="guest-dashboard-body">


          {/* SIDEBAR */}

          <GuestNavbar />


          {/* RIGHT SIDE */}

          <div className="guest-dashboard-right">


            {/* MAIN CONTENT */}

            <main className="guest-dashboard-content">

              <Outlet />

            </main>


            {/* FOOTER */}

            <GuestFooter />


          </div>


        </div>


      </div>

    </>
  );
};

export default GuestLayout;