import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../types/global';

// const initialData: { data: Post[] } = {
//   data: [
//     {
//       body: 'init body',
//       id: 0,
//       title: 'init Title',
//       userId: 1
//     }
//   ]
// };

const addPost = async (newPost: Omit<Post, 'id'>) =>
  axios.post('https://jsonplaceholder.typicode.com/posts', newPost);

const useAddPost = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['addPost'],
    mutationFn: addPost,
    // mutationFn: () => addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      console.log('Post created successfully!');
    },
    onError: () => console.log('Error in Post creation!')
  });

  return { addPost: mutate, isPending };
};

export default useAddPost;
