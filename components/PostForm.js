import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createPost, updatePost } from '../utils/data/postData';
import getCategories from '../utils/data/categoryData';

const initialState = {
  title: '',
  content: '',
  category: 0,
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  useEffect(() => {
    if (obj.id) {
      const editObj = obj;
      editObj.category = obj.category.id;
      setFormInput(editObj);
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
    const payload = { ...formInput, uid: user.uid, like_count: 0 };

    // Convert payload category string value to a number for correct typing

    payload.category = Number(payload.category);

    // Return early with the alert statement to ensure user selects a category

    if (payload.category === 0) {
      return alert('Please select a category');
    }

    if (obj.id) {
      updatePost(payload).then(() => router.push(`/posts/${obj.id}`));
    } else {
      createPost(payload).then(router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Post Content" className="mb-3">
        <Form.Control
          as="textarea"
          style={{ height: '200px' }}
          placeholder="Enter content"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel label="Select Category" className="mt-5 mb-3">
        <Form.Select
          placeholder="Post Category"
          onChange={handleChange}
          name="category"
          value={formInput.category}
          required
        >
          <option>Select A Category</option>
          {categories?.map((category) => (
            (
              <option
                key={(category.id)}
                value={(category.id)}
              >
                {category.name}
              </option>
            )
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit" variant="dark">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    id: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
