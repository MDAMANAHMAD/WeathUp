import React, { useState, useEffect } from "react";

const Funds = () => {
  const initialBalance = parseFloat(localStorage.getItem("equityBalance")) || 3740.00;
  const initialMF = parseFloat(localStorage.getItem("mfInvestment")) || 0.00;

  const [balance, setBalance] = useState(initialBalance);
  const [mfInvestment, setMfInvestment] = useState(initialMF);

  useEffect(() => {
    localStorage.setItem("equityBalance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("mfInvestment", mfInvestment);
  }, [mfInvestment]);

  const handleAddFunds = () => {
    const amount = window.prompt("Enter amount to deposit:", "1000");
    if (amount && !isNaN(amount)) {
        setBalance(prev => prev + parseFloat(amount));
        alert("Funds added successfully!");
    }
  };

  const handleWithdraw = () => {
    const amount = window.prompt("Enter amount to withdraw:", "500");
    if (amount && !isNaN(amount)) {
        if (parseFloat(amount) > balance) {
            alert("Insufficient balance!");
        } else {
            setBalance(prev => prev - parseFloat(amount));
            alert("Withdrawal request submitted!");
        }
    }
  };

  const handleInvestMF = () => {
    const amount = window.prompt("Enter amount to invest in Mutual Funds:", "500");
    if (amount && !isNaN(amount)) {
        if (parseFloat(amount) > balance) {
            alert("Insufficient balance!");
        } else {
            setBalance(prev => prev - parseFloat(amount));
            setMfInvestment(prev => prev + parseFloat(amount));
            alert("Invested in Mutual Funds successfully!");
        }
    }
  };

  return (
    <div className="funds-page animate__animated animate__fadeIn px-4">
      <h3 className="fw-bold mb-4">Funds & Wallet</h3>

      <div className="row g-4">
        {/* Equity Column */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
            <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
              <span className="fw-bold text-muted small text-uppercase">Equity / Cash Balance</span>
              <button className="btn btn-primary fw-bold" onClick={handleAddFunds}>
                <i className="fa fa-plus me-2"></i>Add Funds
              </button>
            </div>
            <div className="card-body p-4 d-flex flex-column">
              <div className="d-flex flex-column gap-4 mt-2 mb-4">
                <div className="d-flex justify-content-between border-bottom pb-3 align-items-center">
                  <span className="text-secondary fs-5">Available margin</span>
                  <span className="fw-bold h2 m-0 text-primary">₹ {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-3">
                  <span className="text-secondary">Used margin</span>
                  <span className="fw-bold fs-5">₹ 0.00</span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-3">
                    <span className="text-secondary">Available cash</span>
                    <span className="fw-bold fs-5 text-dark">₹ {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="mt-auto d-flex gap-3">
                  <button className="btn btn-outline-primary flex-fill fw-bold py-3 fs-5" onClick={handleWithdraw}>
                    Withdraw
                  </button>
                  <button className="btn btn-outline-secondary flex-fill fw-bold py-3 fs-5" disabled title="Will be available after your first trade settlement">
                    Statement
                  </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mutual Funds / Alternative Column */}
        <div className="col-lg-6">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
                <div className="card-header bg-white border-0 pt-4 px-4">
                    <span className="fw-bold text-muted small text-uppercase">Mutual Funds Investment</span>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                    <div className="bg-light p-4 rounded-4 mb-4 text-center">
                        <p className="text-muted small mb-1">Current MF Portfolio Value</p>
                        <h2 className="fw-bold text-success mb-0">₹ {mfInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                    </div>
                    
                    <div className="insight-box p-3 bg-primary-subtle rounded-3 mb-4">
                        <p className="small text-primary m-0">
                            <strong><i className="fa fa-lightbulb me-2"></i>WealthUp Suggestion:</strong> 
                            Based on your equity risk, we recommend adding a 'Conservative Debt Fund' to balance your portfolio volatility.
                        </p>
                    </div>

                    <div className="mt-auto">
                        <button className="btn btn-primary w-100 fw-bold py-3 fs-5 shadow-sm" onClick={handleInvestMF}>
                            Invest in Mutual Funds
                        </button>
                        <p className="text-center text-muted extra-small mt-3">
                            <i className="fa fa-info-circle me-1"></i> Direct plans only. 0% brokerage.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-5 p-4 bg-white rounded-4 border-0 shadow-sm">
        <div className="d-flex align-items-center gap-3 mb-3">
            <div className="bg-success-subtle p-2 rounded-circle">
                <i className="fa fa-shield-alt text-success fs-4"></i>
            </div>
            <h5 className="fw-bold m-0">Institutional Grade Security</h5>
        </div>
        <div className="row">
            <div className="col-md-8">
                <p className="text-muted small mb-0">
                    WealthUp uses 256-bit encryption for all data and partners only with SEBI-regulated banking entities. 
                    Your funds are held in specialized client-escrow accounts for maximum safety.
                </p>
            </div>
            <div className="col-md-4 text-end">
                <button className="btn btn-link text-decoration-none text-primary fw-bold small">Audit Reports</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
