const getLikes = (uid) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/likes', {
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

const getSingleLike = (Like) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/likes/${Like}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateLike = (payload) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/likes/${payload.id}`, {
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

const deleteLike = (payload) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/likes/delete_like', {
    method: 'DELETE',
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

const createLike = (payload) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/likes', {
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
  getLikes,
  createLike,
  getSingleLike,
  deleteLike,
  updateLike,
};
