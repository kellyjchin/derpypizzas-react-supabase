import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PublicOnlyRoute = ({ children}) => {
    const { user } = useAuth();
  
    if (user) {
      // If the user is logged in, redirect to the specified page
      return <Navigate to={'/'} />;
    }
  
    return children;
};
  
export default PublicOnlyRoute;