import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [variations, setVariations] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://weathup-finance.onrender.com/allHoldings", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setAllHoldings(res.data);
        // Initialize variations for each stock
        const initialVars = {};
        res.data.forEach(stock => {
            initialVars[stock.name] = 0;
        });
        setVariations(initialVars);
      })
      .catch(err => console.error("Error fetching holdings", err));

    // Individual live variation effect
    const interval = setInterval(() => {
        setVariations(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(name => {
                // Random change between -0.5 and +0.5 for each stock individually
                next[name] = next[name] + (Math.random() * 1 - 0.5);
            });
            return next;
        });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Calculate stats based on individual variations
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + (stock.avg > 0 ? stock.avg : stock.price) * stock.qty,
    0
  );

  const currentValue = allHoldings.reduce(
    (acc, stock) => {
        const livePrice = Math.max(1.0, stock.price + (variations[stock.name] || 0));
        return acc + livePrice * stock.qty;
    },
    0
  );
  
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;


  const labels = allHoldings.map((stock) => stock.name);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Current Market Price",
        data: allHoldings.map((stock) => stock.price + (variations[stock.name] || 0)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
          label: "Average Cost Price",
          data: allHoldings.map((stock) => stock.avg),
          backgroundColor: "rgba(61, 90, 254, 0.5)",
          borderColor: "rgba(61, 90, 254, 1)",
          borderWidth: 1,
      }
    ],
  };

  return (
    <div className="holdings-page animate__animated animate__fadeIn px-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold m-0">Portfolio Holdings ({allHoldings.length})</h3>
          <div className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold">
            Live Market Active
          </div>
      </div>

      {/* Main Stats Row - Highly Visible Total Investment */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <p className="text-muted small fw-bold text-uppercase mb-2">Total Investment</p>
                <h2 className="fw-bold m-0">₹ {totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <p className="text-muted small fw-bold text-uppercase mb-2">Current Value</p>
                <h2 className="fw-bold m-0 transition-all text-primary">₹ {currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <p className="text-muted small fw-bold text-uppercase mb-2">Total P&L</p>
                <h2 className={`fw-bold m-0 transition-all ${totalPnL >= 0 ? "text-success" : "text-danger"}`}>
                    ₹ {totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2 })} 
                    <span className="fs-5 ms-2">({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%)</span>
                </h2>
            </div>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded-4 bg-white p-2 mb-5 border">
        <table className="table table-hover mb-0 align-middle">
          <thead className="bg-light">
            <tr>
              <th className="border-0 small text-uppercase text-secondary py-3 px-3">Instrument</th>
              <th className="border-0 small text-uppercase text-secondary text-center">Qty.</th>
              <th className="border-0 small text-uppercase text-secondary text-end">Avg. cost</th>
              <th className="border-0 small text-uppercase text-secondary text-end">LTP (Live)</th>
              <th className="border-0 small text-uppercase text-secondary text-end">Cur. val</th>
              <th className="border-0 small text-uppercase text-secondary text-end px-3">P&L</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.length === 0 ? (
                <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">No holdings found in your portfolio.</td>
                </tr>
            ) : (
                allHoldings.map((stock, index) => {
                  const livePrice = Math.max(1.0, stock.price + (variations[stock.name] || 0));
                  const curValue = livePrice * stock.qty;
                  const investment = (stock.avg > 0 ? stock.avg : stock.price) * stock.qty;
                  const isProfit = curValue - investment >= 0;
                  
                  return (
                    <tr key={index}>
                      <td className="fw-bold px-3 text-dark">{stock.name}</td>
                      <td className="text-center">{stock.qty}</td>
                      <td className="text-end text-secondary">
                        {(stock.avg > 0 ? stock.avg : stock.price).toFixed(2)}
                      </td>
                      <td className="text-end text-primary fw-bold transition-all">{livePrice.toFixed(2)}</td>
                      <td className="text-end fw-semibold">{(curValue).toFixed(2)}</td>
                      <td className={`text-end fw-bold px-3 transition-all ${isProfit ? "text-success" : "text-danger"}`}>
                        {(curValue - investment).toFixed(2)}
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>

      <div className="graph-card-container bg-white p-5 rounded-4 shadow-sm border mt-5 mx-auto" style={{maxWidth: "1000px"}}>
        <p className="text-center fw-bold text-muted text-uppercase small mb-4">Holdings Performance Visualization</p>
        <VerticalGraph data={chartData} />
      </div>
    </div>
  );
};

export default Holdings;
