import { useQuery } from '@tanstack/react-query';
import { Post, PostData } from '../types/global';
import { postService } from '../api/post.service';

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
  const modifyData = (data: PostData) => {
    return data.data.filter((_: Post, idx: number) => idx < 10) ?? [];
  };

  const {
    data,
    error,
    isLoading,
    isSuccess
    /*
    isStale, refetch
    */
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.getPosts(),
    select: modifyData,
    enabled: isEnable,
    initialData
    /*
    staleTime: 5000
    */
  });

  /*
  useEffect(() => {
    console.log('isStale:', isStale);
    if (isStale) refetch();
  }, [isStale]);
  */

  return { data, error, isLoading, isSuccess };
};

export default usePosts;
