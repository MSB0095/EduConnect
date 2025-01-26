import { useState } from 'react';
import axios from 'axios';

const ProfileForm = ({ setProfile }) => {
  const [formData, setFormData] = useState({
    institution: '',
    status: '',
    bio: '',
    interests: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/profile', {
        ...formData,
        interests: formData.interests.split(',').map(interest => interest.trim())
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Institution"
          name="institution"
          value={formData.institution}
          onChange={(e) => setFormData({...formData, institution: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Bio"
          name="bio"
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Profile</button>
    </form>
  );
};

export default ProfileForm;
