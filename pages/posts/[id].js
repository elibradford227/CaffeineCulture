import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postData';
import CommentCard from '../../components/cards/CommentCard';
import { useAuth } from '../../utils/context/authContext';

export default function SinglePost() {
  const router = useRouter();

  const post = router.query.id;

  const [postDetails, setPostDetails] = useState([]);
  const [comments, setComments] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getSinglePost(post).then((res) => {
      setPostDetails(res);
      setComments(res.comments);
    });
  }, [post]);

  return (
    <>
      <div>
        <div className="single-post">
          <h1>{postDetails.title}</h1>
          <h2>{postDetails.content}</h2>
          <h2>By: {postDetails.user?.username}</h2>
          <h2>Posted On: {postDetails.date}</h2>
          <h2>{postDetails.category?.name}</h2>
          {user.uid === postDetails.user?.uid ? (
            <Link href={`/posts/edit/${postDetails.id}`} passHref>
              <Button variant="secondary" className="order-item-button">Edit</Button>
            </Link>
          ) : ''}
        </div>
        <div className="post-comments">
          {comments.map((comment) => (
            <CommentCard key={comment.id} commentObj={comment} />
          ))}
        </div>
      </div>
    </>
  );
}
