import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { UserData } from '../utils/interfaces';

interface Props {
  user: UserData;
  updateUser: (uid: string) => void;
}

function RegisterForm({ user, updateUser }: Props) {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    uid: user.uid,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(formData)
    updateUser(user.uid)
  };

  return (
    <Form onSubmit={handleSubmit} className="register">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Username</Form.Label>
        <Form.Control as="input" name="username" required placeholder="Enter your username" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Label>Enter Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
