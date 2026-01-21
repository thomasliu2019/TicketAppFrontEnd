// File: `src/pages/LoginPage.tsx`
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./apple.css";

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
        } catch (err: any) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="app-container">
            <div className="glass card card-pad">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="form-stack">
                    <input
                        className="input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="actions">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <button type="button" className="btn btn-ghost" onClick={() => navigate("/registerEmployee")}>Register</button>
                        <button type="button" className="btn btn-muted" onClick={() => navigate("/")}>Back to Welcome Page</button>
                    </div>
                </form>
                {error && <p className="empty-message">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;

