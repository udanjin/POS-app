const transaction = require("../models/transactionModel");
const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const envConstant = process.env;

const postTransaction = async (req, res) => {
  try {
    const payloadData = req.body;
    const order = await Order.findOne({ _id: payloadData.orderId });
    if (!order) {
      return res.status(400).json({ message: "order not found" });
    }

    let taxAmount = 0;
    let priceAmount = 0;

    const items = order.orderItems;
    for (let i = 0; i < items.length; i++) {
      taxAmount += Number(items[i].tax);
      priceAmount += Number(items[i].price);
    }

    const roundedValue = Math.round(taxAmount + priceAmount);
    const roundingValue = taxAmount + priceAmount - roundedValue;

    const transactions = new transaction({
      tableId: order.tableId,
      totalAmount: priceAmount,
      totalTax: taxAmount,
      orderId: order._id,
      transactionStatus: "pending",
      roundings: roundingValue,
    }).save();

    console.log(roundedValue);

    const payload = await {
      transaction_details: {
        order_id: payloadData.orderId,
        gross_amount: roundedValue,
      },
      callbacks: {
        finish: `https://fe-pos-app.vercel.app/order-status`,
        error: ` https://fe-pos-app.vercel.app/order-status`,
        pending: `https://fe-pos-app.vercel.app/order-status`,
        close: `https://fe-pos-app.vercel.app/order-status`,
      },
    };

    const authString = btoa(envConstant.MIDTRANS_SERVER_KEY);
    const response = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (response.status !== 201) {
      return res.status(500).json({
        status: "error",
        message: "failed to create transaction",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        snap_token: data.token,
        snap_redirect_url: data.redirect_url,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const Transaction = await transaction.find({}).sort({ createdAt: -1 });
    res.json(Transaction);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateTransaction = async (req, res) => {
  try {
    const payloadData = req.body;
    // console.log(`Received payload: ${JSON.stringify(payloadData)}`);
    // const orderId = payloadData.orderId;
    // console.log(`OrderId: ${orderId}`);
    // const id = req.params
    // const updatedStatus = req.body.transactionStatus;
    // const updateObject = { transactionStatus: payloadData.transactionStatus };
    const order = await transaction.findOne({ orderId: payloadData.orderId });
    // const order = await transaction.findByIdAndUpdate(
    //   payloadData.orderId,
    //   updateObject,
    //   { new: true }
    // );
    if (!order) {
      // console.log(`Order not found with id: ${orderId}`);
      return res.status(400).json({ message: "order not found" });
      // console.log (res.status)
    }
    order.transactionStatus = payloadData.transactionStatus;
    await order.save();
    // res.json(order);
    res.json(order);
    // const transactions = await transaction;
  } catch {
    return;
  }
};

const getIncome = async (req, res) => {
  try {
    const timePeriod = req.query.timePeriod;
    let totalIncome = 0;

    switch (timePeriod) {
      case "last7days":
        const last7DaysTransactions = await transaction.find({
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        });
        totalIncome = last7DaysTransactions.reduce(
          (acc, transaction) => acc + transaction.totalAmount,
          0
        );
        break;
      case "last30days":
        const last30DaysTransactions = await transaction.find({
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        });
        totalIncome = last30DaysTransactions.reduce(
          (acc, transaction) => acc + transaction.totalAmount,
          0
        );
        break;
      case "last90days":
        const last90DaysTransactions = await transaction.find({
          createdAt: { $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
        });
        totalIncome = last90DaysTransactions.reduce(
          (acc, transaction) => acc + transaction.totalAmount,
          0
        );
        break;
      default:
        throw new Error("Invalid time period");
    }

    res.json({ totalIncome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getChart = async (req, res) => {
  try {
    const timePeriod = req.query.timePeriod;
    let chartData = [];

    switch (timePeriod) {
      case "last7days":
        const last7DaysTransactions = await transaction.find({
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        });
        chartData = last7DaysTransactions.map((transaction) => ({
          x: transaction.createdAt,
          y: transaction.totalAmount,
        }));
        break;
      case "last30days":
        const last30DaysTransactions = await transaction.find({
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        });
        chartData = last30DaysTransactions.map((transaction) => ({
          x: transaction.createdAt,
          y: transaction.totalAmount,
        }));
        break;
      case "last90days":
        const last90DaysTransactions = await transaction.find({
          createdAt: { $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
        });
        chartData = last90DaysTransactions.map((transaction) => ({
          x: transaction.createdAt,
          y: transaction.totalAmount,
        }));
        break;
      default:
        throw new Error("Invalid time period");
    }
    res.json({ series: chartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  postTransaction,
  getTransactions,
  updateTransaction,
  getIncome,
  getChart
};
