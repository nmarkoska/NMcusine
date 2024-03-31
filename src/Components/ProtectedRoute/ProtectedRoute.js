import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { setUser } from '../../feature/authSlice'; // Adjust the import path as needed

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthState = () => {
      if (!user) {
        // No user in Redux, check local storage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          const storedUser = JSON.parse(userInfo);
          // Dispatch setUser to update Redux store with stored user
          dispatch(setUser(storedUser));
        }
      }
      // Mark authentication check as completed
      setAuthChecked(true);
    };

    checkAuthState();
  }, [user, dispatch]);

  if (!authChecked) {
    // Optionally, render a loading spinner or similar while checking auth state
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;