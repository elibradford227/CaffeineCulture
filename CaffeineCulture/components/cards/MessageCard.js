import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
export default function MessageCard({ mesObj }) {
  const { user } = useAuth();

  return (
    <>
      <div className={user.username === mesObj.sender.username ? 'user-message' : 'message'}>
        {mesObj.sender.username}
        <br />
        {mesObj.content}
      </div>
    </>
  );
}

MessageCard.propTypes = {
  mesObj: PropTypes.shape({
    content: PropTypes.string,
    sender: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};
