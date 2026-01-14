import api from "../api/api";
import { Ticket } from "../models/Ticket";

const PendingTicketRow = ({ ticket }: { ticket: Ticket }) => {
  const approve = async () => {
    await api.patch(`/tickets/update/${ticket.id}/APPROVED`);
    window.location.reload();
  };

  const deny = async () => {
    await api.patch(`/tickets/update/${ticket.id}/DENIED`);
    window.location.reload();
  };

  return (
    <div>
      ${ticket.price} - {ticket.description}
      <button onClick={approve}>Approve</button>
      <button onClick={deny}>Deny</button>
    </div>
  );
};

export default PendingTicketRow;
