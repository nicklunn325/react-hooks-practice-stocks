import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, clickHandler }) {
  const renderStocks = stocks.map((stock) => (
    <Stock key={stock.id} clickHandler={clickHandler} stock={stock} />
  ));
  return (
    <div>
      <h2>Stocks</h2>
      {renderStocks}
    </div>
  );
}

export default StockContainer;
