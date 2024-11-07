/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-05 10:09:37
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:23:42
 */
// Navbar.tsx
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider";
import LocalStorageService from "../helpers/LocalStorageService";

const Navbar: React.FC = () => {
    const auth = useAuth();
    const [token, setToken] = useState<any>(null);

    useEffect(() => {
        const token = LocalStorageService.getTokenInfo();
        setToken(token);
    }, []);

    const handleLogout = () => {
        LocalStorageService.removeToken();
        auth?.setIsAuthenticated(false);
        toast.success("Logout successfully");
        return <Navigate to='/' replace />;
    };

    return (
        <nav className='bg-blue-200 p-4 shadow-md'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='text-lg font-semibold'>
                    Welcome, {token?.username || "Guest"}
                </div>
                <button
                    onClick={handleLogout}
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
