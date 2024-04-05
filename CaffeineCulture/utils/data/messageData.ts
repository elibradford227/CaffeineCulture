import { Payload } from "../../components/MessageForm";
import { ConvoPayload } from "../../pages/profile/[username]";
import { clientCredentials } from './../client';

const getMessages = (uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/messages`, {
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

const getConversation = (payload: Payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/messages/get_conversation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve((data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUsersConversations = (id: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/conversations/${id}/get_users_conversations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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

const getSingleMessage = (message: number, uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/messages/${message}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUsersLatestMessage = (uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/messages/get_users_latest_message`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMessage = (payload: Payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/messages/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
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

const deleteMessage = (message: number) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/messages/${message}`, {
    method: 'DELETE',
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

const createMessage = (payload: Payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createConversation = (payload: ConvoPayload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getMessages,
  getConversation,
  createMessage,
  getSingleMessage,
  deleteMessage,
  updateMessage,
  getUsersConversations,
  createConversation,
  getUsersLatestMessage,
};
