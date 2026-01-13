import React, { createContext, useState, ReactNode } from "react";
import { Employee } from "../types/types";

interface AuthContextType {
  employee: Employee | null;
  setEmployee: (employee: Employee | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  employee: null,
  setEmployee: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [employee, setEmployee] = useState<Employee | null>(
    JSON.parse(localStorage.getItem("employee") || "null")
  );

  return (
    <AuthContext.Provider value={{ employee, setEmployee}}>
      {children}
    </AuthContext.Provider>
  );
};