import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  user: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const testUsers = [
  { email: "demo@example.com", password: "password123" },
  { email: "test@user.com", password: "testpass" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState([...testUsers]);

  const login = (email: string, password: string): boolean => {
    const match = users.find(
      (u) => u.email === email && u.password === password
    );
    if (match) {
      setIsAuthenticated(true);
      setUser(email);
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string): boolean => {
    const exists = users.find((u) => u.email === email);
    if (exists) return false;

    setUsers((prev) => [...prev, { email, password }]);
    setIsAuthenticated(true);
    setUser(email);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, signup, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
