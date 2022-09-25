import { useState, useEffect } from 'react';
import { PostService } from '../../services';
import PostCard from '../../components/PostCard/PostCard.jsx';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPostId, setCurrentPostId] = useState('');

  const fetchPosts = async () => {
    await PostService.fetchPosts().then((resp) => {
      setPosts(resp);
    });
  };

  const openDeletePostDialog = (postId) => {
    setCurrentPostId(postId);
    setOpenModal(true);
  };

  const deletePost = async () => {
    await PostService.deletePost(currentPostId).then((resp) => {
      setOpenModal(false);
      delePostFromArray();
    });
  };

  const delePostFromArray = () => {
    setPosts(posts.filter((post) => post.id !== currentPostId));
  };

  const updatePost = async (postId) => {
    await PostService.updatePost(postId).then((resp) => {});
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
            handleDeletClick={() => openDeletePostDialog(post.id)}
            handleUpdateClick={() => updatePost(post.id)}
          ></PostCard>
        );
      })}
      <ConfirmDialog
        title='Excluir'
        text='Deseja mesmo excluir esse post?'
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={deletePost}
      />
    </div>
  );
};

export default Home;
