/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { getUserByID } from '../../utils/auth';
import { markNotificationRead } from '../../utils/data/notificationData';
import { useNotification } from '../../utils/context/notifContext';
import { NotificationData, UserData } from '../../utils/interfaces';

interface Props {
  obj: NotificationData;
}

export default function NotificationCard({ obj }: Props) {
  const [route, setRoute] = useState<string>('');
  const { notificationCount, updateNotificationCount } = useNotification();

  // Defines URL route based upon what type of notification is rendered upon the DOM
  useEffect(() => {
    if (obj.comment) {
      setRoute(`/posts/${obj.comment.post}`);
    } else if (obj.post) {
      setRoute(`/posts/${obj.post.id}`);
    } else {
      const retrieveUserID = async () => {
        const res: any = await getUserByID(obj.message.sender);
        setRoute(`/messages/${res.username}`);
      }
      retrieveUserID();
    }
  }, [obj]);

  const handleClick = async () => {
    if (!obj.is_read) {
      const newCount = notificationCount[0] - 1;
      updateNotificationCount([newCount]);
      await markNotificationRead(obj.id);
    }
  };

  return (
    <>
      <Link passHref href={route}>
        <div className={!obj.is_read ? 'notification' : 'read-notification'} onClick={handleClick}>
          {obj.content}
          {obj.comment !== null ? (
            <div>
              <hr />
              {obj.comment?.content}
            </div>
          ) : ''}
          {obj.post !== null ? (
            <div>
              <hr />
              {obj.post?.title}
            </div>
          ) : ''}
        </div>
      </Link>
    </>
  );
}
