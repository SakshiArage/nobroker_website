import { useState } from 'react';
import { useAuth } from './useAuth';
import Brand from '../../components/Brand';

const NAVY = '#172C43';
const RED = '#DF3438';

function FieldIcon({ children }) {
  return (
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      {children}
    </span>
  );
}

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const inputClasses =
  'w-full rounded-md border border-[#D5DCE2] bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#DF3438] focus:ring-2 focus:ring-[#FCE4E4]';

export default function AuthForm({ mode, onClose, onSuccess, onSwitch }) {
  const isRegister = mode === 'register';
  const { login, register, status, error, clearError } = useAuth();
  const loading = status === 'loading';
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    clearError();

    try {
      const user = isRegister
        ? await register({ ...form, terms_conditions: true })
        : await login({ email: form.email, password: form.password });
      onSuccess(user);
    } catch {
      // Failure is already captured in `error` from the auth slice below.
    }
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
    >
      <section
        className={`auth-modal ${isRegister ? 'auth-modal--register' : ''}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="close-modal flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-red-50 hover:text-[#DF3438]"
        >
          <CloseIcon />
        </button>

        <Brand />

        <h2 style={{ color: NAVY }}>
          {isRegister ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {isRegister
            ? 'Register to save properties and contact owners directly.'
            : 'Login to choose how you want to get started.'}
        </p>

        <form onSubmit={submit} className="auth-form">
          {isRegister && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Full name</span>
              <span className="relative block">
                <FieldIcon>
                  <UserIcon />
                </FieldIcon>
                <input
                  required
                  name="fullName"
                  value={form.fullName}
                  onChange={updateField}
                  placeholder="Your full name"
                  className={inputClasses}
                />
              </span>
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Email address</span>
            <span className="relative block">
              <FieldIcon>
                <MailIcon />
              </FieldIcon>
              <input
                required
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                className={inputClasses}
              />
            </span>
          </label>

          {isRegister && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Mobile number</span>
              <span className="relative block">
                <FieldIcon>
                  <PhoneIcon />
                </FieldIcon>
                <input
                  required
                  name="phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="10-digit mobile number"
                  className={inputClasses}
                />
              </span>
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Password</span>
            <span className="relative block">
              <FieldIcon>
                <LockIcon />
              </FieldIcon>
              <input
                required
                name="password"
                type="password"
                minLength="6"
                value={form.password}
                onChange={updateField}
                placeholder="Minimum 6 characters"
                className={inputClasses}
              />
            </span>
          </label>

          {isRegister && (
            <label className="flex items-start gap-2 text-xs text-gray-500">
              <input required type="checkbox" className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#C9A24B] focus:ring-[#C9A24B]" />
              I agree to the Terms and Privacy Policy.
            </label>
          )}

          {error && (
            <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="auth-submit w-full transition-colors hover:bg-[#BC242A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Login'}
          </button>
        </form>

        <button
          onClick={onSwitch}
          className="switch-auth transition-colors hover:text-[#BC242A]"
        >
          {isRegister ? (
            <>
              Already have an account? <span>Login</span>
            </>
          ) : (
            <>
              New to NoBroker? <span>Register</span>
            </>
          )}
        </button>
      </section>
    </div>
  );
}
