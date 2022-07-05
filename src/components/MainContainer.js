import React, { useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = React.useState([]);
  const [portfolio, setPortfolio] = React.useState([]);
  const [sort, setSort] = React.useState(null);
  const [filter, setFilter] = React.useState(null);

  function fetchStocks() {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((stocksData) => setStocks(stocksData));
  }
  useEffect(fetchStocks, []);

  function buyStock(stock) {
    const alreadyOwned = portfolio.find((item) => item.id === stock.id);
    if (!alreadyOwned) {
      setPortfolio((prevState) => [...prevState, stock]);
    }
  }

  function sellStock(stock) {
    const newPortfolio = portfolio.filter((item) => item.id !== stock.id);
    setPortfolio(newPortfolio);
  }

  function sortStocks(stocks) {
    if (sort === "Alphabetically") {
      return stocks.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sort === "Price") {
      return stocks.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      return stocks;
    }
  }

  function filterStocks(stocks) {
    if (filter !== null) {
      return stocks.filter((stock) => stock.type === filter);
    } else {
      return stocks;
    }
  }

  function filterAndSortStocks(stocks) {
    let sorted = sortStocks(stocks);
    let filtered = filterStocks(sorted);
    return filtered;
  }

  return (
    <div>
      <SearchBar setFilter={setFilter} setSort={setSort} />
      <div className="row">
        <div className="col-8">
          {/* we pass clickHandler prop storing function buyStock to StockContainer component */}
          <StockContainer
            clickHandler={buyStock}
            stocks={filterAndSortStocks(stocks)}
          />
        </div>
        <div className="col-4">
          {/* we pass clickHandler prop storing function sellStock to PortfolioContainer component */}
          <PortfolioContainer clickHandler={sellStock} stocks={portfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
