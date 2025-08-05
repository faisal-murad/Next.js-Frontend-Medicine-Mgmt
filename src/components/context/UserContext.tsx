import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    preferences: {},
    settings: {},
    notifications: []
  });

  const updateProfile = (updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const addNotification = (notification) => {
    setUserProfile(prev => ({
      ...prev,
      notifications: [...prev.notifications, notification]
    }));
  };

  const value = {
    userProfile,
    updateProfile,
    addNotification
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 