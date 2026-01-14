import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // redirects to /login
  };
  const goToRegistration = () => {
    navigate("/registerEmployee"); // redirects to /registerEmployee
  };

  return (
    <div>
      <h1>Welcome to the App!</h1>
      <button onClick={goToLogin}>Login as Existing User</button>
      <button onClick={goToRegistration}>Register as New User</button>
    </div>
  );
};

export default WelcomePage;
