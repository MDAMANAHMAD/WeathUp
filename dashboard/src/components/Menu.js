import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const { logout } = useAuth();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <div className="menus d-flex align-items-center justify-content-between w-100 ps-4">
      <ul className="d-flex list-unstyled m-0 gap-4">
        <li>
          <Link to="/" onClick={() => handleMenuClick(0)} className="text-decoration-none">
            <p className={selectedMenu === 0 ? "menu selected m-0" : "menu m-0"}>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link to="/orders" onClick={() => handleMenuClick(1)} className="text-decoration-none">
            <p className={selectedMenu === 1 ? "menu selected m-0" : "menu m-0"}>Orders</p>
          </Link>
        </li>
        <li>
          <Link to="/holdings" onClick={() => handleMenuClick(2)} className="text-decoration-none">
            <p className={selectedMenu === 2 ? "menu selected m-0" : "menu m-0"}>Holdings</p>
          </Link>
        </li>
        <li>
          <Link to="/positions" onClick={() => handleMenuClick(3)} className="text-decoration-none">
            <p className={selectedMenu === 3 ? "menu selected m-0" : "menu m-0"}>Positions</p>
          </Link>
        </li>
        <li>
          <Link to="/funds" onClick={() => handleMenuClick(4)} className="text-decoration-none">
            <p className={selectedMenu === 4 ? "menu selected m-0" : "menu m-0"}>Funds</p>
          </Link>
        </li>
      </ul>

      <div className="profile d-flex align-items-center gap-3">
        <div className="avatar">
          {(localStorage.getItem("username") || "U")[0].toUpperCase()}
        </div>
        <span className="username fw-medium">
          {localStorage.getItem("username") || "User"}
        </span>
        <button 
          className="btn btn-sm btn-outline-danger border-0 d-flex align-items-center gap-2"
          onClick={logout}
        >
          <i className="fa fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
