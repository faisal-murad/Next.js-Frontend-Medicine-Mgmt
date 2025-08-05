'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from "next/navigation";
import type { LoginResponse } from "../../types/LoginResponse";

export const AuthContext = createContext({});

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
      // } else {
      //   router.replace('/login')
      //   return;
    }

    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<LoginResponse> => {



    try {
      setLoading(true);
      const response = await axiosInstance.post('/auth/login', {
        email,
        password: password
      });

      const { token, ...userData } = response.data;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setUser(userData);
      router.push('/dashboard'); // Redirect to dashboard after login


      return { success: true, user: userData };
    } catch (error: unknown) {
      console.error("Login error:", error);

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        return { success: false, error: err.response?.data?.message || "Login failed" };
      }
      
    return { success: false, error: "Login failed" };
    } finally {
      setLoading(false);
    }
  };
 

  const value = {
    user,
    loading,
    login, 
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 