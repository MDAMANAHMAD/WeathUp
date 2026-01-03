import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Analytics = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [sectorData, setSectorData] = useState(null);
  const [stockWeights, setStockWeights] = useState(null);

  // Simple Sector Mapping
  const sectorMap = {
    "BHARTIARTL": "Telecom",
    "HDFCBANK": "Finance",
    "HINDUNILVR": "FMCG",
    "INFY": "Technology",
    "ITC": "FMCG",
    "KPITTECH": "Technology",
    "M&M": "Automobile",
    "RELIANCE": "Energy",
    "SBIN": "Finance",
    "SGBMAY29": "Gold",
    "TATAPOWER": "Power",
    "TCS": "Technology",
    "WIPRO": "Technology",
    "ONGC": "Energy",
    "QUICKHEAL": "Technology",
  };

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
        processAnalytics(res.data);
      })
      .catch(err => console.error("Error fetching holdings", err));
  }, []);

  const processAnalytics = (data) => {
    const sectors = {};
    const stockValues = [];
    const labels = [];

    data.forEach(stock => {
      const sector = sectorMap[stock.name] || "Others";
      const value = stock.price * stock.qty;
      
      // Sector Allocation
      sectors[sector] = (sectors[sector] || 0) + value;

      // Stock Weights
      labels.push(stock.name);
      stockValues.push(value);
    });

    // Prepare Pie Chart Data (Sectors)
    setSectorData({
      labels: Object.keys(sectors),
      datasets: [
        {
          label: 'Portfolio Value (₹)',
          data: Object.values(sectors),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(199, 199, 199, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });

    // Prepare Bar Chart Data (Weights)
    setStockWeights({
      labels: labels,
      datasets: [
        {
            label: 'Investment Value (₹)',
            data: stockValues,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        }
      ]
    });
  };

  // AI "Analysis" Text Generator
  const getAIInsight = () => {
    if (!sectorData) return "Analyzing your portfolio...";
    
    // Find biggest sector
    const sectors = sectorData.labels;
    const values = sectorData.datasets[0].data;
    const maxVal = Math.max(...values);
    const maxSectorIndex = values.indexOf(maxVal);
    const maxSector = sectors[maxSectorIndex];
    const totalVal = values.reduce((a, b) => a + b, 0);
    const percent = ((maxVal / totalVal) * 100).toFixed(1);

    if (maxSector === "Technology" && percent > 40) {
      return "Wei (WealthAI): Your portfolio is heavily aggregated in Technology (" + percent + "%). While high-growth, this exposes you to sector-specific volatility. Consider diversifying into FMCG or Gold for stability.";
    } else if (maxSector === "Finance" && percent > 40) {
      return "Wei (WealthAI): You have significant exposure to Financials (" + percent + "%). Regulatory changes could impact your returns. A mix of Manufacturing or Energy stocks could balance this risk.";
    } else {
      return "Wei (WealthAI): Your portfolio shows a decent diversification leader in " + maxSector + " (" + percent + "%). Keep monitoring quarterly results for rebalancing opportunities.";
    }
  };

  return (
    <div className="analytics-page p-4 animate__animated animate__fadeIn">
        <h2 className="fs-4 fw-bold mb-4">
            <i className="fa fa-chart-pie me-2 text-primary"></i> 
            WealthUp IQ Analytics
        </h2>

        {/* AI Insight Banner */}
        <div className="alert alert-primary d-flex align-items-start shadow-sm border-0 rounded-3 p-4 mb-5" role="alert">
            <i className="fa fa-robot fs-1 me-4 mt-1"></i>
            <div>
                <h4 className="alert-heading fw-bold">AI Portfolio Insight</h4>
                <p className="mb-0 fs-5">{getAIInsight()}</p>
            </div>
        </div>

        <div className="row g-4">
            {/* Sector Allocation */}
            <div className="col-md-6">
                <div className="card shadow-sm border-0 p-4 h-100 rounded-4">
                    <h5 className="card-title text-muted fw-bold mb-4">Sector Allocation</h5>
                    {sectorData ? (
                        <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                            <Doughnut data={sectorData} options={{ maintainAspectRatio: false }} />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>

            {/* Stock Weights */}
            <div className="col-md-6">
                 <div className="card shadow-sm border-0 p-4 h-100 rounded-4">
                    <h5 className="card-title text-muted fw-bold mb-4">Asset Weights</h5>
                    {stockWeights ? (
                         <div style={{ height: '300px' }}>
                            <Bar data={stockWeights} options={{ maintainAspectRatio: false, responsive: true }} />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Analytics;
