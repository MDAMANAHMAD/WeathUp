import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Switched to Local Backend due to Cloud Suspension
const API_URL = 'http://localhost:3002/api/auth'; 

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('logout') === 'true') {
            logout();
            window.history.replaceState({}, document.title, window.location.pathname);
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setUser({ username: localStorage.getItem('username') });
            setAuthToken(token);
        }
        setLoading(false);
    }, []);


    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            const { token, username } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            
            setAuthToken(token);
            setIsAuthenticated(true);
            setUser({ username });
            
            return true;
        } catch (err) {
            console.error(err.response?.data?.msg || 'Login failed');
            return false;
        }
    };

    const signup = async (username, email, password) => {
        try {
            const res = await axios.post(`${API_URL}/signup`, { username, email, password });
            const { token } = res.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            
            setAuthToken(token);
            setIsAuthenticated(true);
            setUser({ username });

            return true;
        } catch (err) {
            console.error(err.response?.data?.msg || 'Signup failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setAuthToken(null);
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
