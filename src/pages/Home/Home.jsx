import { useState, useEffect, useCallback } from 'react';
import { PostService } from '../../services';
import PostCard from '../../components/PostCard/PostCard.jsx';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.jsx';
import PostDialog from '../../components/PostDialog/PostDialog.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentDeletedPostId, setCurrentDeletedPostId] = useState('');
  const [currentUpdatedPost, setCurrentUpdatedPost] = useState({});
  const [currentPost, setCurrentPost] = useState({});

  const fetchPosts = async () => {
    await PostService.fetchPosts().then((resp) => {
      setPosts(resp);
    });
  };

  const openDeletePostDialog = (postId) => {
    setCurrentDeletedPostId(postId);
    setOpenDeleteModal(true);
  };

  const deletePost = async () => {
    await PostService.deletePost(currentDeletedPostId).then((resp) => {
      setOpenDeleteModal(false);
      delePostFromArray();
    });
  };

  const delePostFromArray = () => {
    setPosts(posts.filter((post) => post.id !== currentDeletedPostId));
  };

  const openUpdatePostDialog = (post) => {
    setCurrentUpdatedPost(post);
    setOpenUpdateModal(true);
  };

  const onUpdate = useCallback(() => {
    updatePost(currentPost);
  }, [currentPost]);

  const updatePost = async (post) => {
    await PostService.updatePost(post.id, post).then((resp) => {
      console.log(resp);
    });
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
            handleUpdateClick={() => openUpdatePostDialog(post)}
          />
        );
      })}

      <ConfirmDialog
        title='Excluir'
        text='Deseja mesmo excluir esse post?'
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={deletePost}
      />
      <PostDialog
        title='Atualizar Post'
        open={openUpdateModal}
        post={currentUpdatedPost}
        onClose={() => setOpenUpdateModal(false)}
        onConfirm={onUpdate}
        setCurrentPost={() => {
          setCurrentPost(currentUpdatedPost);
        }}
      />
    </div>
  );
};

export default Home;
