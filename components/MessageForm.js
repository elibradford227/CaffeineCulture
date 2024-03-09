import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createMessage } from '../utils/data/messageData';

const initialState = {
  content: '',
};

function MessageForm({ receiver, getChat }) {
  const [formInput, setFormInput] = useState(initialState);

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, sender_uid: user.uid, receiver_uid: receiver.uid };
    createMessage(payload).then(() => {
      getChat(user.uid);
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="chat-box">

      <FloatingLabel controlId="floatingInput" label="Message" className="mb-2">
        <Form.Control
          as="textarea"
          placeholder="Send Message"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit" variant="dark">Send</Button>
    </Form>
  );
}

export default MessageForm;

MessageForm.propTypes = {
  receiver: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  getChat: PropTypes.func.isRequired,
};
