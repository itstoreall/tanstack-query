import axios from 'axios';
import { Post } from '../types/global';

class PostService {
  private URL = 'https://jsonplaceholder.typicode.com/posts';

  getPosts() {
    return axios.get<Post[]>(this.URL);
  }

  getPostById(id: number) {
    return axios.get<Post[]>(`${this.URL}/${id}`);
  }

  addPost(newPost: Omit<Post, 'id'>) {
    return axios.post(`${this.URL}`, newPost);
  }
}

export const postService = new PostService();
