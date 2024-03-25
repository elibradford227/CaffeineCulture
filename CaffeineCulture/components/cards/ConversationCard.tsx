import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext.js';
import { ConversationData } from '../../utils/interfaces';

interface Props {
  users: ConversationData;
}

export default function ConversationCard({ users }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  const { username } = router.query as { username: string };

  let receiver: string = 'Unknown';

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
