
// `src/pages/ManagerDashboard.tsx`
import { useEffect, useState } from "react";
import api from "../api/api";
import { Ticket } from "../models/Ticket";
import PendingTicketRow from "../components/PendingTicketRow";
import { useNavigate } from "react-router-dom";
import "./apple.css";

const ManagerDashboard = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    type ViewMode = "PENDING" | "APPROVED" | "DENIED" | "EMPLOYEE";
    const [viewMode, setViewMode] = useState<ViewMode>("PENDING");
    const [hasFetched, setHasFetched] = useState(false);
    const[employeeUsername, setEmployeeUsername] = useState("");
    const [showSearchUsername, setSearchUsername] = useState(false);

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

    const viewEmployeeTickets = async (username: string) => {
        setHasFetched(true);
        if (username === "") {
            const res = await api.get<Ticket[]>(`/tickets`);
            setTickets(res.data);
        } else {
            const res = await api.get<Ticket[]>(`/tickets/${username}`);
            setTickets(res.data);
        }
        setViewMode("EMPLOYEE");
    }   

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/tickets/${id}`);
            setTickets(prev =>
                prev.filter(ticket => ticket.id !== id)
            );
        } catch (error) {
            console.error("Failed to delete ticket", error);
        }
  };

    const cellStyle = {
        textAlign: "left" as const,
        padding: "8px 12px"
    };

    return (
        <div className="app-container">
            <div className="glass card">
                <h2>Manager Dashboard</h2>
                <div style={{ marginBottom: 24, display: "flex", gap: 8 }}>
                    <button className="btn btn-primary" onClick={() => setSearchUsername(true)}>Search Tickets By Employee Username </button>
                    <button className="btn btn-primary" onClick={getPendingTickets}>View Pending Tickets</button>
                    <button className="btn btn-primary" onClick={viewAcceptedTickets}>View Approved Tickets</button>
                    <button className="btn btn-primary" onClick={viewDeniedTickets}>View Denied Tickets</button>
                    <button className="btn btn-primary" onClick={goToWelcome}>Log Out</button>
                </div>
                {showSearchUsername && (
                    <div>
                    <input
                        type="text"
                        placeholder="Enter Employee Username"
                        value={employeeUsername}
                        onChange={(e) => setEmployeeUsername(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={() => viewEmployeeTickets(employeeUsername)}>Search</button>
                    </div>
                )}

                {hasFetched && tickets.length === 0 && viewMode && (
                    <p className="empty-message">No tickets available.</p>
                )}

                {viewMode === "PENDING" && tickets.length > 0 && (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style = {cellStyle}>Username</th>
                                <th style = {cellStyle}>Price</th>
                                <th style = {cellStyle}>Description</th>
                                <th style = {cellStyle}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map(ticket => (
                                <PendingTicketRow
                                    key={ticket.id}
                                    ticket={ticket}
                                    onResolved={removeTicket}
                                />
                            ))}
                        </tbody>
                    </table>
                )
            } 

                {viewMode !== "PENDING" && tickets.length > 0 && (
                    <table className="table">
                        <thead>
                        <tr>
                            <th style = {cellStyle}>Employee</th>
                            <th style = {cellStyle}>Price</th>
                            <th style = {cellStyle}>Description</th>
                            <th style = {cellStyle}>Status</th>
                            <th style = {cellStyle}>Date Created</th>
                            <th style={cellStyle}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td style = {cellStyle}>{ticket.username}</td>
                                <td style = {cellStyle}>${ticket.price}</td>
                                <td style = {cellStyle}>{ticket.description}</td>
                                <td style = {cellStyle}>{ticket.status}</td>
                                <td style = {cellStyle}>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                <td style={cellStyle}>
                                    <button className={"btn btn-muted"}
                                        onClick={() => handleDelete(ticket.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManagerDashboard;
