import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Post } from '../types/global';

const getPost = (id: number) =>
  axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

const usePostById = (id: number) => {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id
  });

  return { post: data, error, isLoading, isSuccess };
};

export default usePostById;
