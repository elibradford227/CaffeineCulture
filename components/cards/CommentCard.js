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

  return (
    <Card style={{ width: '20rem', marginLeft: '1.25em' }} className="CommentCard">
      <Card.Body>
        <Card.Title>{commentObj.title}</Card.Title>
        <hr />
        <p>Posted By: {commentObj.user?.username}</p>
        <p>{commentObj.content}</p>
        <hr />
        {/* <Link href={`/posts/${commentObj.id}`} passHref>
          <Button variant="primary" className="">Comments</Button>
        </Link> */}
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
