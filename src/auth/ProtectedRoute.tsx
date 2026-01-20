import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  role: "EMPLOYEE" | "MANAGER";
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const { role: userRole, loading } = useAuth();

  // Wait until auth state is loaded
  if (loading) return null; // or a spinner

  if (!userRole || userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

