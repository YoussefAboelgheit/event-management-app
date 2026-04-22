import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../api';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => {
        setEvent(res.data); // backend returns event directly
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    if (user) {
      api.get('/registrations').then(res => {
        // res.data is an array of registrations where user is the attendee
        const registered = res.data.some(reg => reg.event_id?._id === id);
        setIsRegistered(registered);
      }).catch(console.error);
    }
  }, [id, user]);

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please log in first!");
      return;
    }
    try {
      await api.post('/registrations', { event_id: id, user_id: user._id });
      setIsRegistered(true);
      toast.success('Successfully registered!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error registering. Make sure you are logged in!');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-3">Loading details...</div>;
  if (!event) return <div className="text-center mt-3">Event not found.</div>;

  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h1 className="mb-1">{event.title}</h1>
      <div className="event-meta mb-3">
        Date: {new Date(event.date).toLocaleDateString()} | Focus: {event.category_id?.name || 'General'} | Spots: {event.currentCount}/{event.capacityLimit}
      </div>

      <div className="mb-3" style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
        {event.description}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {isRegistered ? (
          <button className="btn" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent)', cursor: 'default', border: '1px solid var(--accent)' }} disabled>
            ✓ Registered successfully
          </button>
        ) : event.currentCount >= event.capacityLimit ? (
          <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'not-allowed', border: '1px solid #ef4444' }} disabled>
            Event Full (Capacity Reached)
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleRegister}>
            Register for Event
          </button>
        )}
        <Link to="/" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
          Back to Events
        </Link>
      </div>
    </div>
  );
}

export default EventDetails;
