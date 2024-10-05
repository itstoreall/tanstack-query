import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../api/post.service';

const useAddPost = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['addPost'],
    mutationFn: postService.addPost.bind(postService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      console.log('Post created successfully!');
    },
    onError: err => console.error('Error in Post creation!', err)
  });

  return { addPost: mutate, isPending };
};

export default useAddPost;
