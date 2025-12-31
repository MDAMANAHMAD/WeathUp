import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TopBar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const username = user?.username || "User";


  const avatarChar = username[0].toUpperCase();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="topbar-container bg-white border-bottom shadow-sm py-2 px-4 d-flex align-items-center justify-content-between sticky-top">
      {/* Brand */}
      <div className="branding d-flex align-items-center gap-2">
        <div className="bg-primary rounded-3 p-2 d-flex align-items-center justify-content-center" style={{width: "40px", height: "40px"}}>
            <i className="fa fa-chart-line text-white fs-5"></i>
        </div>
        <span className="fw-bold fs-4 text-dark letter-tight">WealthUp</span>
      </div>

      {/* Navigation */}
      <nav className="dashboard-nav d-flex align-items-center gap-1">
        <Link to="/" className={`nav-link px-3 py-2 rounded-3 fw-semibold transition-all ${isActive("/") ? "bg-primary-subtle text-primary" : "text-muted"}`}>
          Dashboard
        </Link>
        <Link to="/orders" className={`nav-link px-3 py-2 rounded-3 fw-semibold transition-all ${isActive("/orders") ? "bg-primary-subtle text-primary" : "text-muted"}`}>
          Orders
        </Link>
        <Link to="/holdings" className={`nav-link px-3 py-2 rounded-3 fw-semibold transition-all ${isActive("/holdings") ? "bg-primary-subtle text-primary" : "text-muted"}`}>
          Holdings
        </Link>
        <Link to="/positions" className={`nav-link px-3 py-2 rounded-3 fw-semibold transition-all ${isActive("/positions") ? "bg-primary-subtle text-primary" : "text-muted"}`}>
          Positions
        </Link>
        <Link to="/funds" className={`nav-link px-3 py-2 rounded-3 fw-semibold transition-all ${isActive("/funds") ? "bg-primary-subtle text-primary" : "text-muted"}`}>
          Funds
        </Link>
      </nav>

      {/* User Actions - Optimized for Visibility */}
      <div className="user-section d-flex align-items-center gap-4">
        <div className="d-flex align-items-center gap-3 border-end pe-4">
            <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: "38px", height: "38px", fontSize: "1.1rem" }}>
            {avatarChar}
            </div>
            <div className="user-info d-flex flex-column">
                <span className="fw-bold text-dark mb-0" style={{fontSize: "0.9rem"}}>{username}</span>
                <span className="text-muted extra-small fw-bold">PRO ACCOUNT</span>
            </div>
        </div>
        
        <button 
            onClick={logout}
            className="btn btn-outline-danger fw-bold btn-sm px-3 rounded-pill d-flex align-items-center gap-2 shadow-sm"
        >
            <i className="fa fa-sign-out-alt"></i>
            LOGOUT
        </button>
      </div>
    </div>
  );
};

export default TopBar;
