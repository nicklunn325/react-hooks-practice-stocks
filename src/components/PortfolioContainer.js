import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, clickHandler }) {
  const renderPortfolio = portfolio.map((stock) => (
    <Stock clickHandler={clickHandler} stock={stock} />
  ));
  return (
    <div>
      <h2>My Portfolio</h2>
      {renderPortfolio}
    </div>
  );
}

export default PortfolioContainer;
