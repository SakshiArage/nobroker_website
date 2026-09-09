import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, clearAuthError, selectUser, selectAuthStatus, selectAuthError } from './authSlice';

// Keeps the same { user, login, logout } shape the old AuthContext exposed,
// so components barely change - only the import path does. `login` and
// `register` now return a promise (via .unwrap()) that resolves with the
// user or throws with the server's error message.
export function useAuth() {
  const dispatch = useDispatch();

  return {
    user: useSelector(selectUser),
    status: useSelector(selectAuthStatus),
    error: useSelector(selectAuthError),
    login: (credentials) => dispatch(login(credentials)).unwrap(),
    register: (payload) => dispatch(register(payload)).unwrap(),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearAuthError()),
  };
}
