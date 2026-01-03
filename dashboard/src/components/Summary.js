import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Summary = () => {
  const username = localStorage.getItem("username") || "User";
  const equityBalance = parseFloat(localStorage.getItem("equityBalance")) || 0.00;

  const [allHoldings, setAllHoldings] = useState([]);
  const [variations, setVariations] = useState({});
  const [marketPulse, setMarketPulse] = useState({ sentiment: 72, trend: "Stable" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const baseURL = window.location.hostname === 'localhost' ? "http://localhost:3002" : "https://weathup-finance-backend.onrender.com";
    
    axios
      .get(`${baseURL}/allHoldings`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setAllHoldings(res.data);
        const initialVars = {};
        res.data.forEach(stock => {
            initialVars[stock.name] = 0;
        });
        setVariations(initialVars);
      })
      .catch(err => console.error("Error fetching summary data", err));

    const interval = setInterval(() => {
        setVariations(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(name => {
                next[name] = next[name] + (Math.random() * 2 - 1);
            });
            return next;
        });
        
        // Randomize market pulse slightly
        setMarketPulse(prev => ({
            sentiment: Math.min(100, Math.max(0, prev.sentiment + (Math.random() * 4 - 2))),
            trend: Math.random() > 0.5 ? "Bullish" : "Correcting"
        }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalInvestment = allHoldings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentValue = allHoldings.reduce((acc, stock) => acc + (stock.price + (variations[stock.name] || 0)) * stock.qty, 0);
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  // Calculate Diversification Score
  const uniqueSectors = new Set(allHoldings.map(s => s.name)).size;
  const diversificationScore = Math.min(100, (uniqueSectors / 10) * 100);

  const chartData = {
    labels: allHoldings.map(s => s.name),
    datasets: [
      {
        label: "Market Price",
        data: allHoldings.map(s => s.price + (variations[s.name] || 0)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Average Cost",
        data: allHoldings.map(s => s.avg),
        backgroundColor: "rgba(61, 90, 254, 0.5)",
      }
    ],
  };

  return (
    <div className="summary-container animate__animated animate__fadeIn px-4">
      <div className="username-header mb-4 mt-2 d-flex justify-content-between align-items-center">
        <div>
            <h2 className="fw-bold m-0">Dashboard Overview</h2>
            <p className="text-muted small">Welcome back, <span className="text-primary fw-bold">{username}</span></p>
        </div>
        <div className="pulse-indicator bg-white shadow-sm border px-3 py-2 rounded-pill d-flex align-items-center gap-3">
             <span className="small fw-bold text-muted">MARKET PULSE</span>
             <div className="progress" style={{width: "100px", height: "8px"}}>
                <div className="progress-bar bg-success" style={{width: `${marketPulse.sentiment}%`}}></div>
             </div>
             <span className={`small fw-bold ${marketPulse.sentiment > 50 ? "text-success" : "text-danger"}`}>
                {marketPulse.sentiment > 50 ? "BULLISH" : "BEARISH"}
             </span>
        </div>
      </div>

      <div className="row g-4 mb-4">
          <div className="col-lg-8">
              {/* Investment Overview Card */}
              <div className="summary-card shadow-sm border p-4 bg-white rounded-4 h-100">
                <p className="text-muted small fw-bold text-uppercase mb-4">Wallet & Margins</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="main-stat">
                    <h1 className="fw-bold display-4 mb-0 text-dark">₹ {equityBalance.toLocaleString()}</h1>
                    <p className="text-muted small">Total Available Margin</p>
                  </div>
                  <div className="sub-stats pe-lg-5">
                    <div className="mb-3 d-flex justify-content-between gap-5 border-bottom pb-2">
                      <span className="text-secondary">Margins used</span>
                      <span className="fw-bold">0.00</span>
                    </div>
                    <div className="d-flex justify-content-between gap-5">
                      <span className="text-secondary">Opening balance</span>
                      <span className="fw-bold text-dark">{(equityBalance/1000).toFixed(2)}k</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div className="col-lg-4">
              {/* Unique WealthBot Insight Card */}
              <div className="summary-card shadow-sm border p-4 bg-primary text-white rounded-4 h-100">
                <p className="small fw-bold text-uppercase mb-4 opacity-75">WealthBot Pro Insight</p>
                <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-start gap-3">
                        <i className="fa fa-robot fs-2"></i>
                        <p className="m-0 small leading-tight">
                            Your portfolio currently has a <strong>{diversificationScore.toFixed(0)}%</strong> diversification score. 
                            {diversificationScore < 50 ? " Adding blue-chip IT stocks could lower your risk." : " You are well-diversified across sectors."}
                        </p>
                    </div>
                    <div className="mt-2 pt-3 border-top border-white border-opacity-25">
                        <p className="m-0 small fw-bold">Daily Alpha Tip:</p>
                        <p className="m-0 extra-small opacity-75">Increased institutional buying noted in <span className="fw-bold">RELIANCE</span>. Watch for breakout.</p>
                    </div>
                </div>
              </div>
          </div>
      </div>

      <div className="row g-4 mb-4">
          <div className="col-lg-12">
              {/* Holdings Card */}
              <div className="summary-card shadow-sm border p-4 bg-white rounded-4">
                <p className="text-muted small fw-bold text-uppercase mb-4">Portfolio Performance ({allHoldings.length})</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="main-stat">
                    <h1 className={`fw-bold display-5 mb-0 transition-all ${totalPnL >= 0 ? "text-success" : "text-danger"}`}>
                      ₹ {(totalPnL).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      <span className="fs-3 ms-2">({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%)</span>
                    </h1>
                    <p className="text-muted small">Live Profit & Loss (Unrealized)</p>
                  </div>
                  <div className="sub-stats pe-lg-5">
                    <div className="mb-3 d-flex justify-content-between gap-5 border-bottom pb-2">
                      <span className="text-secondary">Total Investment</span>
                      <span className="fw-bold text-dark">₹ {(totalInvestment).toLocaleString()}</span>
                    </div>
                    <div className="mb-1 d-flex justify-content-between gap-5 border-bottom pb-2">
                      <span className="text-secondary">Market Value</span>
                      <span className="fw-bold transition-all text-primary">₹ {(currentValue).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>

      {/* Bar Graph Section */}
      <div className="summary-card shadow-sm border p-4 bg-white rounded-4 overflow-hidden mb-5">
        <div className="card-header bg-white border-0 p-0 mb-4 d-flex justify-content-between align-items-center">
            <p className="text-muted small fw-bold text-uppercase m-0">Sectoral Distribution Analysis</p>
            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-3 fw-bold">
                <i className="fa fa-circle me-1 small"></i> Live Feed
            </span>
        </div>
        <div style={{height: "350px", width: "100%"}}>
             <VerticalGraph data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
