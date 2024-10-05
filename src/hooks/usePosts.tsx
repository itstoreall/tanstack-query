import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Post, PostData } from '../types/global';

const initialData: { data: Post[] } = {
  data: [
    {
      body: 'init body',
      id: 0,
      title: 'init Title',
      userId: 1
    }
  ]
};

const usePosts = (isEnable: boolean) => {
  const getPosts = async () =>
    await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

  const modifyData = (data: PostData) => {
    // console.log(data.data);
    return data.data.filter((_: Post, idx: number) => idx < 10) ?? [];
  };

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    select: modifyData,
    enabled: isEnable,
    initialData
  });

  return { data, error, isLoading, isSuccess };
};

export default usePosts;
