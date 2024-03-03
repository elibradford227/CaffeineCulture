/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUsersPosts } from '../../utils/data/postData';
import { getUserByName } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';
import PostCard from '../../components/cards/PostCard';
import { createConversation } from '../../utils/data/messageData';

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

  // Handles creation of new conversation thread for accessing chat from messages list. Returns error if conversation already exists
  const handleCreate = () => {
    const payload = { one_uid: user.id, two_uid: profileUser.uid };
    createConversation(payload);
  };

  console.warn(profileUser);

  useEffect(() => {
    getUser(username);
    if (profileUser.uid && username) {
      getAllPosts(profileUser.uid);
    }
  }, [profileUser.uid, username]);

  return (
    <div>
      <div id="profile">
        {/* <img alt="" src={user.fbUser.photoURL} id="profilePhoto" /> */}
        <h1>{profileUser.username}</h1>
        <p>{profileUser.bio}</p>
        {user.uid === profileUser.uid ? '' : (
          <Link passHref href={`/messages/${profileUser.username}`}>
            <Button onClick={handleCreate}>Message</Button>
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
