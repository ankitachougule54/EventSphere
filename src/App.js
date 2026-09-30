import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GuestLayout from './components/GuestLayout/GuestLayout';
import Home from './components/GuestLayout/Home';
import About from './components/GuestLayout/About';
import Services from './components/GuestLayout/Services';
import Contact from './components/GuestLayout/Contact';
import Register from './components/GuestLayout/Register';
import Login from './components/GuestLayout/Login';

import LogOut from './components/userLayout/LogOut';
import Profile from './components/userLayout/Profile';
import UserLayout from './components/userLayout/UserLayout';
import ViewGallery from './components/userLayout/viewGallery';
import ChangePassword from './components/userLayout/ChangePassword';
import ForgotPassword from './components/GuestLayout/ForgotPassword';
import Item from './components/userLayout/Item';

// =========================
// NEW USER PAGES
// =========================

import Events from './components/userLayout/Events';
import MyEvents from './components/userLayout/MyEvents';


import AdminProfile from './components/Admin/AdminProfile';
import CreateEvent from './components/Admin/CreateEvent';
import Dashboard from './components/Admin/Dashboard';
import AdminLayout from './components/Admin/AdminLayout';
import ManageUsers from './components/Admin/ManageUsers';
import Items from './components/Admin/Items';
import Employee from './components/Admin/Employee';
import Gallery from './components/Admin/Gallery';
import Tech from './components/Admin/Tech';
import ManageEvents from './components/Admin/ManageEvents';

import UserRoute from "./components/ProtectedRoutes/UserRoute";
import AdminRoute from "./components/ProtectedRoutes/AdminRoute";
import ManageContactMessages from './components/Admin/ManageContactMessages';


function App() {

  return (

    <div className="App">

      <Routes>

        {/* =========================
            GUEST ROUTES
        ========================== */}

        <Route path='/' element={<GuestLayout />}>

          <Route index element={<Home />} />

          <Route path="/home" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/register" element={<Register />} />

          <Route path="/services" element={<Services />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/forgotPassword"
            element={<ForgotPassword />}
          />

        </Route>


        {/* =========================
            USER ROUTES
        ========================== */}

        <Route
          path='/user'
          element={<UserLayout />}
        >

          {/* USER PROTECTED ROUTES */}

          <Route

            path="/user"

            element={

              <UserRoute>

                <UserLayout />

              </UserRoute>

            }

          ></Route>


          <Route
            path='/user/home'
            element={<Home />}
          />


          {/* =========================
              EVENTS
          ========================== */}

          <Route
            path="/user/events"
            element={<Events />}
          />


          {/* =========================
              MY REGISTERED EVENTS
          ========================== */}

          <Route
            path="/user/my-events"
            element={<MyEvents />}
          />


          <Route
            path="/user/logout"
            element={<LogOut />}
          />


          <Route
            path="/user/profile"
            element={<Profile />}
          />


          <Route
            path="/user/Item"
            element={<Item />}
          />


          <Route
            path="/user/viewGallery"
            element={<ViewGallery />}
          />


          <Route
            path="changePassword"
            element={<ChangePassword />}
          />

        </Route>


        {/* =========================
            ADMIN ROUTES
        ========================== */}

        <Route
          path='/admin'
          element={<AdminLayout />}
        >

          {/* ADMIN PROTECTED ROUTES */}

          <Route

            path="/admin"

            element={

              <AdminRoute>

                <AdminLayout />

              </AdminRoute>

            }

          ></Route>


          <Route
            path="Adminprofile"
            element={<AdminProfile />}
          />


          <Route
            path="CreateEvent"
            element={<CreateEvent />}
          />


          <Route
            path="Dashboard"
            element={<Dashboard />}
          />


          <Route
            path="manageEvents"
            element={<ManageEvents />}
          />


          <Route
            path="ManageUsers"
            element={<ManageUsers />}
          />


          <Route
            path="Items"
            element={<Items />}
          />


          <Route
            path="Employee"
            element={<Employee />}
          />


          <Route
            path="Gallery"
            element={<Gallery />}
          />

          <Route
            path="manage-contact-messages"
            element={<ManageContactMessages />}
          />

          <Route
            path="Tech"
            element={<Tech />}
          />

        </Route>

      </Routes>

    </div>

  );

}

export default App;