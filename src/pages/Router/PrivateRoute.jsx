import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const{user,loading}=useAuth();
    const location=useLocation();
    //const token = localStorage.getItem('access-token');
    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }
     if (user ) {
    return children;
  }

  return <Navigate to="/login" state={{ from:location.pathname }}  />;
};

export default PrivateRoute;