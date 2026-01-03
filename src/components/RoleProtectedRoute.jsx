import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { user, authReady } = useAuthContext();

  console.log("User:", user);
  console.log("authReady:", authReady);
  // console.log("role:", user.role);

  if (!authReady) return null;
  console.log('hi1');
  if (!user) return <Navigate to="/login" replace />;
  console.log('hi2');
  if (!allowedRoles.includes(user.role)) {
    console.log('hi3');
    return <Navigate to="/" replace />;
  }
  console.log('hi4');
  return children;
};

export default RoleProtectedRoute;
