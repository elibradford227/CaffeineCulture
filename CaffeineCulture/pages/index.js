import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { getPosts, searchPosts } from '../utils/data/postData';
import PostCard from '../components/cards/PostCard';

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllPosts = (uid) => {
    getPosts(uid).then((res) => setPosts(res));
  };

  useEffect(() => {
    getAllPosts(user.uid);
  }, [user.uid]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPosts(searchTerm, user.uid).then((res) => setPosts(res));
    setSearchTerm('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className="justify-content-center align-content-center"
    >
      <Form onSubmit={handleSubmit} onKeyDown={handleKeyPress} style={{ padding: '10px' }}>
        <input
          type="text"
          placeholder="Search Posts"
          value={searchTerm}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <Button type="submit" className="signout-btn">Search</Button>
      </Form>

      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} />
      ))}
    </div>
  );
}

export default Home;
