/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteComment } from '../../utils/data/commentData';
// import Link from 'next/link';

export default function CommentCard({
  commentObj, onEditClick, uid, setChange,
}) {
  const deleteThisComment = async () => {
    if (window.confirm('Delete comment?')) {
      await deleteComment(commentObj.id);
      setChange((prevState) => !prevState);
    }
  };

  console.warn(commentObj);

  return (
    <Card className={commentObj.parent !== null ? 'reply-card' : 'comment-card'}>
      <Card.Body>
        <Card.Title>{commentObj.title}</Card.Title>
        <hr />
        <p>Posted By: {commentObj.user?.username}</p>
        {commentObj.parent !== null ? (
          <div>@{commentObj.parent?.user?.username}</div>
        ) : ''}
        <p>{commentObj.content}</p>
        <hr />
        {uid === commentObj.user?.uid ? (
          <>
            <div>
              <Button onClick={onEditClick}>Edit</Button>
            </div>
            <div>
              <Button variant="danger" onClick={deleteThisComment}>Delete</Button>
            </div>
          </>
        ) : '' }
        <Button variant="secondary">Reply</Button>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
  uid: PropTypes.string.isRequired,
  onEditClick: PropTypes.func,
  setChange: PropTypes.func.isRequired,
};

CommentCard.defaultProps = {
  onEditClick: () => {},
};
