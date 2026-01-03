import React, { useState, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";
import { watchlist } from "../data/data";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode, qty, price) => { },
  closeBuyWindow: () => { },
  watchlist: [],
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");
  const [defaultQty, setDefaultQty] = useState(1);
  const [defaultPrice, setDefaultPrice] = useState(0.0);
  
  const [currentWatchlist, setCurrentWatchlist] = useState(watchlist);

  // Global Price Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWatchlist(prevList =>
        prevList.map(stock => {
          const change = (Math.random() - 0.5) * 2; 
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
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  const handleOpenBuyWindow = (uid, mode = "BUY", qty = 1, price = 0.0) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setOrderMode(mode);
    setDefaultQty(qty);
    setDefaultPrice(price); 
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
    setDefaultPrice(0.0);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        watchlist: currentWatchlist,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} mode={orderMode} qty={defaultQty} price={defaultPrice} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
