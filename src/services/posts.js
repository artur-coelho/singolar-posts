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
}

export default new PostService();
