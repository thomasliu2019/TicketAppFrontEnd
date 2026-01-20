import { useState } from "react";
import api from "../api/api";
import { Ticket } from "../models/Ticket";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import { useAuth } from "../auth/AuthContext";

const EmployeeDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const { username } = useAuth();

  const viewYourTickets = async () => {
    setHasFetched(true);
    const res = await api.get<Ticket[]>(`/tickets/orderbydate/${username}`);
    setTickets(res.data);
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <TicketForm onSubmit={() => window.location.reload()} />

      <div style={{ marginTop: "32px", marginBottom: "24px" }}>
        <button onClick={viewYourTickets}>
          View Your Tickets
        </button>
      </div>

      {hasFetched && tickets.length > 0 && (
        <>
          <h2>Your Tickets</h2>
          <TicketList tickets={tickets} />
        </>
      )}

      {hasFetched && tickets.length === 0 && (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default EmployeeDashboard;



