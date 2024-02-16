// import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getPosts } from '../utils/data/postData';
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

  console.warn(posts);
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} />
      ))}
      {/* <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button> */}
    </div>
  );
}

export default Home;
