import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm border-bottom">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="fa fa-chart-line text-primary me-2 fs-3"></i> 
                    <span className="fw-bold fs-4" style={{ letterSpacing: '-0.5px' }}>
                        <span className="text-dark">Wealth</span>
                        <span className="text-primary">Up</span> 
                    </span>
                </Link>

                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link text-dark fw-semibold" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark fw-semibold" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark fw-semibold" to="/pricing">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark fw-semibold" to="/support">Support</Link>
                        </li>
                        
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item ms-lg-3">
                                    <Link className="nav-link text-dark fw-semibold" to="/login">Login</Link>
                                </li>
                                <li className="nav-item ms-lg-3">
                                    <Link className="btn btn-primary px-4 py-2" to="/signup">Signup</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item ms-lg-3">
                                    <span className="nav-link text-muted pe-none">Hi, {user?.username}</span>
                                </li>
                                <li className="nav-item ms-lg-2">
                                    <a 
                                        className="btn btn-outline-primary px-3 py-2" 
                                        href={window.location.hostname === 'localhost' 
                                            ? `http://localhost:3001/?token=${localStorage.getItem('token')}&username=${encodeURIComponent(localStorage.getItem('username'))}`
                                            : `https://weath-up-dashboard.vercel.app/?token=${localStorage.getItem('token')}&username=${encodeURIComponent(localStorage.getItem('username'))}`
                                        }
                                    >
                                        Dashboard
                                    </a>
                                </li>

                                <li className="nav-item ms-lg-2">
                                    <button className="btn btn-link text-danger text-decoration-none fw-semibold" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

