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
      <input
        placeholder="Ticket Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <input
        placeholder="Ticket Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={submit}>Submit Ticket</button>
      <button onClick={goToWelcome}>Log Out</button>
    </div>
  );
};

export default TicketForm;



