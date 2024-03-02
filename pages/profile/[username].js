/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUsersPosts } from '../../utils/data/postData';
import { getUserByName } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';
import PostCard from '../../components/cards/PostCard';

export default function Username() {
  const router = useRouter();

  const { username } = router.query;
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});

  const getUser = (name) => {
    getUserByName(name).then((res) => setProfileUser(res));
  };

  const getAllPosts = (uid) => {
    getUsersPosts(uid).then((res) => setPosts(res));
  };

  useEffect(() => {
    getUser(username);
    getAllPosts(profileUser.uid);
  }, [profileUser.uid, username]);

  return (
    <div>
      <div id="profile">
        {/* <img alt="" src={user.fbUser.photoURL} id="profilePhoto" /> */}
        <h1>{profileUser.username}</h1>
        <p>{profileUser.bio}</p>
        {user.uid === profileUser.uid ? '' : (
          <Link passHref href={`/messages/${profileUser.username}`}>
            <Button>Message</Button>
          </Link>
        )}
      </div>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} />
        ))}
      </div>
    </div>
  );
}
