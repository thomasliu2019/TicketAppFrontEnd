import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

  const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const register = async () => {
  try {
    const res = await api.post("/registerEmployee", {
      username,
      password,
      role: "EMPLOYEE",
    });
    alert("Registered successfully!");
  } catch (err: any) {
    console.error(err);
    alert("Registration failed: " + (err.response?.data?.message || err.message));
  }
};
  const backToWelcomePage = () => {
    navigate("/"); // redirects to / (WelcomePage)
  };
  const goToLogin = () => {
    navigate("/login"); // redirects to /login
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={backToWelcomePage}>Back to Welcome Page</button>
      <button onClick={goToLogin}>Go to Login</button>
    </div>
  );
};

export default RegisterPage


