import React, { Component } from "react";
import "../styles/Operations.css";
const axios = require("axios");
class Operations extends Component {
  constructor() {
    super();
    this.state = {
      amount: null,
      vendor: "",
      category: "",
      inputErr: false,
    };
  }

  updateInputs = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createTransaction = (event) => {
    if (!this.state.amount || !this.state.vendor || !this.state.category) {
      this.setState({ inputErr: true });
      return;
    }
    if (this.state.amount > this.props.balance) {
      this.setState({ inputErr: true });
      return;
    }
    axios
      .post("http://localhost:4200/transaction", {
        transaction: {
          amount: this.state.amount,
          vendor: this.state.vendor,
          category: this.state.category,
          type: event.target.name,
        },
      })
      .then(() => {
        this.setState({
          amount: 0,
          vendor: "",
          category: "",
          inputErr: false,
        });
        this.props.getTransactionsFromServer();
      });
  };
  render() {
    return (
      <div className="operations">
        <input
          className="input"
          type="Number"
          name="amount"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.updateInputs}
        />
        <br />
        <input
          className="input"
          type="text"
          name="vendor"
          placeholder="Vendor"
          value={this.state.vendor || ""}
          onChange={this.updateInputs}
        />
        <br />
        <input
          className="input"
          type="text"
          name="category"
          placeholder="Category"
          value={this.state.category || ""}
          onChange={this.updateInputs}
        />
        <div id="buttons">
          <button
            className="button"
            name="deposite"
            onClick={this.createTransaction}
          >
            Deposite
          </button>
          <button
            className="button"
            name="withDorw"
            onClick={this.createTransaction}
          >
            Withdraw
          </button>
        </div>
        {this.state.inputErr ? (
          <div>fill all inputs or insufficient funds</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Operations;
