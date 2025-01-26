import { useState } from 'react';
import axios from 'axios';
import Comments from './Comments';

const PostItem = ({ post, onDelete, showToast }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const token = localStorage.getItem('token');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);

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

  const handleEdit = async () => {
    try {
      const res = await axios.put(`/api/posts/${post._id}`, 
        { text: editText },
        { headers: { 'x-auth-token': token } }
      );
      post.text = res.data.text;
      setIsEditing(false);
      showToast('Post updated successfully', 'success');
    } catch (err) {
      showToast(err.response?.data?.msg || 'Error updating post', 'error');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.avatar} alt="User" className="avatar" />
        <h4>{post.name}</h4>
      </div>
      {isEditing ? (
        <div className="edit-post">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-textarea"
          />
          <div className="edit-actions">
            <button onClick={handleEdit} className="btn btn-primary">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn btn-light">Cancel</button>
          </div>
        </div>
      ) : (
        <p className="post-text">{post.text}</p>
      )}
      <div className="post-actions">
        <button onClick={handleLike}>
          Likes: {likes}
        </button>
        {post.user === localStorage.getItem('userId') && (
          <>
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              Edit
            </button>
            <button onClick={() => onDelete(post._id)} className="btn-delete">
              Delete
            </button>
          </>
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
