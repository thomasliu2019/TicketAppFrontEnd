import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./apple.css";
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
            navigate("/registersuccess")
        } catch (err: any) {
            console.error(err);
            alert("Registration failed: " + (err.response?.data?.message || err.message));
        }
    };
    const backToWelcomePage = () => {
        navigate("/");
    };
    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="app-container">
            <div className="glass card">
                <h2>Register</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input className="input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <div style={{ display: "flex", gap: 8 }}>
                        <button type="button" className="btn btn-primary" onClick={register}>Register</button>
                        <button type="button" className="btn btn-muted" onClick={backToWelcomePage}>Back to Welcome Page</button>
                        <button type="button" className="btn btn-ghost" onClick={goToLogin}>Go to Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

