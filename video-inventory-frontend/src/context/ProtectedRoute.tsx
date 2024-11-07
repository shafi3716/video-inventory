/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-05 09:59:39
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:24:10
 */
import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "./AuthProvider";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const auth = useAuth();

    if (!auth?.isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
