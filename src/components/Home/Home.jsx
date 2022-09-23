import { useState, useEffect } from 'react';
import { PostService } from '../../services';
import PostCard from '../PostCard/PostCard.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    await PostService.fetchPosts().then((resp) => {
      setPosts(resp);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return <PostCard></PostCard>;
};

export default Home;
