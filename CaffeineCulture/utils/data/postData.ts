import { Payload } from "../../components/PostForm";
import { clientCredentials } from "../client";

const getPosts = (uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
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

const getUsersPosts = (uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/get_user_posts`, {
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

const searchPosts = (search: string, uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/search_posts?search=${search}`, {
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

const getSinglePost = (post: number, uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${post}`, {
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

const updatePost = (payload: Payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${payload.id}`, {
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

const deletePost = (Post: number) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${Post}`, {
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

const createPost = (payload: Payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
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
  getPosts,
  getUsersPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
  searchPosts,
};
