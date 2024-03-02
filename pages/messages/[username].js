/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserByName } from '../../utils/auth';
import { getConversation } from '../../utils/data/messageData';
import MessageCard from '../../components/cards/MessageCard';

export default function Message() {
  const { user } = useAuth();
  const router = useRouter();

  const [chat, setChat] = useState([]);
  const [receiver, setReceiver] = useState({});

  const { username } = router.query;

  const getUser = (name) => {
    getUserByName(name).then((res) => setReceiver(res));
  };

  console.warn(receiver);
  useEffect(() => {
    getUser(username);
  }, [username]);

  const getChat = (uid) => {
    const payload = { sender_uid: uid, receiver_uid: receiver.uid };
    getConversation(payload).then((res) => setChat(res));
  };

  useEffect(() => {
    getChat(user.uid);
  }, [user.uid, receiver]);

  console.warn(chat);

  return (
    <>
      <div>{chat.map((message) => (
        <MessageCard key={message.id} mesObj={message} />
      ))}
      </div>
      <button className="chat-box">hi</button>
    </>
  );
}
