import { useState } from 'react';
import Brand from '../../components/Brand';
import { ArrowRight } from '../../components/PropertyIcons';
import { propertyOptions } from '../properties/propertyOptions';
import Footer from '../../components/Footer';
const filterConfig = {
  Rent: { priceLabel: 'Monthly rent', prices: ['Any monthly rent', 'Under 20,000', '20,000 - 40,000', '40,000+'], typeLabel: 'Furnishing', types: ['Any furnishing', 'Fully furnished', 'Semi furnished', 'Unfurnished'] },
  Buy: { priceLabel: 'Property price', prices: ['Any price', 'Under 75 Lakh', '75 Lakh - 1 Cr', '1 Cr+'], typeLabel: 'Property type', types: ['All property types', 'Apartment', 'Independent house', 'Villa'] },
  Commercial: { priceLabel: 'Monthly rent', prices: ['Any monthly rent', 'Under 30,000', '30,000 - 75,000', '75,000+'], typeLabel: 'Space type', types: ['All commercial spaces', 'Office', 'Shop', 'Warehouse'] },
};

const additionalServices = [
  {
    title: 'Packers & Movers', badge: 'Lowest Price', icon: <svg className="w-7 h-7 text-[#df3438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  },
  {
    title: 'Rental Agreement', badge: null, icon: <svg className="w-7 h-7 text-[#df3438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
  },
  {
    title: 'Painting & Cleaning', badge: 'New', icon: <svg className="w-7 h-7 text-[#df3438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  },
  {
    title: 'NoBroker For NRIs', badge: null, icon: <svg className="w-7 h-7 text-[#df3438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  },
];

const whyUsFeatures = [
  { title: 'Avoid Brokers', text: 'We directly connect you to verified owners to save brokerage.', icon: <svg className="w-9 h-9 text-[#df3438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="18" y1="8" x2="23" y2="13" /><line x1="23" y1="8" x2="18" y2="13" /></svg> },
  { title: 'Free Listing', text: 'Easy listing process, also using WhatsApp.', icon: <svg className="w-9 h-9 text-[#df3438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M9 15l2 2 4-4" /></svg> },
  { title: 'Shortlist without Visit', text: 'Extensive information makes it easy.', icon: <svg className="w-9 h-9 text-[#df3438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { title: 'Rental Agreement', text: 'Assistance in creating rental agreements and paperwork.', icon: <svg className="w-9 h-9 text-[#df3438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><circle cx="12" cy="14" r="2" /></svg> },
];

export default function LandingPage({ onLogin, onRegister, onRentalAgreement }) {
  const [tab, setTab] = useState('Rent');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(filterConfig.Rent.prices[0]);
  const [bhk, setBhk] = useState('Any BHK');
  const [propertyType, setPropertyType] = useState(filterConfig.Rent.types[0]);
  const [notice, setNotice] = useState('');
  const notify = text => { setNotice(text); window.setTimeout(() => setNotice(''), 2600); };
  const changeTab = nextTab => { setTab(nextTab); setPrice(filterConfig[nextTab].prices[0]); setPropertyType(filterConfig[nextTab].types[0]); };
  const selectCategory = action => {
    if (action === 'List') return notify('Start listing your property - it is free.');
    changeTab(action);
    document.querySelector('#search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const search = () => notify(`Searching ${tab.toLowerCase()} homes${location ? ` near ${location}` : ''}.`);

  return <>
    <header className="nav"><a href="#top" aria-label="NoBroker home"><Brand /></a><nav><a href="#journey">Rent</a><a href="#journey">Buy</a><a href="#owners">Commercial</a></nav><div className="nav-actions"><button className="login" onClick={onLogin}>Login</button><button className="register" onClick={onRegister}>Register</button><button className="post" onClick={() => selectCategory('List')}>Post Your Property</button><div className="more-menu" onMouseEnter={() => setIsMoreMenuOpen(true)} onMouseLeave={() => setIsMoreMenuOpen(false)} onFocusCapture={() => setIsMoreMenuOpen(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setIsMoreMenuOpen(false); }}><button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={isMoreMenuOpen} aria-controls="more-menu-options"><span className="menu-icon"><i /><i /><i /></span><span>Menu</span></button>{isMoreMenuOpen && <div className="menu-options" id="more-menu-options"><button type="button" onClick={() => { setIsMoreMenuOpen(false); onRentalAgreement(); }}>Rental Agreement</button></div>}</div></div></header>
    <main id="top">
      <section className="hero"><div className="hero-content"><p className="kicker">INDIA'S NO.1 PROPERTY PLATFORM</p><h1>Find your next home with <em>zero brokerage.</em></h1><p>Explore verified properties and connect directly with owners.</p><div className="search-box" id="search"><div className="tabs">{['Rent', 'Buy', 'Commercial'].map(option => <button className={tab === option ? 'active' : ''} onClick={() => changeTab(option)} key={option}>{option}</button>)}</div><div className="search-row"><label><span>Location</span><input value={location} onChange={event => setLocation(event.target.value)} placeholder="Search city, locality or landmark" /></label><button onClick={search}>Search properties</button></div></div><div className="stats"><span><b>10,000+</b> verified homes</span><span><b>0</b> brokerage fee</span><span><b>4.7/5</b> customer rating</span></div></div></section>
      <section className="filter-wrap" aria-label={`${tab} filters`}><div className="filters"><strong>{tab} filters</strong><label className="filter-label">{filterConfig[tab].priceLabel}<select value={price} onChange={event => setPrice(event.target.value)}>{filterConfig[tab].prices.map(option => <option key={option}>{option}</option>)}</select></label>{tab !== 'Commercial' && <label className="filter-label">BHK<select value={bhk} onChange={event => setBhk(event.target.value)}>{['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4 BHK+'].map(option => <option key={option}>{option}</option>)}</select></label>}<label className="filter-label">{filterConfig[tab].typeLabel}<select value={propertyType} onChange={event => setPropertyType(event.target.value)}>{filterConfig[tab].types.map(option => <option key={option}>{option}</option>)}</select></label><button className="clear" onClick={() => { setLocation(''); setPrice(filterConfig[tab].prices[0]); setBhk('Any BHK'); setPropertyType(filterConfig[tab].types[0]); }}>Clear all</button></div></section>
      <section className="journey-section" id="journey"><div className="section-heading"><div><p className="kicker">START YOUR JOURNEY</p><h2>What brings you here?</h2></div></div><div className="category-grid">{propertyOptions.map(option => <button className="category-card" onClick={() => selectCategory(option.action)} key={option.title}><span className="category-icon">{option.icon}</span><h3>{option.title}</h3><p>{option.text}</p><span className="arrow"><ArrowRight /></span></button>)}</div></section>
      <section className="owner-banner" id="owners"><div><p className="kicker">ARE YOU A PROPERTY OWNER?</p><h2>Your property deserves the right audience.</h2><p>List your property for free and connect directly with genuine seekers.</p><button onClick={() => selectCategory('List')}>List your property <ArrowRight /></button></div><div className="banner-art">HOME</div></section>
      <section className="py-10 px-6 max-w-[1200px] mx-auto my-6 font-['DM_Sans',sans-serif]" aria-label="Additional services"><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{additionalServices.map(service => <div key={service.title} className="relative flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-[#e4e8ec] shadow-[0_18px_48px_rgba(30,47,62,0.05)] hover:border-[#df3438]/40 hover:-translate-y-1 transition-all duration-200 text-center">{service.badge && <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold text-[#df3438] bg-[#fff0f0] border border-[#eba5a7]/50 rounded-md uppercase tracking-wider">{service.badge}</span>}<div className="p-3.5 bg-[#fff0f0] rounded-xl mb-3.5">{service.icon}</div><h3 className="font-bold text-[#253342] text-sm">{service.title}</h3></div>)}</div></section>
      <section className="pt-16 pb-12 px-6 bg-white border-t border-[#e4e8ec] font-['DM_Sans',sans-serif]"><div className="max-w-[1200px] mx-auto"><div className="text-center mb-12"><p className="kicker mb-2">WHY CHOOSE US</p><h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-[#253342] tracking-tight">Why Use NoBroker</h2></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{whyUsFeatures.map(item => <div key={item.title} className="flex flex-col items-center text-center"><div className="p-4 bg-[#fff0f0] rounded-2xl mb-4 border border-[#eba5a7]/30">{item.icon}</div><h3 className="font-bold text-[#253342] text-base mb-2">{item.title}</h3><p className="text-[#6b7883] text-sm leading-relaxed max-w-xs">{item.text}</p></div>)}</div></div></section>
      <div className="relative bg-white overflow-hidden" aria-hidden="true"><div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center py-4"><div className="w-full h-px bg-[#e4e8ec] relative flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-white border border-[#eba5a7] flex items-center justify-center shadow-xs z-10"><div className="w-2.5 h-2.5 rounded-full bg-[#df3438]" /></div></div></div></div>
      <section className="py-16 px-6 bg-white text-[#253342] relative"><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#df3438]/40 to-transparent" /><div className="max-w-[1200px] mx-auto"><div className="text-center mb-12"><p className="kicker mb-2">OUR IMPACT</p><h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold tracking-tight">We Make A Difference</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">{[['₹130 cr+', 'Brokerage saved monthly'], ['30 Lakh+', 'Customers connected monthly'], ['2 Lakh+', 'New listings monthly']].map(([value, label]) => <div key={label} className="flex flex-col items-center"><div className="w-32 h-32 rounded-full border-2 border-[#df3438] flex items-center justify-center bg-[#df3438]/10 mb-4 shadow-inner"><span className="text-xl font-bold text-[#df3438]">{value}</span></div><p className="text-[#6b7883] text-sm font-medium">{label}</p></div>)}</div></div></section>
    </main>
    <Footer />
    {notice && <div className="toast">{notice}</div>}
  </>;
}
