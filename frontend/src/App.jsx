import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import { AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        Event<span>Hub</span>
      </div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create-event">Create Event</Link>
            <span style={{ color: 'var(--text-muted)', opacity: 0.8, marginRight: '1rem', marginLeft: '1rem' }}>
              Welcome, {user.name}
            </span>
            <button onClick={handleLogout} className="btn" style={{ background: 'var(--danger)', color: 'white', padding: '0.4rem 1rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="btn btn-ghost" style={{ marginRight: '0.5rem', padding: '0.4rem 1rem' }}>Home</Link>
            <Link to="/login" className="btn btn-primary" style={{ marginRight: '0.5rem', padding: '0.4rem 1rem' }}>Login</Link>
            <Link to="/register" className="btn btn-ghost" style={{ padding: '0.4rem 1rem' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--panel-bg)',
            color: 'var(--text-main)',
            border: '1px solid var(--panel-border)'
          }
        }}
      />
      <Navigation />
      
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
