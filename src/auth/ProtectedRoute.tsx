import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
  role: "EMPLOYEE" | "MANAGER";
}

const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const { role: userRole } = useAuth();

  if (!userRole) return <Navigate to="/login" />;
  if (userRole !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
