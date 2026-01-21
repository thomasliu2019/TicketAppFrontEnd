import { useNavigate } from "react-router-dom";

const TicketSubmittedPage = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/employee"); // redirects to /employee
  };
  const goToWelcomePage = () => {
    navigate("/"); 
  };

  return (
    <div>
      <h1>Ticket Successfully Submitted!</h1>
      <button className="btn btn-primary" onClick={goToDashboard}>Back to Employee Dashboard</button>
      <button className="btn btn-muted" onClick={goToWelcomePage}>Log Out</button>
    </div>
  );
};

export default TicketSubmittedPage;