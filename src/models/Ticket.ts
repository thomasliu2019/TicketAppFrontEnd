export interface Ticket {
  id: number;
  price: number;
  description: string;
  status: "PENDING" | "APPROVED" | "DENIED";
  createdAt: string;
}