import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [currentWatchlist, setCurrentWatchlist] = useState(watchlist);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWatchlist(prevList =>
        prevList.map(stock => {
          const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
          const newPrice = stock.price + change;
          const isDown = change < 0;
          return {
            ...stock,
            price: newPrice,
            isDown: isDown,
            percent: (isDown ? "" : "+") + (Math.abs(change / stock.price) * 100).toFixed(2) + "%"
          };
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredWatchlist = currentWatchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const data = {
    labels: filteredWatchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: filteredWatchlist.map((stock) => stock.price),

        backgroundColor: [
          "rgba(61, 90, 254, 0.7)",
          "rgba(0, 200, 83, 0.7)",
          "rgba(255, 61, 0, 0.7)",
          "rgba(170, 0, 255, 0.7)",
          "rgba(0, 184, 212, 0.7)",
          "rgba(255, 214, 0, 0.7)",
        ],
        borderColor: [
          "#3d5afe",
          "#00c853",
          "#ff3d00",
          "#aa00ff",
          "#00b8d4",
          "#ffd600",
        ],
        borderWidth: 2,

      },
    ],
  };

  // export const data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  // datasets: [
  //   {
  //     label: "# of Votes",
  //     data: [12, 19, 3, 5, 2, 3],
  //     backgroundColor: [
  //       "rgba(255, 99, 132, 0.2)",
  //       "rgba(54, 162, 235, 0.2)",
  //       "rgba(255, 206, 86, 0.2)",
  //       "rgba(75, 192, 192, 0.2)",
  //       "rgba(153, 102, 255, 0.2)",
  //       "rgba(255, 159, 64, 0.2)",
  //     ],
  //     borderColor: [
  //       "rgba(255, 99, 132, 1)",
  //       "rgba(54, 162, 235, 1)",
  //       "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 1)",
  //       "rgba(153, 102, 255, 1)",
  //       "rgba(255, 159, 64, 1)",
  //     ],
  //     borderWidth: 1,
  //   },
  // ],
  // };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="counts"> {filteredWatchlist.length} / {watchlist.length}</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>


      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent text-muted">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down fs-5" />
          ) : (
            <KeyboardArrowUp className="up fs-5" />
          )}
          <span className="price fw-semibold ms-2">{stock.price.toFixed(2)}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>

  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, "BUY");
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(uid, "SELL");
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleSellClick}
        >
          <button className="sell">Sell</button>
        </Tooltip>
      </span>

    </span>
  );
};
