import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await auth.login(email, password);

        if (success) {
            navigate('/'); // Redirect to the dashboard home
        } else {
            alert('Login failed. Check credentials.');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="text-center mb-4 fw-bold">Login to Dashboard</h2>
                        <form onSubmit={handleSubmit}>
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
                                    placeholder="Enter password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">Login</button>
                        </form>
                        <hr className="my-4" />
                        <div className="text-center">
                            <p className="text-muted mb-2">
                                Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold">Sign Up</Link>
                            </p>
                            <a href="http://localhost:3000" className="text-decoration-none small text-secondary">
                                <i className="fa fa-arrow-left me-1"></i> Return to main website
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;