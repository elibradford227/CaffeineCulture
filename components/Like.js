import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export default function Like({ liked }) {
  return (
    <>
      <div>
        {liked ? (
          <Button variant="primary">Unlike</Button>
        ) : (
          <Button variant="primary">Like</Button>
        )}
      </div>
    </>
  );
}

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
};
