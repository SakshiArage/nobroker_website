import AuthForm from './AuthForm';

export default function RegisterPage({ onClose, onSuccess, onLogin }) {
  return <AuthForm mode="register" onClose={onClose} onSuccess={onSuccess} onSwitch={onLogin} />;
}