import { useState } from 'react';
import axios from 'axios';

const ProfilePicture = ({ currentAvatar, showToast }) => {
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    setLoading(true);

    try {
      const res = await axios.post('/api/users/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      showToast('Profile picture updated successfully', 'success');
      window.location.reload(); // Refresh to show new avatar
    } catch (err) {
      showToast(err.response?.data?.msg || 'Error uploading image', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-picture-container">
      <div className="current-picture">
        <img 
          src={currentAvatar || '/default-avatar.png'} 
          alt="Profile" 
          className="profile-avatar"
        />
      </div>
      <div className="upload-section">
        <label className="btn btn-light">
          {loading ? 'Uploading...' : 'Change Picture'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfilePicture;
