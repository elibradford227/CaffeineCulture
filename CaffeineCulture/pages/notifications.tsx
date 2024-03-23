import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUsersNotifications } from '../utils/data/notificationData';
import NotificationCard from '../components/cards/notificationCard';
import { NotificationData } from '../utils/interfaces';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const getNotifications = (uid: string) => {
    getUsersNotifications(uid).then((res) => setNotifications(res));
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
