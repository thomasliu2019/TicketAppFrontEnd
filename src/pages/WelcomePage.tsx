
// `src/pages/WelcomePage.tsx`
import { useNavigate } from "react-router-dom";
import "./apple.css";

const WelcomePage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    };
    const goToRegistration = () => {
        navigate("/registerEmployee");
    };

    return (
        <div className="app-container">
            <div className="glass card" style={{ padding: 24 }}>
                <h1>Welcome To $Reimbursement$$</h1>
                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    <button className="btn btn-primary" onClick={goToLogin}>Login as Existing User</button>
                    <button className="btn btn-primary" onClick={goToRegistration}>Register as New User</button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;

