import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while auth state is being determined
    }
  
    if (!user) {
      return <Navigate to="/sign-up" />;
    }
  
    return children;
};

export default ProtectedRoute;