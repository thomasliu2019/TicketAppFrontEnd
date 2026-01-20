import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password); 
      // Redirect handled inside AuthContext
    } catch (err: any) {
      setError("Invalid username or password");
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
      <form onSubmit={handleLogin}>
        <input
          type="text"
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
        <button type="submit">Login</button>
        <button onClick={goToRegistration}>Register</button>
        <button onClick={goToWelcome}>Back to Welcome Page</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;



