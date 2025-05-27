import AppRoutes from './routes';
import './App.css';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useAppDispatch';
import { logout } from './features/auth/authSlice';

function App() {

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token && auth.isAuthenticated) {
      dispatch(logout());
    }
  }, [dispatch, auth.isAuthenticated]);

  return <AppRoutes />;
}

export default App;
