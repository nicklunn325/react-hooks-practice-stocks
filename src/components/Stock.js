import React from "react";

function Stock({ stock, clickHandler }) {
  function handleClick() {
    clickHandler(stock);
    // setPortfolio((prevState) => {
    //   const inPortfolio = prevState.includes(stock);
    //   if (inPortfolio) {
    //     return prevState;
    //   } else {
    //     return [...prevState, stock];
    //   }
    // });
  }
  return (
    <div onClick={handleClick}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">{stock.price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
