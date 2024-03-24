import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/PostForm';
import { useAuth } from '../../../utils/context/authContext';
import { CommentData, PostData } from '../../../utils/interfaces';

export default function EditPost() {
  const [editItem, setEditItem] = useState<PostData>({} as PostData);
  const router = useRouter();

  const { user } = useAuth();

  const { id } = router.query;

  useEffect(() => {
    const getPost = async () => {
      const res = await getSinglePost(id, user.uid);
      setEditItem(res)
    }
    getPost();
  }, [id, user.uid]);

  return (
    <PostForm obj={editItem} />
  );
}
