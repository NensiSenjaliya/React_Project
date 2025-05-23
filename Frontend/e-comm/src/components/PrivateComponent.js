// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateComponent = () => {
//     const auth = localStorage.getItem('User');
//     return auth ? <Outlet /> : <Navigate to="/signup" />;
// };

// export default PrivateComponent;


// components/PrivateComponent.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateComponent = ({ allowedRoles }) => {
  const auth = localStorage.getItem('User');
  const user = auth ? JSON.parse(auth) : null;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateComponent;
