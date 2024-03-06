import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../utils/context/authContext';
import { createLike, deleteLike } from '../utils/data/likeData';

export default function Like({ postId, liked, likeCount }) {
  const [hasLiked, setHasLiked] = useState(liked);
  const [likes, setLikes] = useState(likeCount);

  useEffect(() => {
    setHasLiked(liked);
    setLikes(likeCount);
  }, [liked, likeCount]);

  const { user } = useAuth();

  const handleCreateLike = async () => {
    try {
      setHasLiked(true);

      setLikes((prevState) => prevState + 1);

      const payload = { uid: user.uid, post: postId };
      await createLike(payload);
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const handleDeleteLike = async () => {
    try {
      setHasLiked(false);

      setLikes((prevState) => prevState - 1);

      const payload = { uid: user.uid, post: postId };
      await deleteLike(payload);
    } catch (error) {
      console.error('Error unliking post', error);
    }
  };

  return (
    <>
      <div>
        Likes: {likes}
        {hasLiked ? (
          <Button variant="primary" onClick={handleDeleteLike}>Unlike</Button>
        ) : (
          <Button variant="primary" onClick={handleCreateLike}>Like</Button>
        )}
      </div>
    </>
  );
}

Like.propTypes = {
  postId: PropTypes.number,
  liked: PropTypes.bool,
  likeCount: PropTypes.number,
};

Like.defaultProps = {
  postId: 1,
  liked: false,
  likeCount: 0,
};
