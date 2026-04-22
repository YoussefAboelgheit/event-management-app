import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Assuming GET /registrations returns the current user's registrations
      api.get('/registrations').then(res => {
        setRegistrations(res.data || []);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [user]);

  if (!user) {
    return <div className="text-center mt-3">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="glass-panel mb-3">
        <h2>Dashboard</h2>
        <p className="text-muted">Manage your event registrations here.</p>
      </div>

      <h3>Your Registrations</h3>
      {loading ? (
        <div>Loading...</div>
      ) : registrations.length === 0 ? (
        <div className="glass-panel text-center mt-2">
          You haven't registered for any events yet.
        </div>
      ) : (
        <div className="grid mt-2">
          {registrations.map(reg => (
            <div className="event-card glass-panel" key={reg._id}>
              <div className="event-card-body">
                <h3 className="event-title">{reg.event_id?.title || 'Unknown Event'}</h3>
                {reg.event_id && (
                  <>
                    <div className="event-meta">
                      Date: {new Date(reg.event_id.date).toLocaleDateString()}
                    </div>
                    <p className="event-desc">{reg.event_id.description}</p>
                  </>
                )}
                <div className="event-meta mt-2" style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: 0 }}>
                  ✓ Registered successfully
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
