import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePicture from './ProfilePicture';

const ProfileForm = ({ setProfile, existingProfile, setIsEditing, showToast }) => {
  const [formData, setFormData] = useState({
    institution: '',
    status: '',
    bio: '',
    interests: '',
    country: '',
    city: '',
    yearOfStudy: '',
    major: '',
    languages: '',
    skills: ''
  });

  useEffect(() => {
    if (existingProfile) {
      setFormData({
        institution: existingProfile.institution || '',
        status: existingProfile.status || '',
        bio: existingProfile.bio || '',
        interests: existingProfile.interests.join(', ') || '',
        country: existingProfile.country || '',
        city: existingProfile.city || '',
        yearOfStudy: existingProfile.yearOfStudy || '',
        major: existingProfile.major || '',
        languages: existingProfile.languages?.join(', ') || '',
        skills: existingProfile.skills?.join(', ') || ''
      });
    }
  }, [existingProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/profile', {
        ...formData,
        interests: formData.interests.split(',').map(interest => interest.trim()),
        languages: formData.languages.split(',').map(language => language.trim()),
        skills: formData.skills.split(',').map(skill => skill.trim())
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setProfile(res.data);
      if (setIsEditing) setIsEditing(false);
      showToast('Profile updated successfully', 'success');
    } catch (err) {
      showToast(err.response?.data?.msg || 'Error updating profile', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h3>{existingProfile ? 'Edit Profile' : 'Create Profile'}</h3>
      
      <ProfilePicture 
        currentAvatar={existingProfile?.user?.avatar} 
        showToast={showToast}
      />

      <div className="form-sections">
        <div className="form-section">
          <h4>Basic Information</h4>
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
            <select
              name="status"
              value={formData.status}
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
        </div>

        <div className="form-section">
          <h4>Location</h4>
          <div className="form-group">
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Academic Information</h4>
          <div className="form-group">
            <input
              type="text"
              placeholder="Major/Field of Study"
              name="major"
              value={formData.major}
              onChange={(e) => setFormData({...formData, major: e.target.value})}
            />
          </div>
          <div className="form-group">
            <select
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={(e) => setFormData({...formData, yearOfStudy: e.target.value})}
            >
              <option value="">Select Year of Study</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h4>Skills & Languages</h4>
          <div className="form-group">
            <input
              type="text"
              placeholder="Languages (comma separated)"
              name="languages"
              value={formData.languages}
              onChange={(e) => setFormData({...formData, languages: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Skills (comma separated)"
              name="skills"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
            />
          </div>
        </div>
      </div>

      <div className="button-group">
        <button type="submit" className="btn btn-primary">
          {existingProfile ? 'Update Profile' : 'Create Profile'}
        </button>
        {existingProfile && (
          <button 
            type="button" 
            onClick={() => setIsEditing(false)}
            className="btn btn-light"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
