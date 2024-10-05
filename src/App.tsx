import { CSSProperties, useEffect } from 'react';
import * as tanstack from '@tanstack/react-query';
import usePostById from './hooks/usePostById';
import useAddPost from './hooks/useAddPost';
import usePosts from './hooks/usePosts';
import './App.css';

const dataStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
};

const isAuth = true;

const App = () => {
  const queryClient = tanstack.useQueryClient();
  const { addPost, isPending } = useAddPost();
  const { data, isLoading } = usePosts(isAuth);
  const { post } = usePostById(1);

  const isFetchProcess = tanstack.useIsFetching();
  const isMutateProcess = tanstack.useIsMutating();

  useEffect(
    () => console.log('isFetchProcess:', Boolean(isFetchProcess)),
    [isFetchProcess]
  );

  useEffect(
    () => console.log('isMutateProcess:', Boolean(isMutateProcess)),
    [isMutateProcess]
  );

  useEffect(() => post && console.log('post:', post), [post]);

  if (!isLoading && !data) return <div>Not auth!</div>;
  if (isLoading) return null;

  const userId = Date.now().toString().slice(8, 13);

  return (
    <>
      <div>
        <h1>TanStack Query</h1>

        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['posts'] })}
        >
          Invalidate
        </button>

        <button
          onClick={() =>
            addPost({
              body: `New text ${userId}`,
              title: `New title ${userId}`,
              userId: +`1${userId}`
            })
          }
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Add Post'}
        </button>

        <div style={dataStyle} className='card'>
          {data?.map((el: { title: string }) => (
            <div key={el.title}>{el.title}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
