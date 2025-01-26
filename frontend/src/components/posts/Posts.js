import { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import PostForm from './PostForm';
import SearchPosts from './SearchPosts';

const Posts = ({ showToast }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/posts', 
        { text: newPost },
        { headers: { 'x-auth-token': localStorage.getItem('token') }}
      );
      setNewPost('');
      fetchPosts();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleDelete = async (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <SearchPosts setPosts={setPosts} />
      <PostForm onPostCreated={handleNewPost} showToast={showToast} />
      <div className="posts-list">
        {posts.map(post => (
          <PostItem 
            key={post._id} 
            post={post} 
            onDelete={handleDelete}
            showToast={showToast}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
