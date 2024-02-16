import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function PostCard({ postObj }) {
  return (
    <Card style={{ width: '20rem', marginLeft: '1.25em' }} className="PostCard">
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <hr />
        <p>{postObj.content}</p>
        <hr />
        <Link href={`/posts/${postObj.id}`} passHref>
          <Button variant="primary" className="">Comments</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};
