import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext.js';
import { createMessage } from '../utils/data/messageData';
import { UserData } from '../utils/interfaces';

interface initialState {
  content: string;
}

const initialState: initialState = {
  content: '',
};

interface Props {
  receiver: UserData;
  getChat: (uid: string) => void;
}

export interface Payload {
  id?: number;
  sender_uid: string;
  receiver_uid: string;
}

function MessageForm({ receiver, getChat }: Props) {
  const [formInput, setFormInput] = useState<initialState>(initialState);

  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Payload = { ...formInput, sender_uid: user.uid, receiver_uid: receiver.uid };
  
    await createMessage(payload);
    await getChat(user.uid)
    setFormInput(initialState);
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
