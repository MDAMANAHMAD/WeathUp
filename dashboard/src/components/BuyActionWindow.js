import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

import { watchlist } from "../data/data";

const BuyActionWindow = ({ uid, mode, qty }) => {
  const stockData = watchlist.find(s => s.name === uid);
  const [stockQuantity, setStockQuantity] = useState(qty || 1); // Use prop or default 1
  const [stockPrice, setStockPrice] = useState(stockData ? stockData.price : 0.0);
  const { closeBuyWindow } = useContext(GeneralContext);


  const handleOrderClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.post(
      "https://weathup-finance.onrender.com/newOrder",
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
        closeBuyWindow();
        window.location.href = "/orders"; 
    })
    .catch(err => {
        console.error("Order failed", err);
        alert("Failed to place order. Check if you have sufficient holdings for selling.");
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
                <button className="btn btn-outline-secondary fw-bold" onClick={handleCancelClick}>
                    Cancel
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
