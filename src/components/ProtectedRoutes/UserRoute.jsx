import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {

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
  // NOT USER
  // ==========================

  if (user.role !== "user") {
    return <Navigate to="/admin/Dashboard" replace />;
  }

  // ==========================
  // USER ALLOWED
  // ==========================

  return children;
};

export default UserRoute;