import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

type Role = "EMPLOYEE" | "MANAGER";

interface AuthContextType {
  username: string | null;
  role: Role | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<Role>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role") as Role | null;
    if (storedUsername && storedRole) {
      setUsername(storedUsername);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = async (usernameInput: string, password: string) => {
    const res = await api.post("/login", { username: usernameInput, password });

    // Save token and user info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("role", res.data.role);

    // Update state
    setUsername(res.data.username);
    setRole(res.data.role);

    // Redirect immediately based on role
    if (res.data.role === "MANAGER") navigate("/manager");
    else navigate("/employee");

    return res.data.role;
  };

  const logout = () => {
    localStorage.clear();
    setUsername(null);
    setRole(null);
    navigate("/"); // back to welcome page
  };

  return (
    <AuthContext.Provider value={{ username, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




