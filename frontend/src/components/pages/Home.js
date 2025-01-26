import { Link } from 'react-router-dom';

const Home = () => {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div className="home-container">
      <h1>Welcome to EduConnect</h1>
      <p className="lead">Connect with fellow students, share knowledge, and grow together</p>
      
      {!isAuthenticated && (
        <div className="buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-light">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
