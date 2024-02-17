import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSinglePost, deletePost } from '../../utils/data/postData';
import CommentCard from '../../components/cards/CommentCard';
import { useAuth } from '../../utils/context/authContext';
import CommentForm from '../../components/CommentForm';

export default function SinglePost() {
  const router = useRouter();

  const post = router.query.id;

  const [postDetails, setPostDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [editModeCommentId, setEditModeCommentId] = useState(null);
  const [change, setChange] = useState(false);

  const handleEditClick = (commentId) => {
    setEditModeCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditModeCommentId(null);
  };

  const deleteThisPost = async () => {
    if (window.confirm('Delete post?')) {
      await deletePost(postDetails.id);
      router.push('/');
    }
  };

  const { user } = useAuth();

  const getPostDetails = useCallback(() => {
    getSinglePost(post).then((res) => {
      setPostDetails(res);
      setComments(res.comments);
    });
  }, [post]);

  console.warn('loop');

  useEffect(() => {
    getPostDetails();
  }, [getPostDetails, change]);

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
            <>
              <Link href={`/posts/edit/${postDetails.id}`} passHref>
                <Button variant="secondary" className="order-item-button">Edit</Button>
              </Link>
              <Button variant="danger" className="order-item-button" onClick={deleteThisPost}>Delete</Button>
            </>
          ) : ''}
        </div>
        <CommentForm getPostDetails={getPostDetails} postId={postDetails.id} />
        <div className="post-comments">
          {/* {comments.map((comment) => (
            <CommentCard key={comment.id} commentObj={comment} />
          ))} */}
          {comments.map((comment) => (
            editModeCommentId === comment.id ? (
              <CommentForm key={comment.id} obj={comment} onCancelEdit={handleCancelEdit} getPostDetails={getPostDetails} postId={postDetails.id} />
            ) : (
              <CommentCard key={comment.id} commentObj={comment} onEditClick={() => handleEditClick(comment.id)} uid={user.uid} setChange={setChange} />
            )
          ))}
        </div>
      </div>
    </>
  );
}
