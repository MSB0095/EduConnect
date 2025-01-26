import { useState } from 'react';
import axios from 'axios';

const Comments = ({ postId, comments: initialComments, showToast }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/posts/comment/${postId}`,
        { text: newComment },
        { headers: { 'x-auth-token': localStorage.getItem('token') }}
      );
      setComments(res.data);
      setNewComment('');
      showToast('Comment added successfully', 'success');
    } catch (err) {
      showToast(err.response?.data?.msg || 'Error adding comment', 'error');
    }
  };

  return (
    <div className="comments-section">
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Comment</button>
      </form>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <img src={comment.avatar || '/default-avatar.png'} alt="User" className="avatar-small" />
              <span>{comment.name}</span>
            </div>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
