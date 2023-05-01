// react
import { Route, Routes } from 'react-router-dom';
// utils
import axios from 'axios';
// pages
import PageNotFound from './pages/404';
// layout
import Layout from './layout/Layout';
// middleware
import PrivateRoute from './middleware/PrivateRoute';
// hooks
import { useAuth } from './hooks/useAuth';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Appointment from './pages/Appointment';
// ----------------------------------------------------------------------

export default function Router() {
  const { token } = useAuth();
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return (
    <Routes>
      <Route path="login" element={<Signin />} />
      <Route path="registration" element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<PrivateRoute><Appointment /></PrivateRoute>} />
        <Route path="appointment" element={<PrivateRoute><Appointment /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}
