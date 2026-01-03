import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3002/api/auth'
    : 'https://weathup-finance-backend.onrender.com/api/auth';

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

        // clear any old guest sessions so it doesn't get weird
        const localUsername = localStorage.getItem('username');
        if (localUsername && localUsername.startsWith('Guest User')) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }

        // check if we have a temporary session first
        let token = sessionStorage.getItem('token');
        let username = sessionStorage.getItem('username');

        // otherwise check real login
        if (!token) {
            token = localStorage.getItem('token');
            username = localStorage.getItem('username');
        }

        if (token) {
            setIsAuthenticated(true);
            setUser({ username });
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

    // Added 'remember' param to control storage (default true for normal login)
    const login = async (email, password, remember = true) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            const { token, username } = res.data;

            if (remember) {
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
            } else {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('username', username);
            }

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
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
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
