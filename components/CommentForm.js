import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createComment, updateComment } from '../utils/data/commentData';

const initialState = {
  content: '',
};

function CommentForm({ obj, postId, getPostDetails }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid, post: postId };
    if (obj.id) {
      updateComment(payload).then(() => router.push(`/posts/${obj.id}`));
    } else {
      createComment(payload).then(() => getPostDetails(postId));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2> */}

      <FloatingLabel controlId="floatingInput" label="Comment" className="mb-3">
        <Form.Control
          as="textarea"
          style={{ height: '200px' }}
          placeholder="Write a comment"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" variant="dark">{obj.id ? 'Update' : 'Create'} Comment</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.number,
    id: PropTypes.number,
  }),
  postId: PropTypes.number,
  getPostDetails: PropTypes.func,
};

CommentForm.defaultProps = {
  obj: initialState,
  postId: 0,
  getPostDetails: null,
};

export default CommentForm;
