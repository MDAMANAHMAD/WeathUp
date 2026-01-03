import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const baseURL = window.location.hostname === 'localhost' ? "http://localhost:3002" : "https://weathup-finance-backend.onrender.com";

    axios
      .get(`${baseURL}/allOrders`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders", err));
  }, []);

  return (
    <div className="orders-page">
      <h3 className="title">Orders ({allOrders.length})</h3>

      {allOrders.length === 0 ? (
        <div className="no-orders text-center mt-5">
          <p className="text-muted">You haven't placed any orders today</p>
          <Link to={"/"} className="btn btn-blue mt-3">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Instrument</th>
                <th>Type</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td>{new Date().toLocaleTimeString()}</td>
                  <td>{order.name}</td>
                  <td>
                    <span className={order.mode === "BUY" ? "up" : "down"}>
                      {order.mode}
                    </span>
                  </td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td>
                    <span className="badge bg-success-subtle text-success px-2 py-1 rounded">
                      COMPLETED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
