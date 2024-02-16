import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';
// import { Button } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postData';
import CommentCard from '../../components/cards/CommentCard';

export default function SinglePost() {
  const router = useRouter();

  const post = router.query.id;

  const [postDetails, setPostDetails] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getSinglePost(post).then((res) => {
      setPostDetails(res);
      setComments(res.comments);
    });
  }, [post]);

  // postDetails.comments?.forEach((c) => {
  //   console.warn(c);
  // });
  console.warn(comments);

  return (
    <>
      <div>
        <div className="single-post">
          <h1>{postDetails.title}</h1>
          <h2>{postDetails.content}</h2>
          <h2>By: {postDetails.user?.username}</h2>
          <h2>Posted On: {postDetails.date}</h2>
        </div>
        <div className="post-comments">
          {comments.map((comment) => (
            <CommentCard commentObj={comment} />
          ))}
        </div>
      </div>
    </>
  );
}
