import { useEffect, useMemo, useState } from 'react';
import Brand from '../../components/Brand';
import Footer from '../../components/Footer';

const steps = [
  ['1', 'Choose your agreement type', 'Pick a government-registered agreement with doorstep biometric, or a notary agreement.'],
  ['2', 'Add details', 'Enter owner, tenant and rent details, or upload an existing draft.'],
  ['3', 'Biometric at your doorstep', 'Complete Aadhaar biometric verification at home, at a time that works for you.'],
  ['4', 'Get your agreement', 'Receive a digital copy, or have a printed copy delivered to your doorstep.'],
];

const addOns = [
  ['▣', 'Notarised Agreement', 'Verified and stamped by an official notary, accepted as valid address proof for government and official purposes.'],
  ['✍', 'E-Sign Agreement', 'Digitally sign your soft copy via Aadhaar without requiring the owner and tenant to meet in person.'],
  ['⚡', 'Get One Day Delivery', 'Select this add-on for same or next-day delivery, or delivery outside Bangalore. Delivery is free in Bangalore.'],
  ['★', 'One extra original copy', 'Get a second original copy at half price, one for the owner and one for the tenant.'],
];

const reviews = [
  ['CA', 'Chandan Agarwal', '4.8', 'I used NoBroker for rental agreement services recently. The relationship manager was responsive and the doorstep biometric verification was professional and on time.'],
  ['MK', 'Mithlesh Kumar', '4.5', 'Good customer service and interaction. I got my rental agreement done at a lower price compared to what we pay to any agent or broker.'],
  ['SC', 'Sumit Chinche', '4.7', 'The rental agreement service was easy, reliable and totally worth it. The entire process was smooth and well supported.'],
];

const faqs = [
  ['Can a rent agreement in Pune be completed entirely online?', 'Yes. Agreement drafting, e-stamping, biometric verification and registration can be completed online with NoBroker support.'],
  ['Is a registered rent agreement mandatory in Pune?', 'Yes. Residential rentals in Maharashtra are generally executed as Leave and License Agreements, and registration is mandatory under applicable law.'],
  ['Is biometric verification mandatory for registration?', 'Yes. The landlord, tenant and witnesses need biometric verification for a registered Leave and License Agreement. NoBroker offers doorstep service.'],
  ['How is stamp duty calculated on a Pune rent agreement?', 'Stamp duty is calculated using the total rent payable for the agreement period and the refundable security deposit.'],
  ['Can I renew my rent agreement online in Pune?', 'Yes. Update the rental terms and complete the required registration formalities with NoBroker renewal assistance.'],
  ['Can I add customised clauses to my rent agreement?', 'Yes. You can add mutually agreed terms such as notice period, lock-in, maintenance, rent escalation and utility payments.'],
];

const guides = [
  'What Is a Joint Tenancy Agreement?',
  'Notice Period Clause in Rent Agreement',
  'Escalation Clause in Rent Agreement',
  'Rental Agreement vs Leave and License Agreement',
  'What Is a Board Resolution for a Rent Agreement?',
];

const comparisonRows = [
  ['Valid Stamp Paper Duty', '✓', '✓'],
  ['Custom Draft Options', '✓', 'Basic Format'],
  ['E-Sign (Remote signing)', '✓', '✕'],
  ['Doorstep Delivery', '✓', '✕'],
  ['Easy Renewal', 'One-click renewal', 'Manual Process'],
  ['Dedicated NRI Assistance', '✓', '✕'],
];

const cityGuideSections = [
  ['Types of Rental Agreements', 'Residential Rent Agreement|Used for homes and accommodation. It covers rent, security deposit, duration, maintenance, notice period, and the responsibilities of both landlord and tenant.|Suitable for apartments, independent houses, villas, studio apartments, builder floors, and PG accommodation.|Commercial Rent Agreement|Used for offices, retail stores, shops, showrooms, warehouses, industrial units, clinics, restaurants, salons, and coaching centres. It includes permitted use, business operations, maintenance, renewal, and compliance clauses.'],
  ['Rental Agreement Rules', 'Proper execution: Include landlord and tenant names, property details, rent, deposit, tenure, and all agreed terms.|Stamp duty: Execute the agreement on a valid e-stamp certificate. The applicable duty depends on rent, deposit, and duration.|Registration: Agreements exceeding 11 months generally require registration with the Sub-Registrar.|Security deposit: Clearly state the amount, refund conditions, and permissible deductions.|Notice period: Mention how much notice either party must give before ending the tenancy.|Maintenance and utilities: Clearly assign repairs, electricity, water, gas, and other charges.|Permitted use and renewal: Document residential or commercial use, restrictions, renewal, and rent revision terms in writing.'],
  ['Stamp Duty & Charges', 'Stamp duty is based on annual rent, refundable security deposit, and agreement tenure under the applicable state regulations.|Annual Rent = Monthly Rent × 12|Stamp Duty = 0.5% × (Annual Rent + Security Deposit)|For a residential agreement up to 11 months, the maximum applicable stamp duty is ₹500. Agreements longer than 11 months generally require registration.|Example: Monthly rent ₹25,000 + deposit ₹1,50,000 = agreement value ₹4,50,000. The calculated duty is ₹2,250, subject to the applicable ₹500 maximum for an 11-month residential agreement. NoBroker calculates the applicable amount automatically.'],
  ['When Registration Is Required', 'Registration is mandatory for agreements of 12 months or longer. It is also recommended for long-term rentals, commercial properties, high-value deposits, and corporate leases because it provides stronger legal standing and helps prevent disputes.'],
  ['Documents Required', 'For tenants: passport-size photograph, PAN card, Aadhaar card or passport, and original ID proof.|For landlords: passport-size photograph, identity proof, and property electricity bill or tax receipt as ownership proof.|Keeping these documents ready in advance helps avoid delays.'],
  ['How the Online Process Works', 'Fill details online: Enter tenant, landlord, and property details.|Choose format and tenure: Select the right agreement type and duration.|Upload documents: Submit the required identity and ownership details.|E-stamp and e-sign: NoBroker drafts, e-stamps, and digitally signs the agreement through Aadhaar e-sign.|Delivery or registration: Receive the notarised agreement at your doorstep or choose registration support. Most agreements are drafted, stamped, and delivered quickly; registered agreements may take longer due to the Sub-Registrar appointment.'],
  ['Rent Agreement Format & Clauses', 'Basic details include landlord and tenant details, property address, monthly rent, security deposit, duration, start date, and renewal terms.|Important clauses include lock-in period, maintenance, notice period, rent revision, utility charges, termination, deposit refund, subletting restrictions, society compliance, inventory, property inspection, and registration and stamp-duty compliance.|NoBroker provides a professionally drafted, customizable format for local rental practices and applicable regulations.'],
  ['Why Choose NoBroker', 'Legally compliant drafting, a customizable agreement format, a complete online process, lease agreement support, accurate stamp-duty calculation, registration assistance, Aadhaar-based e-signatures, optional doorstep service, transparent pricing, tenant verification support, and service across major localities in the selected city.'],
];

const popularCities = ['Bangalore', 'Mumbai', 'Chennai', 'Pune', 'Hyderabad', 'Gurgaon', 'Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Faridabad', 'Nagpur'];
const allCities = ['Agra', 'Ahmedabad', 'Aurangabad', 'Bangalore', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai', 'Coimbatore', 'Delhi', 'Gurgaon', 'Hyderabad', 'Indore', 'Jaipur', 'Kolkata', 'Lucknow', 'Mumbai', 'Nagpur', 'Nashik', 'Noida', 'Pune', 'Surat'];
const cityImages = {
  Bangalore: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=120&h=120&fit=crop',
  Mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=120&h=120&fit=crop',
  Chennai: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=120&h=120&fit=crop',
  Pune: 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=120&h=120&fit=crop',
  Hyderabad: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=120&h=120&fit=crop',
  Gurgaon: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=120&h=120&fit=crop',
  Delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=120&h=120&fit=crop',
  Noida: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=120&h=120&fit=crop',
  'Greater Noida': 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=120&h=120&fit=crop',
  Ghaziabad: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=120&h=120&fit=crop',
  Faridabad: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=120&h=120&fit=crop',
  Nagpur: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=120&h=120&fit=crop',
};

export default function RentalAgreementPage({ onBack }) {
  const [selectedCity, setSelectedCity] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(true);
  const [rent, setRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [duration, setDuration] = useState('11');
  const [notice, setNotice] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  const total = useMemo(() => {
    if (!rent || !deposit) return 0;
    return Math.round(((Number(rent) * Number(duration)) + Number(deposit)) * 0.0025 + 1000);
  }, [rent, deposit, duration]);
  const start = () => {
    if (!rent || !deposit) return setNotice('Enter rent and deposit to create your agreement.');
    setNotice('Your rental agreement request has been started.');
  };
  const chooseCity = city => { setSelectedCity(city); setCitySearch(''); setIsCityPickerOpen(false); };
  const matchingCities = allCities.filter(city => city.toLowerCase().includes(citySearch.toLowerCase()));
  const city = selectedCity || 'Pune';

  return <div className="agreement-page" id="top">
    <header className="agreement-nav"><button className="agreement-brand" type="button" onClick={onBack} aria-label="Back to NoBroker home"><Brand /></button><div className="agreement-nav-actions"><button className="agreement-city-trigger" type="button" onClick={() => setIsCityPickerOpen(true)}>{selectedCity || 'Select your city'} <span>⌄</span></button><button type="button" onClick={onBack}>Home</button><button className="agreement-login" type="button">Log in</button><span className="agreement-menu-mark"><i /><i /><i /></span><span>Menu</span></div></header>
    {isCityPickerOpen && <div className="agreement-city-backdrop"><section className="agreement-city-modal" role="dialog" aria-modal="true" aria-labelledby="city-picker-title"><button className="agreement-city-close" type="button" aria-label="Close city selection" onClick={() => selectedCity && setIsCityPickerOpen(false)}>×</button><h2 id="city-picker-title">Select your property City</h2><p className="agreement-city-note">Now available in 150+ Cities in India!</p><input autoFocus value={citySearch} onChange={event => setCitySearch(event.target.value)} placeholder="Type city name" aria-label="Search city" /><h3>Popular Cities</h3><div className="agreement-popular-cities">{popularCities.map(popularCity => <button type="button" key={popularCity} onClick={() => chooseCity(popularCity)}><img src={cityImages[popularCity]} alt="" />{popularCity}</button>)}</div><h3 className="agreement-all-cities-title">All Cities <small>Showing {matchingCities.length} cities</small></h3><div className="agreement-all-cities">{matchingCities.map(allCity => <button type="button" key={allCity} onClick={() => chooseCity(allCity)}>{allCity}</button>)}</div></section></div>}
    <main>
      <section className="agreement-hero"><div className="agreement-shell agreement-hero-grid"><div><p className="agreement-eyebrow">RENTAL AGREEMENT SERVICES</p><h1>Online Rent Agreement <em>in {city}</em></h1><div className="agreement-rating"><b>4.7</b><span>★</span><small>50K+ REVIEWS</small></div><p className="agreement-subtitle">Top-rated rental agreement services in India, made simple from start to finish.</p><div className="agreement-highlights"><span><b>✓</b> 100% legally valid</span><span><b>₹</b> Guaranteed lowest price</span><span><b>⌂</b> Hassle-free process</span></div><button className="agreement-primary" type="button" onClick={start}>Start creating agreement <b>›</b></button></div><div className="agreement-hero-card"><div className="agreement-paper"><div className="agreement-paper-top"><span>RENTAL AGREEMENT</span><b>✓</b></div><div className="agreement-paper-lines"><i /><i /><i /><i /></div><div className="agreement-stamp">LEGAL<br />VALID</div><div className="agreement-signature">NoBroker</div></div><p>Government registered & notary available</p></div></div></section>
      <section className="agreement-stats"><div className="agreement-shell"><div><b>150+</b><span>Cities</span><small>Available across India</small></div><div><b>50 Lakh+</b><span>Agreements</span><small>Trusted by users nationwide</small></div><div><b>100%</b><span>Doorstep service</span><small>Simple and convenient</small></div></div></section>
      <section className="agreement-section agreement-shell"><div className="agreement-title"><p className="agreement-eyebrow">SIMPLE PROCESS</p><h2>How it works?</h2></div><div className="agreement-steps">{steps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="agreement-section agreement-addons"><div className="agreement-shell"><div className="agreement-title"><p className="agreement-eyebrow">ADD-ONS AVAILABLE</p><h2>Everything you need, in one place</h2><p>Optional services available when you purchase your agreement.</p></div><div className="agreement-addon-grid">{addOns.map(([icon, title, text]) => <article key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
      <section className="agreement-section agreement-shell"><div className="agreement-calculator"><div className="agreement-calculator-copy"><p className="agreement-eyebrow">TRANSPARENT PRICING</p><h2>Rent Agreement Cost</h2><p>See an estimated total based on your monthly rent, deposit and agreement duration.</p><ul><li>Valid stamp paper duty</li><li>Doorstep biometric service</li><li>Easy renewal support</li></ul></div><div className="agreement-calculator-card"><div className="agreement-total"><span>Total rent agreement amount</span><b>₹ {total.toLocaleString('en-IN')}</b></div><label>Where is your property located?<button className="agreement-calculator-city" type="button" onClick={() => setIsCityPickerOpen(true)}>{city}</button></label><label>What is your monthly rent?<div className="agreement-input"><span>₹</span><input inputMode="numeric" value={rent} onChange={event => setRent(event.target.value.replace(/\D/g, ''))} placeholder="Enter the amount" /></div></label><label>What is your deposit amount?<div className="agreement-input"><span>₹</span><input inputMode="numeric" value={deposit} onChange={event => setDeposit(event.target.value.replace(/\D/g, ''))} placeholder="Enter the amount" /></div></label><label>How long is this agreement?<select value={duration} onChange={event => setDuration(event.target.value)}>{[11, 12, 18, 24, 36].map(month => <option key={month} value={month}>{month} Months</option>)}</select></label><button className="agreement-primary agreement-create" type="button" onClick={start}>Create agreement</button></div></div></section>
      <section className="agreement-section agreement-compare"><div className="agreement-shell"><div className="agreement-title"><p className="agreement-eyebrow">THE NOBROKER DIFFERENCE</p><h2>NoBroker compared to local vendors</h2><p>Transparent service comparison so you can choose with confidence.</p></div><div className="agreement-table"><div className="agreement-table-head"><span>Services</span><b>NoBroker</b><span>Local Vendors</span></div>{comparisonRows.map(([service, nobroker, local]) => <div key={service}><span>{service}</span><b className={nobroker === '✕' ? 'agreement-no' : ''}>{nobroker}</b><span className={local === '✕' ? 'agreement-no' : ''}>{local}</span></div>)}</div></div></section>
      <section className="agreement-section agreement-reviews"><div className="agreement-shell"><div className="agreement-reviews-heading"><div className="agreement-title"><p className="agreement-eyebrow">TRUSTED BY RENTERS</p><h2>Customer reviews</h2></div><div className="agreement-score"><b>4.7</b><span>★★★★★</span><small>50,000+ reviews</small></div></div><div className="agreement-review-grid">{reviews.map(([initials, name, rating, text]) => <article key={name}><div className="agreement-review-top"><span>{initials}</span><div><b>{name}</b><small>{rating} ★</small></div></div><p>“{text}”</p><button type="button">see more</button></article>)}</div></div></section>
      <section className="agreement-section agreement-guide"><div className="agreement-shell"><div className="agreement-title"><p className="agreement-eyebrow">KNOW BEFORE YOU SIGN</p><h2>NoBroker Rental Agreement Guide</h2></div><div className="agreement-guide-grid">{guides.map((guide, index) => <a href="#faq" key={guide}><span>0{index + 1}</span><b>{guide}</b><i>›</i></a>)}</div></div></section>
      <section className="agreement-section agreement-content"><div className="agreement-shell"><p className="agreement-eyebrow">RENTAL AGREEMENT IN {city.toUpperCase()}</p><h2>Online Rent Agreement in {city} - Doorstep Biometric &amp; Easy Registration</h2><p>Renting a home or commercial property in {city} involves more than agreeing on the monthly rent and security deposit. A properly drafted and registered rent agreement records the terms agreed between the landlord and tenant and helps both parties understand their responsibilities.</p><p>In {city}, rental arrangements can be documented through a Leave and License Agreement. With NoBroker, you get end-to-end assistance from agreement drafting and stamp duty calculation to doorstep biometric verification and registration.</p><div className="agreement-content-columns"><div><h3>Types of rent agreements we draft</h3><h4>Residential rent agreement</h4><p>Suitable for apartments, independent houses, villas, studio apartments, PGs and co-living accommodation. It can include rent, deposit, maintenance, parking, notice period and other agreed terms.</p><h4>Commercial rent agreement</h4><p>Suitable for offices, shops, showrooms, warehouses and other commercial establishments, with clauses for permitted use, fit-outs, signage, lock-in and renewal.</p></div><div><h3>{city} rent agreement rules you should know</h3><ul><li>Leave and License Agreements must be written and registered.</li><li>Stamp duty is based on total rent and refundable deposit.</li><li>Landlord, tenant and witnesses complete biometric verification.</li><li>Two witnesses must provide valid identity details.</li><li>Registration and police intimation requirements vary by jurisdiction.</li></ul></div></div></div></section>
      <section className="agreement-section agreement-details"><div className="agreement-shell"><div className="agreement-detail-grid"><div><h2>Stamp duty &amp; registration charges</h2><p>Stamp duty is calculated as <b>0.25% × (total rent for the agreement period + refundable security deposit)</b>. The registration fee is generally ₹1,000 in PMC limits and ₹500 in rural areas.</p><table><thead><tr><th>Agreement duration</th><th>Stamp duty</th><th>Registration fee</th></tr></thead><tbody><tr><td>Up to 11 months</td><td>0.25% of rent + deposit</td><td>₹1,000 / ₹500</td></tr><tr><td>1 to 3 years</td><td>0.25% of rent + deposit</td><td>₹1,000 / ₹500</td></tr><tr><td>Up to 5 years</td><td>0.25% of rent + deposit</td><td>₹1,000 / ₹500</td></tr></tbody></table></div><div><h2>Documents required</h2><p>Keep these details ready to make the process faster:</p><ul><li><b>Landlord:</b> Aadhaar, PAN, property details and ownership documents.</li><li><b>Tenant:</b> Aadhaar, PAN and photograph, if required.</li><li><b>Witnesses:</b> Aadhaar or valid identity and contact details.</li></ul><h3>How to make an online rent agreement</h3><ol><li>Fill in landlord, tenant and property details.</li><li>Enter rent, deposit, duration and rental terms.</li><li>Review the draft and complete payment.</li><li>Schedule doorstep biometric verification.</li><li>Receive your registered agreement.</li></ol></div></div></div></section>
      <section className="agreement-section agreement-faq" id="faq"><div className="agreement-shell"><div className="agreement-title"><p className="agreement-eyebrow">NEED TO KNOW</p><h2>Frequently asked questions</h2></div><div className="agreement-faq-list">{faqs.map(([question, answer], index) => <div className={openFaq === index ? 'open' : ''} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question.replace(/Pune/g, city)}</span><b>{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>
      <section className="agreement-section agreement-full-guide"><div className="agreement-shell"><div className="agreement-title"><p className="agreement-eyebrow">CITY RENTAL GUIDE</p><h2>Online Rent Agreement Services in {city}</h2><p>Everything you need to draft, e-sign, stamp, register, and receive a legally compliant rental agreement.</p></div><article className="agreement-scroll-box">{cityGuideSections.map(([heading, content]) => <section key={heading}><h3>{heading}</h3>{content.split('|').map((paragraph, index) => paragraph.includes('Agreement') && index > 0 ? <h4 key={`${heading}-${index}`}>{paragraph}</h4> : <p key={`${heading}-${index}`}>{paragraph}</p>)}</section>)}</article></div></section>
    </main>
    <footer className="agreement-footer"><div className="agreement-shell"><div className="agreement-footer-top"><Brand /><div><b>NoBroker services</b><a href="#calculator">Rental agreement</a><a href="#faq">Tenant verification</a><a href="#faq">Property legal services</a></div><div><b>Popular cities</b><a href="#top">Rental agreement in Pune</a><a href="#top">Rental agreement in Mumbai</a><a href="#top">Rental agreement in Bangalore</a></div><div><b>Quick links</b><a href="#faq">Frequently asked questions</a><a href="#guide">Rental agreement guide</a><a href="#top">Home</a></div></div><div className="agreement-footer-local"><b>Registered Office: NoBroker Technologies Solutions Pvt. Ltd.</b><span>4th floor, The Fore by Bricks and Milestones, Ambedkar Nagar, Carmelaram, Chikkabellandur, Bengaluru, Karnataka 560035</span><span>CIN: U74900KA2014PTC077652 · Phone: +91 8068530589</span></div><div className="agreement-footer-bottom"><span>© NoBroker Technologies Solutions Pvt. Ltd. All rights reserved.</span><span><a href="#faq">Privacy Policy</a><a href="#faq">Terms &amp; Conditions</a><a href="#faq">Contact Us</a></span></div></div></footer>
    <Footer />
    {notice && <div className="toast">{notice}</div>}
  </div>;
}
