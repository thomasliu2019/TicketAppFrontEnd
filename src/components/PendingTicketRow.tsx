import api from "../api/api";
import { Ticket } from "../models/Ticket";
import { TicketStatus } from "../models/TicketStatus";

interface PendingTicketRowProps {
  ticket: Ticket;
  onResolved: (ticketId: number) => void;
}

const PendingTicketRow = ({ ticket, onResolved }: PendingTicketRowProps) => {

  const updateStatus = async (status: TicketStatus) => {
     try {
      console.log("Sending status:", status);
      await api.patch(`/tickets/update/${ticket.id}/${status}`);
      onResolved(ticket.id);
      console.log("Update success");
    } catch (err: any) {
      console.error("Update failed:", err.response?.status, err.response?.data);
    }
  };

  const cellStyle = {
    textAlign: "left" as const,
    padding: "8px 12px"
  };
  return (
    <tr>
      <td style={cellStyle}>{ticket.username}</td>
      <td style={cellStyle}>${ticket.price}</td>
      <td style={cellStyle}>{ticket.description}</td>
      <td>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => updateStatus("APPROVED")}>
            Approve
          </button>
          <button onClick={() => updateStatus("DENIED")}>
            Deny
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PendingTicketRow;