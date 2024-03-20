import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createLike, deleteLike } from '../utils/data/likeData';
import { useAuth } from '../utils/context/authContext';

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
        <span style={{ marginRight: '5px' }}>{likes}</span>
        {hasLiked ? (
          <FontAwesomeIcon className="fa-icon" icon={solidHeart} onClick={handleDeleteLike} style={{ color: '#77BB3F' }} />
        ) : (
          <FontAwesomeIcon icon={regularHeart} onClick={handleCreateLike} />
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
