import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function Brand() {
  return <span className="brand"><b>no</b><i>broker</i><small>ZERO BROKERAGE</small></span>;
}

function ArrowRight() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function House() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9Z" /><path d="M9 21v-6h6v6" /></svg>;
}

function KeyRound() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M15 5l2 2M18 2l2 2" /></svg>;
}

function Building() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" /></svg>;
}

const categories = [
  { icon: <House />, title: 'Buy a home', text: 'Find a place to own, at your pace.', action: 'Buy' },
  { icon: <KeyRound />, title: 'Rent a home', text: 'Move into a home you’ll love.', action: 'Rent' },
  { icon: <Building />, title: 'List property', text: 'Reach serious home seekers.', action: 'List' }
];

const filterConfig = {
  Rent: { priceLabel: 'Monthly rent', prices: ['Any monthly rent', 'Under 20,000', '20,000 – 40,000', '40,000+'], typeLabel: 'Furnishing', types: ['Any furnishing', 'Fully furnished', 'Semi furnished', 'Unfurnished'] },
  Buy: { priceLabel: 'Property price', prices: ['Any price', 'Under 75 Lakh', '75 Lakh – 1 Cr', '1 Cr+'], typeLabel: 'Property type', types: ['All property types', 'Apartment', 'Independent house', 'Villa'] },
  Commercial: { priceLabel: 'Monthly rent', prices: ['Any monthly rent', 'Under 30,000', '30,000 – 75,000', '75,000+'], typeLabel: 'Space type', types: ['All commercial spaces', 'Office', 'Shop', 'Warehouse'] }
};

function AuthModal({ mode, setMode, close, notify }) {
  const register = mode === 'register';
  const submit = event => {
    event.preventDefault();
    close();
    notify(register ? 'Registration successful — welcome to NoBroker!' : 'You are now logged in.');
  };

  return <div className="modal-backdrop" onMouseDown={close}>
    <section className="auth-modal" onMouseDown={event => event.stopPropagation()}>
      <button className="close-modal" onClick={close} aria-label="Close">×</button>
      <Brand />
      <h2>{register ? 'Create your account' : 'Welcome back'}</h2>
      <p>{register ? 'Register to save properties and contact owners directly.' : 'Login to continue your property search.'}</p>
      <form onSubmit={submit}>
        {register && <label>Full name<input required placeholder="Your full name" /></label>}
        <label>Email address<input required type="email" placeholder="you@example.com" /></label>
        {register && <label>Mobile number<input required type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" /></label>}
        <label>Password<input required type="password" minLength="6" placeholder="Minimum 6 characters" /></label>
        {register && <label className="check"><input required type="checkbox" /> I agree to the Terms and Privacy Policy.</label>}
        <button className="auth-submit">{register ? 'Create account' : 'Login'}</button>
      </form>
      <button className="switch-auth" onClick={() => setMode(register ? 'login' : 'register')}>{register ? 'Already have an account? Login' : 'New to NoBroker? Register'}</button>
    </section>
  </div>;
}

function App() {
  const [tab, setTab] = useState('Rent');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(filterConfig.Rent.prices[0]);
  const [bhk, setBhk] = useState('Any BHK');
  const [propertyType, setPropertyType] = useState(filterConfig.Rent.types[0]);
  const [auth, setAuth] = useState(null);
  const [notice, setNotice] = useState('');
  const notify = text => { setNotice(text); window.setTimeout(() => setNotice(''), 2600); };
  const changeTab = nextTab => {
    setTab(nextTab);
    setPrice(filterConfig[nextTab].prices[0]);
    setPropertyType(filterConfig[nextTab].types[0]);
  };
  const selectCategory = action => {
    if (action === 'List') {
      notify('Start listing your property — it’s free.');
      return;
    }
    changeTab(action);
    document.querySelector('#search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const search = () => notify(`Searching ${tab.toLowerCase()} homes${location ? ` near ${location}` : ''}.`);

  return <>
    <header className="nav">
      <a href="#top" aria-label="NoBroker home"><Brand /></a>
      <nav><a href="#journey">Rent</a><a href="#journey">Buy</a><a href="#owners">Commercial</a></nav>
      <div className="nav-actions"><button className="login" onClick={() => setAuth('login')}>Login</button><button className="register" onClick={() => setAuth('register')}>Register</button><button className="post" onClick={() => selectCategory('List')}>Post Your Property</button></div>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-content">
          <p className="kicker">INDIA'S NO.1 PROPERTY PLATFORM</p>
          <h1>Find your next home with <em>zero brokerage.</em></h1>
          <p>Explore verified properties and connect directly with owners.</p>
          <div className="search-box" id="search">
            <div className="tabs">{['Rent', 'Buy', 'Commercial'].map(option => <button className={tab === option ? 'active' : ''} onClick={() => changeTab(option)} key={option}>{option}</button>)}</div>
            <div className="search-row"><label><span>Location</span><input value={location} onChange={event => setLocation(event.target.value)} placeholder="Search city, locality or landmark" /></label><button onClick={search}>Search properties</button></div>
          </div>
          <div className="stats"><span><b>10,000+</b> verified homes</span><span><b>0</b> brokerage fee</span><span><b>4.7/5</b> customer rating</span></div>
        </div>
      </section>
      <section className="filter-wrap" aria-label={`${tab} filters`}>
        <div className="filters">
          <strong>{tab} filters</strong>
          <label className="filter-label">{filterConfig[tab].priceLabel}<select value={price} onChange={event => setPrice(event.target.value)}>{filterConfig[tab].prices.map(option => <option key={option}>{option}</option>)}</select></label>
          {tab !== 'Commercial' && <label className="filter-label">BHK<select value={bhk} onChange={event => setBhk(event.target.value)}>{['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4 BHK+'].map(option => <option key={option}>{option}</option>)}</select></label>}
          <label className="filter-label">{filterConfig[tab].typeLabel}<select value={propertyType} onChange={event => setPropertyType(event.target.value)}>{filterConfig[tab].types.map(option => <option key={option}>{option}</option>)}</select></label>
          <button className="clear" onClick={() => { setLocation(''); setPrice(filterConfig[tab].prices[0]); setBhk('Any BHK'); setPropertyType(filterConfig[tab].types[0]); }}>Clear all</button>
        </div>
      </section>
      <section className="journey-section" id="journey">
        <div className="section-heading"><div><p className="kicker">START YOUR JOURNEY</p><h2>What brings you here?</h2></div></div>
        <div className="category-grid">
          {categories.map(category => <button className="category-card" onClick={() => selectCategory(category.action)} key={category.title}>
            <span className="category-icon">{category.icon}</span><h3>{category.title}</h3><p>{category.text}</p><span className="arrow"><ArrowRight /></span>
          </button>)}
        </div>
      </section>
      <section className="owner-banner" id="owners"><div><p className="kicker">ARE YOU A PROPERTY OWNER?</p><h2>Your property deserves the right audience.</h2><p>List your property for free and connect directly with genuine seekers.</p><button onClick={() => selectCategory('List')}>List your property <ArrowRight /></button></div><div className="banner-art">HOME</div></section>
    </main>
    <footer><Brand /><p>India's property platform connecting owners and seekers directly.</p><div className="footer-links"><a>About us</a><a>Careers</a><a>Help center</a><a>Terms and privacy</a></div><small>Copyright 2026 NoBroker-inspired UI demo.</small></footer>
    {auth && <AuthModal mode={auth} setMode={setAuth} close={() => setAuth(null)} notify={notify} />}
    {notice && <div className="toast">{notice}</div>}
  </>;
}

createRoot(document.getElementById('app')).render(<App />);


