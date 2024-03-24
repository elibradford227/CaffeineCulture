import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

interface UserInfo {
  bio: string;
  username: string;
}

const checkUser = (uid: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getUserByName = (username: string) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/get_user_by_name`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      username,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve((data));
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

const getUserByID = (id: number) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/get_user_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${id}`,
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const registerUser = (userInfo: UserInfo) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
  getUserByName,
  getUserByID,
};
