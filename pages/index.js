// import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getPosts } from '../utils/data/postData';
import Loading from '../components/Loading';
import PostCard from '../components/cards/PostCard';

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const getAllPosts = (uid) => {
    getPosts(uid).then((res) => setPosts(res));
  };

  useEffect(() => {
    getAllPosts(user.uid);
  }, [user.uid]);

  return (
    <div
      className="justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        marginLeft: '10%',
      }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} />
      ))}
    </div>
  );
}

export default Home;
