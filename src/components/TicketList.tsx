import { useState } from "react";
import api from "../api/api";
import { Ticket } from "../models/Ticket";

const cellStyle = {
  textAlign: "left" as const,
  padding: "8px 12px",
};

const TicketList = ({ tickets }: { tickets: Ticket[] }) => {
  const [ticketList, setTicketList] = useState<Ticket[]>(tickets);

  const handleDelete = async (id: number) => {

    try {
      await api.delete(`/tickets/${id}`);
      setTicketList(prev =>
        prev.filter(ticket => ticket.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete ticket", error);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th style={cellStyle}>Employee</th>
          <th style={cellStyle}>Price</th>
          <th style={cellStyle}>Description</th>
          <th style={cellStyle}>Status</th>
          <th style={cellStyle}>Date Created</th>
          <th style={cellStyle}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {ticketList.map(ticket => (
          <tr key={ticket.id}>
            <td style={cellStyle}>{ticket.username}</td>
            <td style={cellStyle}>${ticket.price}</td>
            <td style={cellStyle}>{ticket.description}</td>
            <td style={cellStyle}>{ticket.status}</td>
            <td style={cellStyle}>
              {new Date(ticket.createdAt).toLocaleDateString()}
            </td>
            <td style={cellStyle}>
              <button style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer"
              }}    
              onClick={() => handleDelete(ticket.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketList;



