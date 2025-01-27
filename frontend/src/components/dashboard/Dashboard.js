import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileForm from './ProfileForm';

const Dashboard = ({ showToast }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/profile/me', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err.response?.data);
      // Don't set profile to null if it's just a 404
      if (err.response?.status !== 404) {
        setProfile(null);
      }
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {profile && !isEditing ? (
        <div>
          <h3>Welcome {profile.user.firstName} {profile.user.lastName}</h3>
          <div className="profile-info">
            <p>Institution: {profile.institution}</p>
            <p>Status: {profile.status}</p>
            <p>Bio: {profile.bio}</p>
            <p>Country: {profile.country}</p>
            <p>City: {profile.city}</p>
            {profile.skills?.length > 0 && (
              <p>Skills: {profile.skills.join(', ')}</p>
            )}
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          </div>
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
