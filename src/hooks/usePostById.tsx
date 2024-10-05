import { useQuery } from '@tanstack/react-query';
import { postService } from '../api/post.service';

const usePostById = (id: number) => {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getPostById(id),
    enabled: !!id
  });

  return { post: data, error, isLoading, isSuccess };
};

export default usePostById;
