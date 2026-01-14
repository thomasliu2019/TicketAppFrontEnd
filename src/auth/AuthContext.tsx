import { createContext, useContext, useState } from "react";
import api from "../api/api";

type Role = "EMPLOYEE" | "MANAGER";

interface AuthContextType {
  username: string | null;
  role: Role | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [role, setRole] = useState<Role | null>(
    localStorage.getItem("role") as Role | null
  );

  const login = async (username: string, password: string) => {
    const res = await api.post("/login", { username, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("role", res.data.role);

    setUsername(res.data.username);
    setRole(res.data.role);

    return res.data.role;
  };

  const logout = () => {
    localStorage.clear();
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



