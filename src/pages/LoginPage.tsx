import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, role } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);

      // Redirect based on role stored in AuthContext
      if (role === "MANAGER") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      alert("Invalid username or password");
    }
  };
  const goToRegistration = () => {
    navigate("/registerEmployee"); // redirects to /registerEmployee
  };

  const goToWelcome = () => {
    navigate("/"); // redirects to / (WelcomePage)
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <button onClick={goToRegistration}>Register</button>
      <button onClick={goToWelcome}>Back to Welcome Page</button>
    </div>
  );
};

export default Login;


