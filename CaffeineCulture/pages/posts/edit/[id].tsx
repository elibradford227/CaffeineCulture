import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/PostForm';
import { useAuth } from '../../../utils/context/authContext.js';
import { CommentData, PostData } from '../../../utils/interfaces';

export default function EditPost() {
  const [editItem, setEditItem] = useState<PostData>({} as PostData);
  const router = useRouter();

  const { user } = useAuth();

  const { id } = router.query;
  const post: number = parseInt(id as string, 10);

  console.warn(post)

  useEffect(() => {
    const getPost = async () => {
      const res = await getSinglePost(post, user.uid);
      setEditItem(res as PostData)
    }
    getPost();
  }, [id, user.uid]);

  return (
    <PostForm obj={editItem} />
  );
}
