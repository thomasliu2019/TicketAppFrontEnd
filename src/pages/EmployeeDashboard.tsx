import { useEffect, useState } from "react";
import api from "../api/api";
import { Ticket } from "../models/Ticket";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import { useAuth } from "../auth/AuthContext";

const EmployeeDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { username } = useAuth();

  useEffect(() => {
    api.get<Ticket[]>(`/tickets/orderbydate/${username}`).then(res => setTickets(res.data));
  }, [username]);

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <TicketForm onSubmit={() => window.location.reload()} />
      <TicketList tickets={tickets} />
    </div>
  );
};

export default EmployeeDashboard;


