import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/PostForm';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  return (
    <PostForm obj={editItem} />
  );
}
