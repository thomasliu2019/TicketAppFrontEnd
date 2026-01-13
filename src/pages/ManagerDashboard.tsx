import { useEffect, useState } from "react";
import api from "../api/api";
import { Ticket } from "../types/types";

export const ManagerDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const username = "mani";
  
  const fetchTickets = async (username: string) => {
    const res = await api.get("/tickets/${username}");
    setTickets(res.data);
  };

  const updateStatus = async (id: string, status:"PENDING" | "APPROVED" | "DENIED") => {
    await api.patch("/tickets/update/${id}/${status}");
    fetchTickets(username);
  };

  useEffect(() => {
    fetchTickets(username);
  }, []);

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t.id}>
            {t.description} - ${t.price} - {t.status}
            <button onClick={() => updateStatus(t.id,"APPROVED")}>Approve</button>
            <button onClick={() => updateStatus(t.id,"DENIED")}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
