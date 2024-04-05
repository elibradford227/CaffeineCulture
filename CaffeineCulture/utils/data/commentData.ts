import { Payload } from "../../components/CommentForm";
import { clientCredentials } from "../client";

const getComments = (uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`, {
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

const getPostsComments = (id: number) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}/get_single_post_comments`, {
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

const getSingleComment = (Comment: number) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${Comment}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateComment = (payload: Payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${payload.id}`, {
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

const deleteComment = (Comment: number) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${Comment}`, {
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

const createComment = (payload: Payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`, {
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

const createReply = (id: number, payload: Payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}/create_reply`, {
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
  getComments,
  getPostsComments,
  createComment,
  getSingleComment,
  deleteComment,
  updateComment,
  createReply,
};
