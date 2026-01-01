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

    // Runs once on load to check for existing token or URL params
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = queryParams.get('token');
        const usernameFromUrl = queryParams.get('username');

        if (tokenFromUrl && usernameFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            localStorage.setItem('username', usernameFromUrl);
            setAuthToken(tokenFromUrl);
            setIsAuthenticated(true);
            setUser({ username: usernameFromUrl });
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                setAuthToken(token);
                setIsAuthenticated(true);
                setUser({ username: localStorage.getItem('username') });
            }
        }

        setLoading(false);
    }, []);


    // Helper to set the token in Axios headers for all future requests
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
            console.error(err.response.data.msg);
            return false;
        }
    };

    const signup = async (username, email, password) => {
        try {
            const res = await axios.post(`${API_URL}/signup`, { username, email, password });
            const { token } = res.data;

            // Log in the user immediately after successful signup
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            setAuthToken(token);
            setIsAuthenticated(true);
            setUser({ username });

            return true;
        } catch (err) {
            console.error(err.response.data.msg);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setAuthToken(null);
        setIsAuthenticated(false);
        setUser(null);
        if (window.location.hostname === 'localhost') {
            window.location.href = 'http://localhost:3000/?logout=true';
        } else {
            window.location.href = 'https://weath-up-frontend.vercel.app/?logout=true';
        }
    };



    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);