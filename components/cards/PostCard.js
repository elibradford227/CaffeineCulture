import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Like from '../Like';

export default function PostCard({ postObj }) {
  return (
    <Card style={{
      width: '40rem', marginLeft: '0px', marginBottom: '20px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
    >
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <Link passHref href={`/profile/${postObj.user?.username}`}>
          <p className="username">{postObj.user?.username}</p>
        </Link>
        <hr />
        <p>{postObj.content}</p>
        <p>{postObj.category?.name}</p>
        <hr />
        <div className="post-card-footer">
          <Like postId={postObj.id} liked={postObj.liked} likeCount={(postObj.like_count)} />
          <Link href={`/posts/${postObj.id}`} passHref>
            <Button variant="primary" className="signout-btn">Comments</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    like_count: PropTypes.number,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    liked: PropTypes.bool,
  }).isRequired,
};
