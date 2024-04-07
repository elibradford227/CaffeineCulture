/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUsersPosts } from '../../utils/data/postData';
import { getUserByName } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext.js';
import Loading from '../../components/Loading';
import PostCard from '../../components/cards/PostCard';
import { createConversation } from '../../utils/data/messageData';
import { UserData, PostData } from '../../utils/interfaces';

export interface ConvoPayload {
  one_uid: string;
  two_uid: string;
}

export default function Username() {
  const router = useRouter();

  const { username } = router.query as { username: string };
  const { user } = useAuth();

  const [posts, setPosts] = useState<PostData[]>([]);
  const [profileUser, setProfileUser] = useState<UserData>({} as UserData);

  const getUser = async (name: string) => {
    const res = await getUserByName(name);
    setProfileUser(res as UserData);
  };

  const getAllPosts = async (uid: string) => {
    const res = await getUsersPosts(uid);
    setPosts(res as PostData[]);
  };

  // Handles creation of new conversation thread for accessing chat from messages list. Returns error if conversation already exists
  const handleCreate = async () => {
    const payload: ConvoPayload = { one_uid: user.uid, two_uid: profileUser.uid };
    await createConversation(payload);
  };

  useEffect(() => {
    getUser(username);
    if (profileUser.uid && username) {
      getAllPosts(profileUser.uid);
    }
  }, [profileUser.uid, username]);

  return (
    <div>
      <div id="profile">
        <h1>{profileUser.username}</h1>
        <p>{profileUser.bio}</p>
        {user.uid === profileUser.uid ? '' : (
          <Link passHref href={`/messages/${profileUser.username}`}>
            <Button onClick={handleCreate}>Message</Button>
          </Link>
        )}
      </div>
      <div
        className="justify-content-center align-content-center"
        style={{
          padding: '20px',
          maxWidth: '400px',
        }}
      >
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} />
        ))}
      </div>
    </div>
  );
}
