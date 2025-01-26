import { useState } from 'react';
import axios from 'axios';

const ProfileForm = ({ setProfile }) => {
  const [formData, setFormData] = useState({
    institution: '',
    status: '',
    bio: '',
    interests: ''
  });

  const { institution, status, bio, interests } = formData;

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
          value={institution}
          onChange={(e) => setFormData({...formData, institution: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <select
          name="status"
          value={status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
          required
        >
          <option value="">* Select Status</option>
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
          <option value="Developer">Developer</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <textarea
          placeholder="Bio"
          name="bio"
          value={bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Interests (comma separated)"
          name="interests"
          value={interests}
          onChange={(e) => setFormData({...formData, interests: e.target.value})}
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Profile</button>
    </form>
  );
};

export default ProfileForm;
