
import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
  newNotificationCount: number;
  incrementNotificationCount: () => void;
  resetNotificationCount: () => void;
}
// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Create a provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  const incrementNotificationCount = () => {
    setNewNotificationCount(prevCount => prevCount + 1);
  };

  const resetNotificationCount = () => {
    setNewNotificationCount(0);
  };

  return (
    <NotificationContext.Provider value={{ newNotificationCount, incrementNotificationCount, resetNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};


export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
