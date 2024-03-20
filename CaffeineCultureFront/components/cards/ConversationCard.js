import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';

export default function ConversationCard({ users }) {
  const { user } = useAuth();
  const router = useRouter();

  const { username } = router.query;

  console.warn(username);

  let receiver = 'Unknown';

  for (let i = 0; i < users?.participants?.length; i++) {
    if (users.participants[i].username !== user.username) {
      receiver = users.participants[i].username;
    }
  }

  return (
    <>
      <div className={username === receiver ? 'conversation-current' : 'conversation'}>
        <Link passHref href={`/messages/${receiver}`}>
          <h6 className="username">{receiver}</h6>
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
