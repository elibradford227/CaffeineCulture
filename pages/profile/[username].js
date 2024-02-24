/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUsersPosts } from '../../utils/data/postData';
import { getUserByName } from '../../utils/auth';
// import { useAuth } from '../../utils/context/authContext';
import PostCard from '../../components/cards/PostCard';

export default function Username() {
  const router = useRouter();

  const { username } = router.query;

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  console.warn(user);

  const getAllPosts = (uid) => {
    getUsersPosts(uid).then((res) => setPosts(res));
  };

  const getUser = (name) => {
    getUserByName(name).then((res) => setUser(res));
  };

  useEffect(() => {
    getUser(username);
    getAllPosts(user.uid);
  }, [user.uid, username]);

  return (
    <div>
      <div id="profile">
        {/* <img alt="" src={user.fbUser.photoURL} id="profilePhoto" /> */}
        <h1>{user.username}</h1>
        <p>{user.bio}</p>
      </div>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} />
        ))}
      </div>
    </div>
  );
}
