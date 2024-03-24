import React from 'react';
import { useAuth } from '../../utils/context/authContext';
import { UserData } from '../../utils/interfaces';
import { MessageData } from '../../utils/interfaces';

interface Props {
  mesObj: MessageData;
}

export default function MessageCard({ mesObj }: Props) {
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
