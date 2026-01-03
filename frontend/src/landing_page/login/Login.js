import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isDemoLoading, setIsDemoLoading] = useState(false);

    // kick user to dashboard if they are already logged in
    React.useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/');
        }
    }, [auth.isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoginLoading(true);
        const success = await auth.login(email, password);
        setIsLoginLoading(false);

        if (success) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            // send them to the dashboard app
            if (window.location.hostname === 'localhost') {
                window.location.href = `http://localhost:3001/?token=${token}&username=${encodeURIComponent(username)}`;
            } else {
                window.location.href = `https://weath-up-dashboard.vercel.app/?token=${token}&username=${encodeURIComponent(username)}`;
            }
        } else {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleDemoLogin = async () => {
        setIsDemoLoading(true);
        try {
            // figuring out which backend to use
            const response = await axios.get(
                window.location.hostname === 'localhost'
                    ? 'http://localhost:3002/api/auth/visitor-login'
                    : 'https://weathup-finance-backend.onrender.com/api/auth/visitor-login'
            );

            const { token, username } = response.data;

            // keep demo session temporary
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("username", username);
            
             // send them to the dashboard app
            if (window.location.hostname === 'localhost') {
                window.location.href = `http://localhost:3001/?token=${token}&username=${encodeURIComponent(username)}`;
            } else {
                window.location.href = `https://weath-up-dashboard.vercel.app/?token=${token}&username=${encodeURIComponent(username)}`;
            }
        } catch (err) {
            console.error(err);
            setError('Unable to access demo account at this time.');
            setIsDemoLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="text-center mb-4 fw-bold">Login to WealthUp</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted">Email address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-muted">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mb-3" disabled={isLoginLoading || isDemoLoading}>
                                {isLoginLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleDemoLogin}
                                className="btn btn-outline-primary btn-lg w-100 fw-bold"
                                disabled={isLoginLoading || isDemoLoading}
                            >
                                {isDemoLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    "Try Demo Account"
                                )}
                            </button>
                        </form>

                        <hr className="my-4" />
                        <p className="text-center text-muted mb-0">
                            Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
