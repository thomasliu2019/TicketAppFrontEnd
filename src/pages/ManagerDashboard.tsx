import { useEffect, useState } from "react";
import api from "../api/api";
import { Ticket } from "../models/Ticket";
import PendingTicketRow from "../components/PendingTicketRow";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  type ViewMode = "PENDING" | "APPROVED" | "DENIED";
  const [viewMode, setViewMode] = useState<ViewMode>("PENDING");
  const [hasFetched, setHasFetched] = useState(false);

  const navigate = useNavigate();
  const goToWelcome = () => {
    navigate("/"); 
  };

  const removeTicket = (id: number) => {
    setTickets(prev => prev.filter(t => t.id !== id));
  };

  const getPendingTickets = async () => {
    setHasFetched(true);
    const res = await api.get<Ticket[]>("/tickets/v1/PENDING");
    setTickets(res.data);
    setViewMode("PENDING");
  };

  const getAllApprovedTickets = async () => {
    setHasFetched(true);
    const res = await api.get("/tickets/v1/APPROVED");
    return res.data;
  };

  const getAllDeniedTickets = async () => {
    setHasFetched(true);
    const res = await api.get("/tickets/v1/DENIED");
    return res.data;
  };

  const viewAcceptedTickets = async () => {
    const data = await getAllApprovedTickets();
    setTickets(data);
    setViewMode("APPROVED");
  };

  const viewDeniedTickets = async () => {
    const data = await getAllDeniedTickets();
    setTickets(data);
    setViewMode("DENIED");
  };

  return (
    <div> 
      <h2>Manager Dashboard</h2>
      <div style={{ marginBottom: "24px" }}>
          <button onClick={getPendingTickets}>View Pending Tickets</button>
          <button onClick={viewAcceptedTickets}>View Approved Tickets</button>
          <button onClick={viewDeniedTickets}>View Denied Tickets</button>
          <button onClick={goToWelcome}>Log Out</button>
      </div>
      {hasFetched && tickets.length === 0 && viewMode && (
        <p className="empty-message">
          No tickets available.
        </p>
      )}
      {viewMode === "PENDING" && tickets.length > 0 &&
        tickets.map(t => (
          <PendingTicketRow key={t.id} ticket={t} onResolved={removeTicket}/>
      ))} 
      {viewMode !== "PENDING" && tickets.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.username}</td>
                <td>${ticket.price}</td>
                <td>{ticket.description}</td>
                <td>{ticket.status}</td>
                <td>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerDashboard;


