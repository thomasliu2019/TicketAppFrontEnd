import { useState } from "react";
import api from "../api/api";

export const TicketForm = ({ onSubmitted }: { onSubmitted: () => void }) => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async () => {
    try {
      await api.post("/tickets/create", { description, price });
      setDescription("");
      setPrice(0);
      onSubmitted();
    } catch (err) {
      console.error(err);
      alert("Failed to submit ticket");
    }
  };

  return (
    <div>
      <h3>Submit Reimbursement Ticket</h3>
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Amount" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
