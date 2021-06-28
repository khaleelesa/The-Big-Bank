import React, { Component } from "react";
import "../styles/Categories.css";
class Categories extends Component {
  makeCategories = () => {
    const results = this.props.transactions.reduce(function (r, a) {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));
    const keys = Object.keys(results);
    const newResults = [];
    for (let i of keys) {
      let sum = 0;
      for (let v of results[i])
        sum += v.type === "deposite" ? v.amount : v.amount * -1;
      newResults.push({
        category: i,
        sum,
        type: sum > 0 ? "deposite" : "withDorw",
      });
    }
    return newResults;
  };

  render() {
    const categories = this.makeCategories();
    return (
      <div className="categories">
        <div className="title">Category Total</div>
        {categories.map((t) => {
          return (
            <ul>
              <li className="category">
                {t.category}:{t.sum}
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default Categories;
