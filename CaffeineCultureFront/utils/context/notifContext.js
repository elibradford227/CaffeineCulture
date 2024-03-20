import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const NotifContext = createContext();

NotifContext.displayName = 'NotifContext';

const NotifProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const updateNotificationCount = (count) => {
    setNotificationCount(count);
  };

  return (
    <NotifContext.Provider value={{ notificationCount, updateNotificationCount }}>
      {children}
    </NotifContext.Provider>
  );
};

NotifProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const NotifConsumer = NotifContext.Consumer;

const useNotification = () => useContext(NotifContext);

export { NotifProvider, useNotification, NotifConsumer };
