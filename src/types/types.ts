export interface Employee {
  id: number;
  username: string;
  password: string;
  role: "EMPLOYEE" | "MANAGER";
}

export interface Ticket {
  id: string;
  username: string;
  price: number;
  description: string;
  status: "PENDING" | "APPROVED" | "DENIED";
  createdAt: string;
}