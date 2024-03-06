import { useEffect, useState } from 'react';
import NotificationCard from '../components/cards/NotificationCard';
import { useAuth } from '../utils/context/authContext';
import { getUsersNotifications } from '../utils/data/notificationData';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const getNotifications = (uid) => {
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
