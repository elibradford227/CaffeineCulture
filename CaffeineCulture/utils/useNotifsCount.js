/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { returnNotificationCount } from './data/notificationData';

const useNotifsCount = (user) => {
  const [count, setCount] = useState(0);
  const [notifRead, setNotifRead] = useState(false);

  const handleNotificationRead = async () => {
    setNotifRead((prev) => (!prev));
    await returnNotificationCount(user.uid).then((res) => setCount(res));
  };

  const getNotifs = useCallback(() => {
    returnNotificationCount(user.uid).then((res) => setCount(res));
    console.warn('the hooks getNotifs func ran');
  }, [user.uid]);

  useEffect(() => {
    getNotifs();
  }, [notifRead, getNotifs]);

  return { count, handleNotificationRead, getNotifs };
};

export default useNotifsCount;
