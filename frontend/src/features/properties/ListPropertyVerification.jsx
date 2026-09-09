import { useState } from 'react';
import Brand from '../../components/Brand';

const MailIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
const PhoneIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>;

export default function ListPropertyVerification({ user, onClose, onComplete }) {
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [location, setLocation] = useState('');
  const [otp, setOtp] = useState({ email: '', phone: '' });
  const [otpRequested, setOtpRequested] = useState({ email: false, phone: false });
  const [verified, setVerified] = useState({ email: false, phone: false, location: false });
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState('');

  const setVerifiedField = field => setVerified(current => ({ ...current, [field]: true }));
  const requestEmailOtp = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.');
    setError('');
    setOtpRequested(current => ({ ...current, email: true }));
  };
  const requestPhoneOtp = () => {
    if (!/^[0-9]{10}$/.test(phone)) return setError('Enter a valid 10-digit mobile number.');
    setError('');
    setOtpRequested(current => ({ ...current, phone: true }));
  };
  const confirmOtp = field => {
    if (!/^[0-9]{6}$/.test(otp[field])) return setError(`Enter the 6-digit ${field} OTP.`);
    setError('');
    setVerifiedField(field);
  };
  const verifyLocation = () => {
    if (!location.trim()) return setError('Enter your property location or use your current location.');
    setError('');
    setVerifiedField('location');
  };
  const useCurrentLocation = () => {
    if (!navigator.geolocation) return setError('Location services are not supported by this browser.');
    setError('');
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation(`Current location: ${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`);
        setVerifiedField('location');
        setLocating(false);
      },
      () => {
        setError('We could not access your location. Enter the property address manually.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const allVerified = verified.email && verified.phone && verified.location;

  return <div className="modal-backdrop" onMouseDown={onClose}>
    <section className="auth-modal listing-verification" onMouseDown={event => event.stopPropagation()}>
      <button className="close-modal" onClick={onClose} aria-label="Close">x</button>
      <Brand />
      <h2>Verify before listing</h2>
      <p>Confirm your contact details and property location before you post for free.</p>
      <div className="verification-form">
        <label>Email address
          <span className="verification-row"><span className="verification-input-wrap"><MailIcon /><input type="email" value={email} onChange={event => { setEmail(event.target.value); setVerified(current => ({ ...current, email: false })); setOtpRequested(current => ({ ...current, email: false })); }} /></span>{!verified.email && <button type="button" onClick={requestEmailOtp}>{otpRequested.email ? 'Resend OTP' : 'Send OTP'}</button>}</span>
          {otpRequested.email && !verified.email && <span className="otp-row"><input aria-label="Email OTP" type="text" inputMode="numeric" maxLength="6" value={otp.email} onChange={event => setOtp(current => ({ ...current, email: event.target.value.replace(/\D/g, '') }))} placeholder="Enter 6-digit email OTP" /><button type="button" onClick={() => confirmOtp('email')}>Confirm OTP</button></span>}
          {verified.email && <span className="verified-note">Email OTP verified</span>}
        </label>
        <label>Mobile number
          <span className="verification-row"><span className="verification-input-wrap"><PhoneIcon /><input type="tel" inputMode="numeric" maxLength="10" value={phone} onChange={event => { setPhone(event.target.value.replace(/\D/g, '')); setVerified(current => ({ ...current, phone: false })); setOtpRequested(current => ({ ...current, phone: false })); }} placeholder="10-digit mobile number" /></span>{!verified.phone && <button type="button" onClick={requestPhoneOtp}>{otpRequested.phone ? 'Resend OTP' : 'Send OTP'}</button>}</span>
          {otpRequested.phone && !verified.phone && <span className="otp-row"><input aria-label="Mobile OTP" type="text" inputMode="numeric" maxLength="6" value={otp.phone} onChange={event => setOtp(current => ({ ...current, phone: event.target.value.replace(/\D/g, '') }))} placeholder="Enter 6-digit mobile OTP" /><button type="button" onClick={() => confirmOtp('phone')}>Confirm OTP</button></span>}
          {verified.phone && <span className="verified-note">Mobile OTP verified</span>}
        </label>
        <label>Property location
          <textarea value={location} onChange={event => { setLocation(event.target.value); setVerified(current => ({ ...current, location: false })); }} placeholder="Enter the property address, area, and city" rows="3" />
          <span className="location-actions"><button type="button" className="location-button" onClick={useCurrentLocation} disabled={locating}>{locating ? 'Getting location...' : 'Use current location'}</button><button type="button" onClick={verifyLocation}>{verified.location ? 'Verified' : 'Verify location'}</button></span>
        </label>
      </div>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <div className="verification-status" aria-live="polite">{allVerified ? 'All details verified — you can start your listing.' : 'Verify all three details to continue.'}</div>
      <button className="auth-submit" disabled={!allVerified} onClick={onComplete}>Continue to property details</button>
    </section>
  </div>;
}
