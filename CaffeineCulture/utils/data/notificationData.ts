import { clientCredentials } from "../client";

const getUsersNotifications = (uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/notifications/get_users_notifications`, {
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

const returnNotificationCount = (uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/notifications/return_notification_count`, {
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

const markNotificationRead = (id: number) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/notifications/${id}/mark_notification_read`, {
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
  returnNotificationCount,
};
