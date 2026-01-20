import { TicketStatus } from "./TicketStatus";

export interface Ticket {
  id: number;
  username: string;
  price: number;
  description: string;
  status: TicketStatus;
  createdAt: string;
}