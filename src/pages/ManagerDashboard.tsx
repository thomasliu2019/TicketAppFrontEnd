import { useEffect, useState } from "react";
import api from "../api/api";
import { Ticket } from "../models/Ticket";
import PendingTicketRow from "../components/PendingTicketRow";

const ManagerDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    api.get<Ticket[]>("/tickets/v1/PENDING")
      .then(res => setTickets(res.data));
  }, []);

  return (
    <div>
      <h2>Manager Dashboard</h2>
      {tickets.map(t => (
        <PendingTicketRow key={t.id} ticket={t} />
      ))}
    </div>
  );
};

export default ManagerDashboard;


