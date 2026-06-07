import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="container" style={{ paddingTop: '120px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ padding: '4rem 3rem', textAlign: 'center' }}
      >
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Explore the World with Us
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Discover premium travel packages and rent luxury vehicles. Your next adventure starts here.
        </p>
        <button style={{ 
          background: 'var(--accent-primary)', 
          color: 'white', 
          padding: '1rem 2.5rem', 
          borderRadius: '50px',
          fontWeight: '600',
          fontSize: '1.1rem',
          boxShadow: '0 10px 20px -10px var(--accent-primary)',
          transition: 'transform var(--transition-fast)'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Book Your Trip
        </button>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <nav style={{ 
        padding: '1.25rem 2rem', 
        background: 'var(--glass-bg)', 
        backdropFilter: 'blur(16px)', 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 100, 
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 className="text-gradient" style={{ fontSize: '1.5rem', margin: 0 }}>Travel & Rent</h2>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Home</a>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>Destinations</a>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>Vehicles</a>
          <a href="#" style={{ color: 'var(--text-secondary)' }}>Login</a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
