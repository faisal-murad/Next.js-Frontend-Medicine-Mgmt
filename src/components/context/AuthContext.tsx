'use client'

import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from "next/navigation";

export const AuthContext = createContext({});

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
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
  const login = async (email: string, password: string) => {



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
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, error: error.response?.data?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Register function
  const register = async (userData: any) => {
    try {
      setLoading(true);
      // You can implement registration logic here
      // For now, we'll simulate a successful registration
      const mockUser = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      } as any;

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      return { success: true, user: mockUser };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 