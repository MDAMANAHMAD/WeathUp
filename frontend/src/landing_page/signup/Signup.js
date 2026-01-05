import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignupLoading, setIsSignupLoading] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSignupLoading(true);
        const success = await auth.signup(username, email, password);
        setIsSignupLoading(false);

        if (success) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            // Redirect based on environment
            if (window.location.hostname === 'localhost') {
                window.location.href = `http://localhost:3001/?token=${token}&username=${encodeURIComponent(username)}&isNewUser=true`;
            } else {
                window.location.href = `https://weath-up-dashboard.vercel.app/?token=${token}&username=${encodeURIComponent(username)}&isNewUser=true`;
            } 
        } else {
            setError('Signup failed. User may already exist or there was a server error.');
        }
    };


    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="text-center mb-4 fw-bold">Open a Free Account</h2>
                        <p className="text-center text-muted mb-4">Join over 1.5+ crore users investing with WealthUp</p>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted">Username</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder="Choose a username"
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>
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
                                    placeholder="Create a password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-lg w-100 fw-bold" disabled={isSignupLoading}>
                                {isSignupLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Signing Up...
                                    </>
                                ) : (
                                    "Sign Up for Free"
                                )}
                            </button>
                        </form>
                        <hr className="my-4" />
                        <p className="text-center text-muted mb-0">
                            Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
