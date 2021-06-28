import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Transactions from "./components/Transactions";
import Operations from "./components/Operations";
import Categories from "./components/Categories";
const axios = require("axios");
class App extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
    };
  }
  getTotalBalance() {
    let transactions = [...this.state.transactions];
    let balance = 0;
    transactions.map(
      (t) => (balance += t.type === "deposite" ? t.amount : t.amount * -1)
    );
    return balance;
  }

  getTransactionsFromServer = async () => {
    const transaction = await axios.get("http://localhost:4200/transactions");
    this.setState({
      transactions: transaction.data,
    });
  };
  async componentDidMount() {
    await this.getTransactionsFromServer();
  }

  deleteTransaction = async (id) => {
    await axios.delete("http://localhost:4200/transaction", { data: { id } });
    await this.getTransactionsFromServer();
  };
  render() {
    return (
      <Router>
        <div className="App">
          <h2>The Big Bank</h2>
          <div id="main-links">
            <Link to="/">
              <button className="linkButton">Home</button>
            </Link>
            <Link to="/operations">
              <button className="linkButton">Withdraw/Deposit</button>
            </Link>
            <Link to="/categories">
              <button className="linkButton">Categories</button>
            </Link>
          </div>
          <br />
          <Route
            path="/"
            exact
            render={() => (
              <Transactions
                transactions={this.state.transactions}
                deleteTransaction={this.deleteTransaction}
                balance={this.getTotalBalance()}
              />
            )}
          />
          <Route
            path="/operations"
            exact
            render={() => (
              <Operations
                getTransactionsFromServer={this.getTransactionsFromServer}
                balance={this.getTotalBalance()}
              />
            )}
          />

          <Route
            path="/categories"
            exact
            render={() => <Categories transactions={this.state.transactions} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
