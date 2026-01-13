import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setEmployee } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("employee", JSON.stringify(res.data.employee));
      setEmployee(res.data.employee);

      // Redirect based on role
      if (res.data.employee.role === "MANAGER") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
