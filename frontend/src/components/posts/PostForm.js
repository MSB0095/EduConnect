import { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated, showToast }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setText('');
      setImage(null);
      setPreview(null);
      onPostCreated(res.data);
      showToast('Post created successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.msg || 'Error creating post', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
      </div>
      <div className="post-form-actions">
        <div className="image-upload-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
            id="post-image"
          />
          <label htmlFor="post-image" className="btn-image-upload">
            <i className="fas fa-image"></i>
            Add Image
          </label>
          {preview && (
            <div className="image-upload-preview">
              <img src={preview} alt="Preview" width="100" />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </div>
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
          <button 
            type="button" 
            onClick={() => {
              setImage(null);
              setPreview(null);
            }}
            className="btn btn-light"
          >
            Remove Image
          </button>
        </div>
      )}
    </form>
  );
};

export default PostForm;
