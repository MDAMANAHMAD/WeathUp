import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { watchlist } from "../data/data";

const BuyActionWindow = ({ uid, mode, qty, price }) => {
  const { closeBuyWindow, watchlist } = useContext(GeneralContext); // Get dynamic watchlist
  const stockData = watchlist.find(s => s.name === uid);
  
  const [stockQuantity, setStockQuantity] = useState(qty || 1); 
  const [stockPrice, setStockPrice] = useState(price || (stockData ? stockData.price : 0.0));

  // Sync price with dynamic watchlist updates
  useEffect(() => {
    if (stockData) {
        setStockPrice(stockData.price);
    }
  }, [stockData, watchlist]); // Update whenever watchlist changes

  const handleOrderClick = (e) => {
    e.preventDefault();
    
    // 1. Margin Check
    const currentBalance = parseFloat(localStorage.getItem("equityBalance")) || 0;
    const requiredMargin = parseInt(stockQuantity) * parseFloat(stockPrice);
    
    if (mode === "BUY" && requiredMargin > currentBalance) {
        alert(`Insufficient funds! Required: ₹${requiredMargin.toFixed(2)}, Available: ₹${currentBalance.toFixed(2)}`);
        return;
    }

    const token = localStorage.getItem("token");
    const baseURL = window.location.hostname === 'localhost' ? "http://localhost:3002" : "https://weathup-finance-backend.onrender.com";
    
    axios.post(
      `${baseURL}/newOrder`,
      {
        name: uid,
        qty: parseInt(stockQuantity),
        price: parseFloat(stockPrice),
        mode: mode,
      },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    )
    .then(() => {
        alert(`${mode === "BUY" ? "Buy" : "Sell"} order placed successfully!`);
        
        // 2. Deduct Funds Locally for Instant Feedback
        if (mode === "BUY") {
            const newBalance = currentBalance - requiredMargin;
            localStorage.setItem("equityBalance", newBalance);
        } else if (mode === "SELL") {
            // Logic to add funds on sell could go here if the backend doesn't handle it
             const newBalance = currentBalance + requiredMargin;
             localStorage.setItem("equityBalance", newBalance);
        }

        closeBuyWindow();
        window.location.reload(); // Reload to refresh orders/holdings
    })
    .catch(err => {
        console.error("Order failed", err);
        // Show actual server error if available
        const serverMsg = err.response?.data?.msg || err.message;
        alert(`Order Failed: ${serverMsg}`);
    });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    closeBuyWindow();
  };

  const isBuy = mode === "BUY";

  return (
    <div className={`container ${isBuy ? "buy-mode" : "sell-mode"}`} id="buy-window">
      <div className="header p-3 text-white d-flex justify-content-between align-items-center" style={{ background: isBuy ? "#3d5afe" : "#ff3d00" }}>
          <h5 className="m-0 fw-bold">{isBuy ? "Buy" : "Sell"} {uid}</h5>
          <button className="btn text-white fs-4 p-0" onClick={closeBuyWindow}>&times;</button>
      </div>
      <div className="regular-order p-4">
        <div className="inputs d-flex gap-3 mb-4">
          <fieldset className="flex-fill">
            <legend className="small text-muted px-2">Qty.</legend>
            <input
              type="number"
              className="form-control border-0 shadow-none fw-bold"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset className="flex-fill">
            <legend className="small text-muted px-2">Price</legend>
            <input
              type="number"
              step="0.05"
              className="form-control border-0 shadow-none fw-bold"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
            <span className="small text-muted">Margin req. ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
            <div className="d-flex gap-2">
                <button 
                  className={`btn fw-bold px-4 ${isBuy ? "btn-blue" : "btn-danger"}`} 
                  onClick={handleOrderClick}
                  style={{ background: isBuy ? "#3d5afe" : "#ff3d00", color: "white" }}
                >
                    {isBuy ? "Buy" : "Sell"}
                </button>
                <button className="btn btn-secondary fw-bold px-3 text-white" onClick={handleCancelClick}>
                    Cancel
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
