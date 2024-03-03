import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function ConversationCard({ users }) {
  return (
    <>
      <div className="conversation">
        <Link passHref href={`/messages/${users.participants[1].username}`}>
          <h4>{users.participants[1].username}</h4>
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
