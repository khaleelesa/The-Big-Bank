import React, { Component } from "react";
import Transaction from "./Transaction";
import "../styles/Transactions.css";
class Transactions extends Component {
  render() {
    let transactions = this.props.transactions;
    return (
      <div className="Transctions">
        {this.props.balance > 500 ? (
          <div className="balanceText">
            Total Balance: <span className="balance">{this.props.balance}</span>
          </div>
        ) : (
          <div className="balanceText">
            Total Balance:{" "}
            <span className="nigitveBalance">{this.props.balance}</span>
          </div>
        )}
        {transactions.map((t) => {
          return (
            <Transaction
              transaction={t}
              key={t._id}
              deleteTransaction={this.props.deleteTransaction}
            />
          );
        })}
      </div>
    );
  }
}

export default Transactions;
