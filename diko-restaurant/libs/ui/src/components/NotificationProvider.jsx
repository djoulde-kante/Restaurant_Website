import React, { createContext, useContext } from 'react';
import { useNotification } from '@repo/utils';
import Toast from './Toast';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notification = useNotification();

  return (
    <NotificationContext.Provider value={notification}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notification.notifications.map((notif) => (
          <Toast
            key={notif.id}
            message={notif.message}
            type={notif.type}
            onClose={() => notification.removeNotification(notif.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext doit être utilisé dans un NotificationProvider');
  }
  return context;
};