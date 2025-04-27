import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: number;
  email: string;
  full_name?: string | null;
  preferred_language?: string;
  verse_theme?: string;
  streak: number;
  last_checked?: string | null;
  created_at?: string; // Date when the user account was created
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
  const { toast } = useToast();

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

      // Get current user from API
      const userData = await api.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Auth check failed:", error);
      // If API call fails, clear the token
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      
      // Save token
      localStorage.setItem("auth_token", response.access_token);
      
      // Get user data
      const userData = await api.getCurrentUser();
      setUser(userData);
      
      // Navigate to the page they tried to visit or home
      const savedPath = sessionStorage.getItem("intended_path");
      navigate(savedPath || "/");
      sessionStorage.removeItem("intended_path");
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Login failed:", error);
      
      let errorMessage = "Invalid email or password. Please try again.";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else {
          errorMessage = `Server error (${error.response.status}). Please try again later.`;
        }
      } else if (error.message && error.message.includes("Network Error")) {
        errorMessage = "Cannot connect to server. Please check your connection.";
      }
      
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      // Now we can pass the name to the backend
      console.log(`Attempting to register user: ${email} (name: ${name})`);
      
      const userData = await api.register(email, password, name);
      console.log("Registration successful:", userData);
      
      // After registration, log them in
      try {
        const loginResponse = await api.login(email, password);
        console.log("Login after registration successful:", loginResponse);
        
        localStorage.setItem("auth_token", loginResponse.access_token);
        
        // Get user data
        const currentUser = await api.getCurrentUser();
        console.log("Got user data after registration:", currentUser);
        
        setUser(currentUser);
        
        navigate("/");
        
        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
          duration: 3000,
        });
      } catch (loginError: any) {
        console.error("Login after registration failed:", loginError);
        toast({
          title: "Account created but login failed",
          description: "Your account was created but we couldn't log you in. Please try logging in manually.",
          variant: "destructive",
          duration: 5000,
        });
        navigate("/signin");
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      
      let errorMessage = "Failed to create account. Please try again.";
      if (error.response) {
        console.error("Response error data:", error.response.data);
        if (error.response.status === 400 && error.response.data.detail === "Email already registered") {
          errorMessage = "This email is already registered. Please try another email or sign in.";
        } else if (error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else {
          errorMessage = `Server error (${error.response.status}). Please try again later.`;
        }
      } else if (error.message && error.message.includes("Network Error")) {
        errorMessage = "Cannot connect to server. Please check your connection.";
      }
      
      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    navigate("/signin");
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
      duration: 3000,
    });
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