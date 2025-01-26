import { useState } from 'react';
import axios from 'axios';
import Comments from './Comments';

const PostItem = ({ post, onDelete, showToast }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const token = localStorage.getItem('token');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);

  const handleLike = async () => {
    try {
      const res = await axios.put(`/api/posts/like/${post._id}`, null, {
        headers: { 'x-auth-token': token }
      });
      setLikes(res.data.length);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.avatar} alt="User" className="avatar" />
        <h4>{post.name}</h4>
      </div>
      <p className="post-text">{post.text}</p>
      <div className="post-actions">
        <button onClick={handleLike}>
          Likes: {likes}
        </button>
        {post.user === localStorage.getItem('userId') && (
          <button onClick={() => onDelete(post._id)} className="btn-delete">
            Delete
          </button>
        )}
        <button onClick={() => setShowComments(!showComments)}>
          Comments ({comments.length})
        </button>
      </div>
      {showComments && (
        <Comments 
          postId={post._id} 
          comments={comments} 
          setComments={setComments} 
          showToast={showToast}
        />
      )}
    </div>
  );
};

export default PostItem;
