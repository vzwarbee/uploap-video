// components/PrivateRoute.jsx

import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
