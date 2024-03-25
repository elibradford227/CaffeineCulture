import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext.js';
import { getPosts, searchPosts } from '../utils/data/postData';
import PostCard from '../components/cards/PostCard';
import { PostData } from '../utils/interfaces';

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getAllPosts = async (uid: string) => {
    const res = await getPosts(uid);
    setPosts(res as PostData[]);
  };

  useEffect(() => {
    getAllPosts(user.uid);
  }, [user.uid]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await searchPosts(searchTerm, user.uid);
    setPosts(res as PostData[]);
    setSearchTerm('');
  };

  return (
    <div
      className="justify-content-center align-content-center"
    >
      <Form onSubmit={handleSubmit}  style={{ padding: '10px' }}>
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
