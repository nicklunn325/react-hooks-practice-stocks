import { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState("All");
  function fetchStocks() {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((stockData) => setStocks(stockData));
  }
  useEffect(fetchStocks, []);

  function buyStock(stock) {
    console.log("BUY");
    setPortfolio((prevState) => {
      const inPortfolio = prevState.includes(stock);
      if (inPortfolio) {
        return prevState;
      } else {
        return [...prevState, stock];
      }
    });
  }

  function sellStock(stock) {
    console.log("SELL");
    setPortfolio((prevState) =>
      prevState.filter((item) => item.id !== stock.id)
    );
  }

  function sortStocks(stocks) {
    if (sort === "Price") {
      return stocks.sort((a, b) => b.price - a.price);
    } else if (sort === "Alphabetically") {
      return stocks.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return stocks;
    }
  }

  function filterStocks(stocks) {
    if (filter === "All") {
      return stocks;
    } else {
      return stocks.filter((stock) => stock.type === filter);
    }
  }

  function sortAndFilterStocks() {
    let sorted = sortStocks(stocks);
    return filterStocks(sorted);
  }

  return (
    <div>
      <SearchBar setSort={setSort} setFilter={setFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={sortAndFilterStocks()}
            clickHandler={buyStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} clickHandler={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

// Render all the stocks onto the page. The styling of how a Stock should look like is already in the Stock component.

// 1. Determine where stocks state should live - if you are unsure, state goes in App
// 2. useEffect to fetch stocks and useState to store stocks
// 3. pass stocks to StockContainer
// 4. render Stock components for each stock

// Allow a user to buy a stock by clicking on it and when it is bought, it should be added to MyPortfolio.

// 1. Create a separate state to store portfolio stocks in an array
// 2. Pass function to update portfolio state down to individual stock via StockContainer
// 3. Update state only if portfolio doesn't contain stock
// 4. Pass portfolio stocks to PortfolioContainer
// 5. render Stock components for each portfolio stock

// Allow a user to sell a stock in their Portfolio by clicking on the stock and it should be removed from their Portfolio.

// 1. Pass function to update portfolio state down to individual stock via PortfolioContainer
// 2. Update state with filtered portfolio array

// Allow a user to sort the list of stocks alphabetically by the ticker name as well as by ascending price.

// 1. store a sort value in state
// 2. use state value to sort stocks before passing to StockContainer
// 3. update sort state value

// Allow a user to filter stocks based on the type of the stock.

// 1. store a filter value in state
// 2. update filter value in state when user changes filter dropdown
