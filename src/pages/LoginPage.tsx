// `src/pages/LoginPage.tsx`
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
            // Redirect handled inside AuthContext
        } catch (err: any) {
            setError("Invalid username or password");
        }
    };

    const goToRegistration = () => {
        navigate("/registerEmployee");
    };

    const goToWelcome = () => {
        navigate("/");
    };

    return (
        <div className="app-container">
            <div className="glass card">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="form-row" style={{ flexDirection: "column", gap: 12 }}>
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
                    <div style={{ display: "flex", gap: 8 }}>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <button type="button" className="btn btn-ghost" onClick={goToRegistration}>Register</button>
                        <button type="button" className="btn btn-muted" onClick={goToWelcome}>Back to Welcome Page</button>
                    </div>
                </form>
                {error && <p className="empty-message">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;

