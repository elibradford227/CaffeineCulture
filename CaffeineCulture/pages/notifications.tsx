import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext.js';
import { getUsersNotifications } from '../utils/data/notificationData';
import NotificationCard from '../components/cards/NotificationCard';
import { NotificationData } from '../utils/interfaces';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const getNotifications = async (uid: string) => {
    const res = await getUsersNotifications(uid);
    setNotifications(res as NotificationData[])
  };

  useEffect(() => {
    getNotifications(user.uid);
  }, [user.uid]);

  return (
    <div>{notifications.map((notif) => (
      <NotificationCard key={notif.id} obj={notif} />
    ))}
    </div>
  );
}
