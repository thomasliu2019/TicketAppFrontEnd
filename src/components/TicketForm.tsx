// File: `src/components/TicketForm.tsx`
import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const TicketForm = ({ onSubmit }: { onSubmit: () => void }) => {
    const { username } = useAuth();
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const submit = async () => {
        try {
            await api.post("/tickets/create", {
                username,
                price,
                description,
            });
            navigate("/ticketsubmitted");
            onSubmit();
            setPrice("");
            setDescription("");
        } catch (err: any) {
            console.error("Ticket submission error:", err);
            alert("Failed to submit ticket: " + (err.response?.data?.message || err.message));
        }
    };

    const goToWelcome = () => {
        navigate("/");
    };

    return (
        <div>
            <h2 style={{ fontSize: "1rem", marginBottom: "12px" }}>Submit a New Ticket:</h2>

            <div className="form-stack">
                <label className="kicker" style={{ marginBottom: 6 }}>Ticket Price</label>
                <input
                    type="text"
                    className="input price-input"
                    placeholder="e.g. 19.99"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <label className="kicker" style={{ marginTop: 8, marginBottom: 6 }}>Ticket Description</label>
                <textarea
                    className="input description"
                    placeholder="Provide a detailed description (paragraphs allowed)..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={6}
                />
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={submit} className={"btn brand"}>Submit Ticket</button>
                <button onClick={goToWelcome} className={"btn btn-hero"}>Log Out</button>
            </div>
        </div>
    );
};

export default TicketForm;
