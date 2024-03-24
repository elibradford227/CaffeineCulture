import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotifContext {
  notificationCount: number;
  updateNotificationCount: (count: number) => void;
}

const NotifContext = createContext<NotifContext | undefined>(undefined);

NotifContext.displayName = 'NotifContext' as string;

interface Props {
  children: ReactNode;
}

const NotifProvider = ({ children }: Props) => {
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const updateNotificationCount = (count: number) => {
    setNotificationCount(count);
  };

  return (
    <NotifContext.Provider value={{ notificationCount, updateNotificationCount }}>
      {children}
    </NotifContext.Provider>
  );
};

const NotifConsumer = NotifContext.Consumer;

const useNotification = () => useContext(NotifContext);

export { NotifProvider, useNotification, NotifConsumer };
