import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ showToast }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug logging
    console.log('Form data before submission:', formData);

    // Validate all fields
    if (!formData.username || !formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      showToast('All fields are required', 'error');
      return;
    }

    if (formData.password !== formData.password2) {
      showToast('Passwords do not match', 'error');
      return;
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      showToast('Username must be 3-20 characters and can only contain letters, numbers, and underscores', 'error');
      return;
    }

    try {
      const requestData = {
        username: formData.username.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase(),
        password: formData.password
      };

      console.log('Sending registration request with data:', requestData);

      const res = await axios.post('/api/users/register', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Registration response:', res.data);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);
        localStorage.setItem('username', res.data.user.username);
        showToast('Registration successful!', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      showToast(
        err.response?.data?.msg || 'Registration failed. Please check all fields.',
        'error'
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      <h2>Register for EduConnect</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <h3>Create Account</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="error-text">{errors.username}</div>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <div className="error-text">{errors.firstName}</div>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <div className="error-text">{errors.lastName}</div>}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        <div className="form-group">
<input
  type="password"
  placeholder="Password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  required
/>
{errors.password && <div className="error-text">{errors.password}</div>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
