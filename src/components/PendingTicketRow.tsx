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


  return (
    <div>
      ${ticket.price} - {ticket.description}
      <button type="button" onClick={() => updateStatus("APPROVED")}>
        Approve
      </button>
      <button type="button" onClick={() => updateStatus("DENIED")}>
        Deny
      </button>
    </div>
  );
};

export default PendingTicketRow;
