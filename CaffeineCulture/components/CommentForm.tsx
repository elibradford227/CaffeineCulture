import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createComment, updateComment, createReply } from '../utils/data/commentData';
import { CommentData } from '../utils/interfaces';

interface initialState {
  content: string;
}

const initialState: initialState = {
  content: '',
};


interface Props {
  obj?: CommentData;
  postId: number;
  replyId?: number;
  getPostDetails: (postId: number) => void;
  onCancelEdit?: () => void;
  handleForm?: () => void;
}

export interface Payload {
  uid: string;
  post: number;
  id?: number;
}

function CommentForm({
  obj, postId, getPostDetails, onCancelEdit, replyId, handleForm,
}: Props) {
  const [formInput, setFormInput] = useState<initialState>(initialState);

  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Payload = { ...formInput, uid: user.uid, post: postId };
    // This if block runs if a comment obj is passed to the form to update the comment
    if (obj?.id) {
      payload.id = obj.id;
      await updateComment(payload);
      await getPostDetails(postId);
      onCancelEdit();

    } else if (replyId) {
      // This else if block runs if a reply comment id is passed to the form to create a reply to a comment
      await createReply(replyId, payload)
      await getPostDetails(postId)
      handleForm();
    } else {
      // If neither a comment obj or reply id is passed to the comment form, we run this else block to create a post comment
      await createComment(payload)
      await getPostDetails(postId)
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
      {obj?.id
        ? (
          <div>
            <Button onClick={onCancelEdit}>Cancel</Button>
          </div>
        )
        : ''}

      <Button type="submit" variant="dark">{obj?.id ? 'Update' : 'Create'} Comment</Button>
    </Form>
  );
}

export default CommentForm;
