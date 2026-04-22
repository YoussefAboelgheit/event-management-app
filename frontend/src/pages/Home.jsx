import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function EventCard({ ev }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const desc = ev.description || '';
  const shouldTruncate = desc.length > maxLength;

  const displayDesc = shouldTruncate && !isExpanded 
    ? desc.slice(0, maxLength) + '...' 
    : desc;

  return (
    <div className="event-card glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="event-card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 className="event-title">{ev.title}</h3>
        <div className="event-meta">
          {new Date(ev.date).toLocaleDateString()} | {ev.category_id?.name || 'Uncategorized'}
        </div>
        <p className="event-desc" style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
          {displayDesc}
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginLeft: '5px', fontSize: '0.9rem', padding: 0, fontWeight: '600' }}
            >
              {isExpanded ? '(see less)' : '(see more)'}
            </button>
          )}
        </p>
        <Link to={`/events/${ev._id}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center', marginTop: 'auto' }}>
          View Details
        </Link>
      </div>
    </div>
  );
}

function Home() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both events and categories concurrently
    Promise.all([
      api.get('/events'),
      api.get('/categories')
    ]).then(([eventsRes, catRes]) => {
      setEvents(eventsRes.data || []);
      setCategories(catRes.data || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(ev => ev.category_id?._id === selectedCategory);

  return (
    <div className="home-page">
      <div className="text-center mb-3">
        <h1>Welcome to EventHub</h1>
        <p className="event-meta mt-1">Discover and register for amazing events happening around you.</p>
      </div>

      {!loading && categories.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${selectedCategory === 'All' ? 'btn-primary' : ''}`}
            style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--panel-border)', background: selectedCategory === 'All' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: 'var(--text-main)' }}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat._id}
              className={`btn ${selectedCategory === cat._id ? 'btn-primary' : ''}`}
              style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--panel-border)', background: selectedCategory === cat._id ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: 'var(--text-main)' }}
              onClick={() => setSelectedCategory(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center glass-panel" style={{ padding: '2rem' }}>
          No events found for this category.
        </div>
      ) : (
        <div className="grid">
          {filteredEvents.map(ev => (
            <EventCard key={ev._id} ev={ev} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
