import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      // Remove confirmPassword from the payload sent to the backend
      const { confirmPassword, ...dataToSend } = formData;
      
      // Use the correct backend endpoint
      await api.post('/users/', dataToSend);
      toast.success('Registered successfully! Please login.');
      navigate('/login');
    } catch (err) {
      let errorMsg = 'Registration failed.';
      if (err.response?.data?.errors && err.response.data.errors.length > 0) {
        errorMsg = err.response.data.errors.map(e => e.msg).join(', ');
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }
      toast.error(errorMsg);
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <div className="glass-panel">
        <h2 className="text-center mb-3">Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" type="text" className="form-control" onChange={handleChange} required placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" className="form-control" onChange={handleChange} required placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" className="form-control" onChange={handleChange} required placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input name="confirmPassword" type="password" className="form-control" onChange={handleChange} required placeholder="Ensure your password" />
          </div>
          <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
