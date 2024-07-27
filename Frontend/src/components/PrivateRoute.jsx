import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem('Users'); // Check if user is logged in

  return (
    <Route
      {...rest}
      element={isLoggedIn ? Component : <Navigate to="/login?redirect=true" replace />}
    />
  );
};

export default PrivateRoute;
