const express = require("express");
const router = express.Router();
const {
  postTransaction,
  getTransactions,
  updateTransaction,
  getIncome,
  getChart
} = require("../controllers/transactionController");
router.post("/", postTransaction);
router.get("/", getTransactions);
router.put("/", updateTransaction);
router.get("/totalIncome",getIncome);
router.get("/chart", getChart);
module.exports = router;
