import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await auth.signup(username, email, password);

        if (success) {
            navigate('/'); // Redirect to the dashboard home
        } else {
            alert('Signup failed. User may already exist.');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="text-center mb-4 fw-bold">Join WealthUp</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted">Username</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder="Choose username"
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
                                    placeholder="Enter email"
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
                                    placeholder="Create password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-lg w-100 fw-bold">Create Free Account</button>
                        </form>
                        <hr className="my-4" />
                        <div className="text-center">
                            <p className="text-muted mb-2">
                                Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login</Link>
                            </p>
                            <a href="https://weathup-frontend-portal.vercel.app" className="text-decoration-none small text-secondary">
                                <i className="fa fa-arrow-left me-1"></i> Return to main website
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Signup;