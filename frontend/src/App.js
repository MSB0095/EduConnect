import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Posts from './components/posts/Posts';
import PrivateRoute from './components/routing/PrivateRoute';
import Toast from './components/layout/Toast';
import './styles/main.css';

function App() {
  const [toast, setToast] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login showToast={showToast} />} />
          <Route path="/register" element={<Register showToast={showToast} />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard showToast={showToast} />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/posts" 
            element={
              <PrivateRoute>
                <Posts showToast={showToast} />
              </PrivateRoute>
            } 
          />
        </Routes>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
