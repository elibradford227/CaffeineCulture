import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { getPosts, searchPosts } from '../utils/data/postData';
import PostCard from '../components/cards/PostCard';

interface PostData {
  id: number;
  title: string;
  content: string;
  date: string;
  like_count: number;
  category: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    username: string;
    bio: string;
    join_date: string;
    uid: string;
  };
  comments: CommentData[]; 
  liked: boolean;
}

interface CommentData {
  id: number;
  user: {
    id: number;
    username: string;
    bio: string;
    join_date: string;
    uid: string;
  };
  post: PostData;
  content: string;
  date: string;
  parent: CommentData | null;
}

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getAllPosts = (uid: string) => {
    getPosts(uid).then((res) => setPosts(res));
  };

  useEffect(() => {
    getAllPosts(user.uid);
  }, [user.uid]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchPosts(searchTerm, user.uid).then((res) => setPosts(res));
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
