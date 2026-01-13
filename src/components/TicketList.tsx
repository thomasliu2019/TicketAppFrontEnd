import { Ticket } from "../types/types";

export const TicketList = ({ tickets }: { tickets: Ticket[] }) => (
  <div>
    <h3>Tickets</h3>
    <ul>
      {tickets.map((t) => (
        <li key={t.id}>
          {t.description} - ${t.price} - {t.status} - {new Date(t.createdAt).toLocaleString()}
        </li>
      ))}
    </ul>
  </div>
);
