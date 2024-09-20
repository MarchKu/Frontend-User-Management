import axios from "axios";
import React, { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface AuthContextType {
  tokenData: userTokenType;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface userTokenType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export interface loginData {
  username: string;
  password: string;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tokenData, setTokenData] = useState<userTokenType>({});

  const navigate = useNavigate();

  const login = async (data: loginData) => {
    try {
      setIsLoading(true);
      const result = await axios.post("http://localhost:4000/auth/login", data);
      const token: string = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken: userTokenType = jwtDecode(token);
      setTokenData(userDataFromToken);
      localStorage.setItem("tokenData", JSON.stringify(userDataFromToken));
      toast.success(
        `Hello ${userDataFromToken.firstName} ${userDataFromToken.lastName}`
      );
      setIsLoading(false);
      setIsError(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      setIsError(true);
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenData");
    setTokenData({});
    navigate("/login");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ tokenData, login, logout, isAuthenticated, isLoading, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
