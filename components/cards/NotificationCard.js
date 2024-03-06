/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserByID } from '../../utils/auth';
// import PropTypes from 'prop-types';

export default function NotificationCard({ obj }) {
  const [route, setRoute] = useState('');

  useEffect(() => {
    if (obj.comment) {
      setRoute(`/posts/${obj.comment.post}`);
    } else if (obj.post) {
      setRoute(`/posts/${obj.post.id}`);
    } else {
      getUserByID(obj.message.receiver).then((res) => {
        console.warn(res);
        setRoute(`/messages/${res.username}`);
      });
    }
  }, [obj]);

  console.warn(obj);

  return (
    <>
      <Link passHref href={route}>
        <div className="notification">
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
