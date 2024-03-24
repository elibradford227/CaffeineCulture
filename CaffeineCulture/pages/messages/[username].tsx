import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserByName } from '../../utils/auth';
import { getConversation } from '../../utils/data/messageData';
import MessageCard from '../../components/cards/MessageCard';
import MessageForm from '../../components/MessageForm';
import ConversationList from './list';
import { UserData, MessageData } from '../../utils/interfaces';

interface Payload {
  sender_uid: string;
  receiver_uid: string;
}

export default function Message() {
  const { user } = useAuth();
  const router = useRouter();

  const [chat, setChat] = useState<MessageData[]>([]);
  const [receiver, setReceiver] = useState<UserData>({} as UserData);

  const { username } = router.query as { username: string };

  const getUser = async (name: string) => {
    const res = await getUserByName(name);
    setReceiver(res);
  };

  useEffect(() => {
    getUser(username);
  }, [username]);

  const getChat = async (uid: string) => {
    if (receiver.uid) {
      const payload: Payload = { sender_uid: uid, receiver_uid: receiver.uid };
      const res = await getConversation(payload);
      setChat(res)
    }
  };

  useEffect(() => {
    if (user.uid && receiver) {
      getChat(user.uid);
    }
  }, [user.uid, receiver]);

  return (
    <>
      <div className="messages-page">
        <ConversationList />
        <div className="message-container">
          {chat.length === 0 ? (
            <h2>No messages to display</h2>
          ) : (
            chat.map((message) => (
              <MessageCard key={message.id} mesObj={message} />
            ))
          ) }
          <MessageForm receiver={receiver} getChat={getChat} />
        </div>
      </div>
    </>
  );
}
