import { useState, useCallback } from 'react';
import { getSinglePost } from './data/postData';
import { getPostsComments } from './data/commentData';

const usePostDetails = (post, user) => {
  const [postDetails, setPostDetails] = useState([]);
  const [comments, setComments] = useState([]);

  const getPostDetails = useCallback(() => {
    getSinglePost(post, user.uid).then((res) => {
      setPostDetails(res);
    });
    getPostsComments(post).then((res) => setComments(res));
  }, [post, user?.uid]);

  return { postDetails, comments, getPostDetails };
};

export default usePostDetails;
