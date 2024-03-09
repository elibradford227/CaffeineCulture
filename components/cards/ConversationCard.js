import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';

export default function ConversationCard({ users }) {
  const { user } = useAuth();

  let receiver = 'Unknown';

  for (let i = 0; i < users?.participants?.length; i++) {
    if (users.participants[i].username !== user.username) {
      receiver = users.participants[i].username;
    }
  }

  return (
    <>
      <div className="conversation">
        <Link passHref href={`/messages/${receiver}`}>
          <h4 className="username">{receiver}</h4>
        </Link>
      </div>
    </>
  );
}

ConversationCard.propTypes = {
  users: PropTypes.shape({
    participants: PropTypes.arrayOf(PropTypes.shape({
      username: PropTypes.string,
    })),
  }).isRequired,
};
