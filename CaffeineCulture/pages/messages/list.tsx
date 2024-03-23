import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUsersConversations } from '../../utils/data/messageData';
import ConversationCard from '../../components/cards/ConversationCard';
import { ConversationData } from '../../utils/interfaces';

export default function ConversationList() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationData[]>([]);

  const getConversations = (id: string) => {
    getUsersConversations(id).then((res) => setConversations(res));
  };

  useEffect(() => {
    getConversations(user.id);
  }, [user.id]);

  return (
    <div className="conversations-list">{conversations.map((users) => (
      <ConversationCard key={users.id} users={users} />
    ))}
    </div>
  );
}
