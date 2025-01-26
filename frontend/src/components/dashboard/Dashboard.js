import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileForm from './ProfileForm';

const Dashboard = ({ showToast }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile/me', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data);
        setProfile(null);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {profile && !isEditing ? (
        <div>
          <h3>Welcome {profile.user.name}</h3>
          <div className="profile-info">
            <div className="profile-header">
              <img 
                src={profile.user.avatar || '/default-avatar.png'} 
                alt="Profile" 
                className="profile-avatar"
              />
              <h3>{profile.user.name}</h3>
            </div>
            <p>Institution: {profile.institution}</p>
            <p>Status: {profile.status}</p>
            <p>Country: {profile.country}</p>
            <p>City: {profile.city}</p>
            <p>Year of Study: {profile.yearOfStudy}</p>
            <p>Major: {profile.major}</p>
            <p>Languages: {profile.languages.join(', ')}</p>
            <p>Skills: {profile.skills.join(', ')}</p>
            <p>Bio: {profile.bio}</p>
            <p>Interests: {profile.interests.join(', ')}</p>
          </div>
          <button 
            onClick={() => setIsEditing(true)} 
            className="btn btn-primary"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <ProfileForm 
          setProfile={setProfile} 
          existingProfile={profile} 
          setIsEditing={setIsEditing}
          showToast={showToast}
        />
      )}
    </div>
  );
};

export default Dashboard;
