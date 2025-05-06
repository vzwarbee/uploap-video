import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { getUser } from '../api/authentication';
import { toast } from 'react-toastify';

const PrivateAdminRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyRole = async () => {
      if (!token) {
        setAuthorized(false);
        return;
      }

      try {
        const data = await getUser();

        if (Number(data?.role) === 0) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        toast.error(err?.data?.error);
        setAuthorized(false);
      }
    };

    verifyRole();
  }, [token]);

  if (authorized === null) return null;

  return authorized ? children : <Navigate to="/" />;
};

export default PrivateAdminRoute;
