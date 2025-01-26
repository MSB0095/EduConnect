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
  const [editImage, setEditImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLiked, setIsLiked] = useState(
    post.likes.some(like => like.user === localStorage.getItem('userId'))
  );

  const handleLike = async () => {
    try {
      const res = await axios.put(`/api/posts/like/${post._id}`, null, {
        headers: { 'x-auth-token': token }
      });
      setLikes(res.data.length);
      setIsLiked(!isLiked);
      showToast(isLiked ? 'Post unliked' : 'Post liked', 'success');
    } catch (err) {
      showToast(err.response?.data?.msg || 'Error updating like', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        headers: { 'x-auth-token': token }
      });
      onDelete(post._id); // Call the parent's delete handler first
      showToast('Post deleted successfully', 'success');
    } catch (err) {
      showToast(err.response?.data?.msg || 'Error deleting post', 'error');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('text', editText);
      if (editImage) {
        formData.append('image', editImage);
      }

      const res = await axios.put(
        `/api/posts/${post._id}`,
        formData,
        { 
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      
      post.text = res.data.text;
      if (res.data.image) {
        post.image = res.data.image;
      }
      setIsEditing(false);
      setEditImage(null);
      setImagePreview(null);
      showToast('Post updated successfully', 'success');
    } catch (err) {
      showToast(err.response?.data?.msg || 'Error updating post', 'error');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.avatar || '/default-avatar.png'} alt="User" className="avatar" />
        <div>
          <h4>@{post.username}</h4>  {/* Changed from post.name */}
          <small>{new Date(post.date).toLocaleDateString()}</small>
        </div>
      </div>
      {isEditing ? (
        <div className="edit-post">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-textarea"
          />
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
              id={`edit-post-image-${post._id}`}
            />
            <label htmlFor={`edit-post-image-${post._id}`} className="btn btn-light">
              {post.image ? 'Change Image' : 'Add Image'}
            </label>
          </div>
          {(imagePreview || post.image) && (
            <div className="image-preview">
              <img src={imagePreview || post.image} alt="Preview" />
              <button 
                type="button" 
                onClick={() => {
                  setEditImage(null);
                  setImagePreview(null);
                }}
                className="btn btn-light"
              >
                Remove Image
              </button>
            </div>
          )}
          <div className="edit-actions">
            <button onClick={handleEdit} className="btn btn-primary">Save</button>
            <button onClick={() => {
              setIsEditing(false);
              setEditImage(null);
              setImagePreview(null);
            }} className="btn btn-light">Cancel</button>
          </div>
        </div>
      ) : (
        <p className="post-text">{post.text}</p>
      )}
      {post.image && (
        <div className="post-image">
          <img src={post.image} alt="Post content" />
        </div>
      )}
      <div className="post-actions">
        <button 
          onClick={handleLike} 
          className="btn-like"
          title={isLiked ? "Unlike" : "Like"}
        >
          <i className={`fas fa-heart heart-icon ${isLiked ? 'liked' : ''}`}></i>
          <span>{likes}</span>
        </button>
        {post.user === localStorage.getItem('userId') && (
          <>
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              Edit
            </button>
            <button onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          </>
        )}
        <button 
          onClick={() => setShowComments(!showComments)}
          className="btn btn-light"
        >
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
