
// `src/pages/EmployeeDashboard.tsx`
import { useState } from "react";
import api from "../api/api";
import { Ticket } from "../models/Ticket";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import { useAuth } from "../auth/AuthContext";
import "./apple.css";

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
        <div className="app-container">
            <div className="glass card">
                <h2>Employee Dashboard</h2>

                <div style={{ marginTop: 12 }}>
                    <TicketForm onSubmit={() => window.location.reload()} />
                </div>

                <div style={{ marginTop: 32, marginBottom: 24 }}>
                    <button className="btn btn-primary" onClick={viewYourTickets}>View Your Tickets</button>
                </div>

                {hasFetched && tickets.length > 0 && (
                    <>
                        <h2>Your Tickets</h2>
                        <TicketList tickets={tickets} />
                    </>
                )}

                {hasFetched && tickets.length === 0 && (
                    <p className="empty-message">No tickets found.</p>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;


