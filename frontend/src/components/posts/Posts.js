import { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import SearchPosts from './SearchPosts';

const Posts = () => {
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
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <SearchPosts setPosts={setPosts} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
      <div className="posts-list">
        {posts.map(post => (
          <PostItem 
            key={post._id} 
            post={post} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
