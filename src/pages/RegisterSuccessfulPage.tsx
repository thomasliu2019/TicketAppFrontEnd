import { useNavigate } from "react-router-dom";

const TicketSubmittedPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // redirects to /login
  };
  const goToWelcomePage = () => {
    navigate("/"); 
  };

  return (
    <div>
      <h1>Registration successful! You can now login as an Employee.</h1>
      <button className="btn btn-primary" onClick={goToLogin}>Login</button>
      <button className="btn btn-muted" onClick={goToWelcomePage}>Back to Welcome Page</button>
    </div>
  );
};

export default TicketSubmittedPage;