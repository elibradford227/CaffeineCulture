import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/PostForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { user } = useAuth();

  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id, user.uid).then(setEditItem);
  }, [id]);

  return (
    <PostForm obj={editItem} />
  );
}
