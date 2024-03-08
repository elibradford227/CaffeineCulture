/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { getUserByID } from '../../utils/auth';
import { markNotificationRead } from '../../utils/data/notificationData';
import { useAuth } from '../../utils/context/authContext';

export default function NotificationCard({ obj }) {
  const [route, setRoute] = useState('');

  // Defines URL route based upon what type of notification is rendered upon the DOM
  useEffect(() => {
    if (obj.comment) {
      setRoute(`/posts/${obj.comment.post}`);
    } else if (obj.post) {
      setRoute(`/posts/${obj.post.id}`);
    } else {
      getUserByID(obj.message.receiver).then((res) => {
        setRoute(`/messages/${res.username}`);
      });
    }
  }, [obj]);

  const handleClick = () => {
    if (!obj.is_read) {
      markNotificationRead(obj.id);
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

NotificationCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    is_read: PropTypes.bool,
    content: PropTypes.string,
    comment: PropTypes.shape({
      post: PropTypes.number,
      content: PropTypes.string,
    }),
    post: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    message: PropTypes.shape({
      receiver: PropTypes.number,
    }),
    user: PropTypes.shape({
      uid: PropTypes.string,
    }),
  }).isRequired,
};
