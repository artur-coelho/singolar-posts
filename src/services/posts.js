import axios from './api';

class PostService {
  fetchPosts() {
    return new Promise((resolve, reject) => {
      axios
        .get('posts')
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => reject(err));
    });
  }

  deletePost(userId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`posts/${userId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => reject(err));
    });
  }

  updatePost(userId) {
    return new Promise((resolve, reject) => {
      axios
        .put(`posts/${userId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => reject(err));
    });
  }

  createPost(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/posts', data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => reject(err));
    });
  }
}

export default new PostService();
