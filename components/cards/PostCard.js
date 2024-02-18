import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Like from '../Like';

export default function PostCard({ postObj }) {
  return (
    <Card style={{ width: '20rem', marginLeft: '1.25em' }}>
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <hr />
        <p>{postObj.content}</p>
        <p>{postObj.category?.name}</p>
        <hr />
        <p>Likes: {postObj.like_count}</p>
        <Link href={`/posts/${postObj.id}`} passHref>
          <Button variant="primary" className="">Comments</Button>
        </Link>
        <Like liked={postObj.liked} />
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
    liked: PropTypes.bool,
  }).isRequired,
};
