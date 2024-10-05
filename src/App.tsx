import { CSSProperties } from 'react';
import usePosts from './hooks/usePosts';
import usePostById from './hooks/usePostById';
import './App.css';
import { useQueryClient } from '@tanstack/react-query';

const dataStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
};

const isAuth = true;

const App = () => {
  const { data, isLoading, error, isSuccess } = usePosts(isAuth);
  const { post } = usePostById(2);

  const queryClient = useQueryClient();

  if (isSuccess) console.log('posts error | isSuccess:', error, isSuccess);
  console.log('post:', post);

  if (!isLoading && !data) return <div>Not auth!</div>;
  if (isLoading) return null;

  return (
    <>
      <div>
        <h1>TanStack Query</h1>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['posts'] })}
        >
          Invalidate
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
