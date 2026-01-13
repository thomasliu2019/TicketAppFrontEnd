import { useState, useEffect } from "react";
import api from "../api/api";
import { Ticket } from "../types/types";
import { TicketForm } from "../components/TicketForm";
import { TicketList } from "../components/TicketList";

export const EmployeeDashboard = () => {
  const username = "mani";
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async (username: string) => {
    const res = await api.get("/tickets/${username}");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets(username);
  }, []);

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <TicketForm onSubmitted={fetchTickets(username)} />
      <TicketList tickets={tickets} />
    </div>
  );
};
