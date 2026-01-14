import { Ticket } from "../models/Ticket";

const TicketList = ({ tickets }: { tickets: Ticket[] }) => (
  <ul>
    {tickets.map(t => (
      <li key={t.id}>
        ${t.price} - {t.description} ({t.status})
      </li>
    ))}
  </ul>
);

export default TicketList;


