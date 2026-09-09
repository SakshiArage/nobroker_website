import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './features/auth/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './features/browsing/LandingPage';
import RentalAgreementPage from './features/browsing/RentalAgreementPage';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import PropertyChoicePage from './features/properties/PropertyChoicePage';
import ListPropertyVerification from './features/properties/ListPropertyVerification';
import BuyHomePage from './features/properties/BuyHomePage';
import RentHomePage from './features/properties/RentHomePage';
import ListPropertyPage from './features/properties/ListPropertyPage';
import AdminLoginPage from '../../admin/frontend/src/pages/AdminLogin.jsx';
import AdminDashboard from '../../admin/frontend/src/pages/Dashboard.jsx';

function PublicRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const goToChoices = () => navigate('/choices', { replace: true });

  if (user && location.pathname !== '/') return <Navigate to="/choices" replace />;
  return <><LandingPage onLogin={() => navigate('/login')} onRegister={() => navigate('/register')} onRentalAgreement={() => navigate('/rental-agreement')} />
    {location.pathname === '/login' && <LoginPage onClose={() => navigate('/')} onSuccess={goToChoices} onRegister={() => navigate('/register')} />}
    {location.pathname === '/register' && <RegisterPage onClose={() => navigate('/')} onSuccess={goToChoices} onLogin={() => navigate('/login')} />}
  </>;
}

function ChoiceRoute() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  const destinations = {
    Buy: '/buy-home',
    Rent: '/rent-home',
    List: '/list-property/verify',
  };

  return <PropertyChoicePage
    user={user}
    onChoice={action => navigate(destinations[action])}
    onLogout={() => { logout(); navigate('/'); }}
  />;
}

export default function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return <Routes>
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/choices" element={<ProtectedRoute><ChoiceRoute /></ProtectedRoute>} />
    <Route path="/buy-home" element={<ProtectedRoute><BuyHomePage onBack={() => navigate('/choices')} /></ProtectedRoute>} />
    <Route path="/rent-home" element={<ProtectedRoute><RentHomePage onBack={() => navigate('/choices')} /></ProtectedRoute>} />
    <Route path="/rental-agreement" element={<RentalAgreementPage onBack={() => navigate('/')} />} />
    <Route
      path="/list-property/verify"
      element={<ProtectedRoute><ListPropertyVerification user={user} onClose={() => navigate('/choices')} onComplete={() => navigate('/list-property')} /></ProtectedRoute>}
    />
    <Route path="/list-property" element={<ProtectedRoute><ListPropertyPage onBack={() => navigate('/choices')} /></ProtectedRoute>} />
    <Route path="*" element={<PublicRoutes />} />
  </Routes>;
}
