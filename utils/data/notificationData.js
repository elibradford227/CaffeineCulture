const getUsersNotifications = (uid) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/notifications/get_users_notifications', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const markNotificationRead = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/notifications/${id}/mark_notification_read`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getUsersNotifications,
  markNotificationRead,
};
