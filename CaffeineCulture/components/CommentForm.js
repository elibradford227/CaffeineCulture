import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createComment, updateComment, createReply } from '../utils/data/commentData';

const initialState = {
  content: '',
};

function CommentForm({
  obj, postId, getPostDetails, onCancelEdit, replyId, handleForm,
}) {
  const [formInput, setFormInput] = useState(initialState);

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
    // This if block runs if a comment obj is passed to the form to update the comment
    if (obj.id) {
      payload.id = obj.id;
      updateComment(payload).then(() => {
        getPostDetails(postId);
        onCancelEdit();
      });
    } else if (replyId) {
      // This else if block runs if a reply comment id is passed to the form to create a reply to a comment
      createReply(replyId, payload).then(() => {
        getPostDetails(postId);
        handleForm();
      });
    } else {
      // If neither a comment obj or reply id is passed to the comment form, we run this else block to create a post comment
      createComment(payload).then(() => getPostDetails(postId));
      setFormInput(initialState);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>

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
      {obj.id
        ? (
          <div>
            <Button onClick={onCancelEdit}>Cancel</Button>
          </div>
        )
        : ''}

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
  replyId: PropTypes.number,
  postId: PropTypes.number,
  getPostDetails: PropTypes.func,
  onCancelEdit: PropTypes.func,
  handleForm: PropTypes.func,
};

CommentForm.defaultProps = {
  obj: initialState,
  postId: 0,
  replyId: 0,
  getPostDetails: null,
  onCancelEdit: () => {},
  handleForm: () => {},
};

export default CommentForm;
