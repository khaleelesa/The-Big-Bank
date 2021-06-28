const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transactions");

router.get("/", async (req, res) => {
  res.send({ status: "server working" });
});

router.get("/transactions", async (req, res) => {
  Transaction.find({}, function (data, err) {
    if (err) res.send(err);
    else res.send(data);
  });
});

router.post("/transaction", async (req, res) => {
  const Trans = new Transaction({ ...req.body.transaction });
  Trans.save();
  res.end();
});

router.delete("/transaction", async (req, res) => {
  Transaction.findByIdAndRemove(req.body.id, function (err) {
    if (err) res.send(err);
    else res.end();
  });
});
module.exports = router;
