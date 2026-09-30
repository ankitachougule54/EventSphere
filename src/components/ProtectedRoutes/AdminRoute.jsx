import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  // Get token
  const token = localStorage.getItem("token");

  // Get user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ==========================
  // NOT LOGGED IN
  // ==========================

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ==========================
  // NOT ADMIN
  // ==========================

  if (user.role !== "admin") {
    return <Navigate to="/user/home" replace />;
  }

  // ==========================
  // ADMIN ALLOWED
  // ==========================

  return children;
};

export default AdminRoute;