import React, { Component } from "react";
import "../styles/Transaction.css";
class Transaction extends Component {
  deleteTransaction = (id) => {
    this.props.deleteTransaction(id);
  };
  render() {
    const transaction = this.props.transaction;
    return (
      <div className="transaction">
        <span className="title">{transaction.id}</span>
        <ul class="TransactionList">
          <li>Vendor: {transaction.vendor}</li>
          {transaction.type === "deposite" ? (
            <li>
              Amount: <span className="postive">{transaction.amount}</span>
            </li>
          ) : (
            <li>
              Amount: <span className="nigtive">-{transaction.amount}</span>
            </li>
          )}
          <li>Category: {transaction.category}</li>
          <button
            class="deleteButton"
            onClick={() => this.deleteTransaction(transaction._id)}
          >
            Delete Transaction
          </button>
        </ul>
      </div>
    );
  }
}

export default Transaction;
