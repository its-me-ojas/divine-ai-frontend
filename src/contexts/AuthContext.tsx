import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      // TEMPORARY: Mock user data for testing
      const mockUser = JSON.parse(localStorage.getItem("mock_user") || "null");
      if (mockUser) {
        setUser(mockUser);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // TEMPORARY: Mock authentication
    const mockUser = {
      id: "mock-user-1",
      name: "Test User",
      email: email
    };
    
    const mockToken = "mock-token-" + Math.random();
    
    localStorage.setItem("auth_token", mockToken);
    localStorage.setItem("mock_user", JSON.stringify(mockUser));
    setUser(mockUser);

    // Navigate to the page they tried to visit or home
    const savedPath = sessionStorage.getItem("intended_path");
    navigate(savedPath || "/");
    sessionStorage.removeItem("intended_path");
  };

  const signUp = async (name: string, email: string, password: string) => {
    // TEMPORARY: Mock sign up
    const mockUser = {
      id: "mock-user-" + Math.random(),
      name: name,
      email: email
    };
    
    const mockToken = "mock-token-" + Math.random();
    
    localStorage.setItem("auth_token", mockToken);
    localStorage.setItem("mock_user", JSON.stringify(mockUser));
    setUser(mockUser);
    navigate("/");
  };

  const signOut = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("mock_user");
    setUser(null);
    navigate("/signin");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext; 