import React from 'react';
import { Navigate } from 'react-router-dom';
import LocalStorageService from '../helpers/LocalStorageService';
import { useAuth } from './AuthProvider';

interface AuthRedirectProps {
  children: React.ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const auth = useAuth();

  if (auth?.isAuthenticated) {
     const token = LocalStorageService.getTokenInfo()
      if(token?.roles[0] === "ROLE_ADMIN"){
        return <Navigate to="/admin" replace />;
      } else if(token?.roles[0] === "ROLE_USER"){
        return <Navigate to="/user" replace />;
      }
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};

export default AuthRedirect;