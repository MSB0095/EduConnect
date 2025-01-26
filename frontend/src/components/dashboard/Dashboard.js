import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileForm from './ProfileForm';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile/me', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response.data);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {profile ? (
        <div>
          <h3>Welcome {profile.user.name}</h3>
          <div className="profile-info">
            <p>Institution: {profile.institution}</p>
            <p>Status: {profile.status}</p>
            <p>Bio: {profile.bio}</p>
          </div>
        </div>
      ) : (
        <ProfileForm setProfile={setProfile} />
      )}
    </div>
  );
};

export default Dashboard;
