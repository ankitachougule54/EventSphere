import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

const UserLayout = () => {
  return (
    <>
      <style>
        {`

/* ==========================================
   GLOBAL USER DASHBOARD
========================================== */

.user-dashboard {
  min-height: 100vh;
  background: #0b1726;
  color: #ffffff;
  font-family: "Segoe UI", Arial, sans-serif;
}


/* ==========================================
   HEADER
========================================== */

.user-header {
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

.header-brand {
  display: flex;
  align-items: center;
  gap: 15px;
}


.header-logo {
  width: 58px;
  height: 58px;

  object-fit: cover;

  border-radius: 50%;

  transition: 0.3s ease;

  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, 0.25);
}


.header-logo:hover {
  transform: scale(1.06);
}


/* ==========================================
   EVENT MANAGEMENT TEXT
========================================== */

.header-title {
  font-size: 32px;
  font-weight: 800;

  letter-spacing: 0.5px;

  display: flex;
  gap: 10px;
}


/* EVENT */

.header-event {
  background: linear-gradient(
    90deg,
    #ffb347,
    #ff8c00
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-weight: 900;
}


/* MANAGEMENT */

.header-management {
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

.header-right {
  display: flex;
  align-items: center;
}


.user-welcome {
  color: #a9c7e5;

  font-size: 17px;
  font-weight: 600;

  padding: 10px 18px;

  border-radius: 10px;

  background: #0d1b2d;

  border: 1px solid rgba(49, 130, 206, 0.35);
}


/* ==========================================
   DASHBOARD BODY
========================================== */

.dashboard-body {
  display: flex;

  min-height: calc(100vh - 82px);
}


/* ==========================================
   SIDEBAR
========================================== */

.user-sidebar {
  width: 280px;
  min-width: 280px;

  background: #142237;

  border-right: 1px solid #29435f;

  padding: 28px 16px;

  display: flex;
  flex-direction: column;
}


/* ==========================================
   SIDEBAR HEADING
========================================== */

.sidebar-heading {
  font-size: 21px;

  font-weight: 800;

  letter-spacing: 1px;

  color: #f1f5f9;

  padding: 8px 10px 18px;
}


.sidebar-line {
  height: 1px;

  background: #314966;

  margin-bottom: 25px;
}


/* ==========================================
   SIDEBAR MENU
========================================== */

.sidebar-menu {
  display: flex;

  flex-direction: column;

  gap: 12px;
}


/* ==========================================
   SIDEBAR LINKS
========================================== */

.sidebar-link {
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

.sidebar-icon {
  width: 28px;

  text-align: center;

  font-size: 19px;
}


/* ==========================================
   HOVER
========================================== */

.sidebar-link:hover {
  background: #1b3550;

  color: #ffffff;

  transform: translateX(5px);
}


/* ==========================================
   ACTIVE LINK
========================================== */

.sidebar-link.active {
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
   SIDEBAR BOTTOM
========================================== */

.sidebar-bottom {
  margin-top: auto;

  padding-top: 20px;
}


/* ==========================================
   LOGOUT
========================================== */

.logout-link {
  color: #ffaaa5;
}


.logout-link:hover {
  background: rgba(220, 70, 70, 0.15);

  color: #ff7b73;
}


/* ==========================================
   RIGHT SECTION
========================================== */

.dashboard-right {
  flex: 1;

  display: flex;

  flex-direction: column;

  min-width: 0;
}


/* ==========================================
   MAIN CONTENT
========================================== */

.dashboard-content {
  flex: 1;

  padding: 30px;

  background: #0b1726;

  min-height: 600px;
}


/* ==========================================
   FOOTER
========================================== */

.user-footer {
  background: #18293c;

  border-top: 1px solid #29435f;

  padding: 18px 30px;

  text-align: center;

  color: #c2cfdd;

  font-size: 16px;
}


/* ==========================================
   RESPONSIVE
========================================== */

@media (max-width: 992px) {

  .user-sidebar {
    width: 230px;
    min-width: 230px;
  }


  .sidebar-link {
    font-size: 16px;

    padding: 13px;
  }


  .header-title {
    font-size: 26px;
  }

}


@media (max-width: 768px) {

  .user-header {
    padding: 0 18px;
  }


  .dashboard-body {
    flex-direction: column;
  }


  .user-sidebar {
    width: 100%;

    min-width: 100%;

    padding: 15px;
  }


  .sidebar-menu {
    flex-direction: row;

    flex-wrap: wrap;
  }


  .sidebar-link {
    flex: 1;

    min-width: 140px;
  }


  .sidebar-bottom {
    margin-top: 15px;
  }

}


@media (max-width: 576px) {

  .header-logo {
    width: 45px;

    height: 45px;
  }


  .header-title {
    font-size: 20px;

    gap: 5px;
  }


  .user-welcome {
    display: none;
  }


  .dashboard-content {
    padding: 20px 15px;
  }

}

        `}
      </style>

      <div className="user-dashboard">

        {/* ================= HEADER ================= */}
        <UserHeader />


        {/* ================= DASHBOARD BODY ================= */}
        <div className="dashboard-body">

          {/* ================= SIDEBAR ================= */}
          <UserNavbar />


          {/* ================= RIGHT SIDE ================= */}
          <div className="dashboard-right">

            {/* ================= MAIN CONTENT ================= */}
            <main className="dashboard-content">
              <Outlet />
            </main>


            {/* ================= FOOTER ================= */}
            <UserFooter />

          </div>

        </div>

      </div>
    </>
  );
};

export default UserLayout;