import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">EduConnect</Link>
      </h1>
      <ul>
        {!isAuthenticated ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
