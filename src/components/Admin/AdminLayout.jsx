import { Outlet } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (

    <>
      <style>
        {`

/* =========================================
   ADMIN DASHBOARD
========================================= */

.admin-dashboard {

  min-height: 100vh;

  background: #0b1726;

  color: white;

  font-family:
    "Segoe UI",
    Arial,
    sans-serif;

}


/* =========================================
   HEADER
========================================= */

.admin-header {

  height: 82px;

  background: #142237;

  border-bottom:
    1px solid #29435f;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 35px;

}


/* =========================================
   HEADER BRAND
========================================= */

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

}


.header-title {

  display: flex;

  gap: 10px;

  font-size: 32px;

  font-weight: 800;

}


.header-event {

  background:
    linear-gradient(
      90deg,
      #ffb347,
      #ff8c00
    );

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

}


.header-management {

  background:
    linear-gradient(
      90deg,
      #ff4f81,
      #9b7cff,
      #33c1ff
    );

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

}


/* =========================================
   ADMIN WELCOME
========================================= */

.admin-welcome {

  color: #a9c7e5;

  font-size: 17px;

  font-weight: 600;

  padding: 10px 18px;

  border-radius: 10px;

  background: #0d1b2d;

  border:
    1px solid
    rgba(49,130,206,0.35);

}


/* =========================================
   DASHBOARD BODY
========================================= */

.admin-dashboard-body {

  display: flex;

  min-height:
    calc(100vh - 82px);

}


/* =========================================
   SIDEBAR
========================================= */

.admin-sidebar {

  width: 280px;

  min-width: 280px;

  background: #142237;

  border-right:
    1px solid #29435f;

  padding: 28px 16px;

}


/* =========================================
   SIDEBAR HEADING
========================================= */

.sidebar-heading {

  font-size: 21px;

  font-weight: 800;

  letter-spacing: 1px;

  color: #f1f5f9;

  padding:
    8px 10px 18px;

}


.sidebar-line {

  height: 1px;

  background: #314966;

  margin-bottom: 25px;

}


/* =========================================
   MENU
========================================= */

.sidebar-menu {

  display: flex;

  flex-direction: column;

  gap: 12px;

}


/* =========================================
   SIDEBAR LINK
========================================= */

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

  transition:
    all 0.25s ease;

}


.sidebar-link:hover {

  background: #1b3550;

  color: white;

  transform:
    translateX(5px);

}


/* =========================================
   ACTIVE
========================================= */

.sidebar-link.active {

  background:
    linear-gradient(
      135deg,
      #0878e8,
      #1251c7
    );

  color: white;

  box-shadow:
    0 5px 18px
    rgba(0,110,255,0.25);

}


/* =========================================
   ICON
========================================= */

.sidebar-icon {

  width: 28px;

  text-align: center;

  font-size: 19px;

}


/* =========================================
   RIGHT SIDE
========================================= */

.admin-dashboard-right {

  flex: 1;

  display: flex;

  flex-direction: column;

  min-width: 0;

}


/* =========================================
   MAIN CONTENT
========================================= */

.admin-dashboard-content {

  flex: 1;

  padding: 30px;

  background: #0b1726;

  min-height: 600px;

}


/* =========================================
   FOOTER
========================================= */

.admin-footer {

  background: #18293c;

  border-top:
    1px solid #29435f;

  padding: 18px 30px;

  text-align: center;

  color: #c2cfdd;

  font-size: 16px;

}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 992px) {

  .admin-sidebar {

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

  .admin-header {

    padding: 0 18px;

  }

  .admin-dashboard-body {

    flex-direction: column;

  }

  .admin-sidebar {

    width: 100%;

    min-width: 100%;

  }

  .sidebar-menu {

    flex-direction: row;

    flex-wrap: wrap;

  }

  .sidebar-link {

    flex: 1;

    min-width: 160px;

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

  .admin-welcome {

    display: none;

  }

  .admin-dashboard-content {

    padding: 20px 15px;

  }

}

        `}
      </style>


      <div className="admin-dashboard">

        <AdminHeader />

        <div className="admin-dashboard-body">

          <AdminNavbar />

          <div className="admin-dashboard-right">

            <main className="admin-dashboard-content">

              <Outlet />

            </main>

            <AdminFooter />

          </div>

        </div>

      </div>

    </>
  );
};

export default AdminLayout;