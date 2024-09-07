// ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthProvider';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
