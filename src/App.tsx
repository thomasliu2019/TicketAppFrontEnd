import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import TicketSubmittedPage from "./pages/TicketSubmittedPage";
import RegistrationSuccessfulPage from "./pages/RegisterSuccessfulPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registerEmployee" element={<RegisterPage />} />
      <Route path="/ticketsubmitted" element={<TicketSubmittedPage />} />
      <Route path="/registersuccess" element={<RegistrationSuccessfulPage />} />
      <Route
        path="/employee"
        element={
          <ProtectedRoute role="EMPLOYEE">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute role="MANAGER">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;




