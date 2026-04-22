import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

function CreateEvent() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    category_id: '',
    capacityLimit: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // Fetch categories for the dropdown
    api.get('/categories').then(res => {
      setCategories(res.data || []);
      if (res.data && res.data.length > 0) {
        setFormData(prev => ({ ...prev, category_id: res.data[0]._id }));
      }
    }).catch(console.error);
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', {
        ...formData,
        user_id: user._id,
        capacityLimit: Number(formData.capacityLimit) || 100
      });
      toast.success('Event created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event');
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="glass-panel">
        <h2 className="mb-3 text-center">Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title</label>
            <input name="title" className="form-control" onChange={handleChange} required placeholder="Enter event title" />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" className="form-control" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category_id" className="form-control" value={formData.category_id} onChange={handleChange}>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Capacity</label>
            <input type="number" name="capacityLimit" className="form-control" onChange={handleChange} required placeholder="100" min="1" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" className="form-control" onChange={handleChange} required placeholder="What is this event about?" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }}>Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
