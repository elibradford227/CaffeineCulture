import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createLike, deleteLike } from '../utils/data/likeData';
import { useAuth } from '../utils/context/authContext.js';

interface Props {
  postId: number;
  liked: boolean;
  likeCount: number;
}

export interface Payload {
  uid: string;
  post: number;
}

export default function Like({ postId, liked, likeCount }: Props) {
  const [hasLiked, setHasLiked] = useState<boolean>(liked);
  const [likes, setLikes] = useState<number>(likeCount);

  useEffect(() => {
    setHasLiked(liked);
    setLikes(likeCount);
  }, [liked, likeCount]);

  const { user } = useAuth();

  const handleCreateLike = async () => {
    try {
      setHasLiked(true);

      setLikes((prevState) => prevState + 1);

      const payload: Payload = { uid: user.uid, post: postId };
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
