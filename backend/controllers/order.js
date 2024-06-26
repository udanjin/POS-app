const OrderItems = require("../models/orderModel");
const mongoose = require("mongoose");
const CountModel = require("../models/CountModel");

const postOrder = async (req, res) => {
  try {
    const payloadData = req.body;

    let idCount = 0;
    payloadData.orderItems.forEach(async (item) => {
      item.id = idCount;

      idCount += 1;
      const existCount = await CountModel.findOneAndUpdate(
        { menuId: item.menuId },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      if (!existCount) {
        const newCountModel = new CountModel({
          menuId: item.menuId,
          count: 1,
        });
        await newCountModel.save();
      }
    });
    const tableId =
      payloadData.tableId === "" || payloadData.tableId === "null"
        ? null
        : parseInt(payloadData.tableId, 10);
    const order = new OrderItems({
      tableId,
      orderStatus: 1,
      orderItems: payloadData.orderItems,
    });
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const payloadData = req.body;
    const update = await OrderItems.findByIdAndUpdate(
      id,
      { orderStatus: payloadData.orderStatus },
      {
        new: true,
      }
    );
    res.send(update);
    if (!update) {
      console.log(`Order not found with ID ${id}`);
      return res.status(400).json({ message: "failed to update" });
    }
    // update.orderStatus = payloadData.orderStatus;
    // await update.save();
    res.json(update);
  } catch (error) {
    console.log(error);
    return;
  }
};

const getOrders = async (req, res) => {
  const { tableId } = req.query;

  try {
    const filter = {};

    if (tableId) {
      filter["tableId"] = tableId;
      filter["orderStatus"] = 1;
    }

    let orders = await OrderItems.find(filter).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(204).json({ error: "no data" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such id" });
  }
  const orders = await OrderItems.findById(id);
  if (!orders) {
    return res.status(404).json({ error: "gada cok" });
  }

  // menu.imgPath = `${req.protocol}://${req.get('host')}/${menu.imgPath}`
  res.status(200).json(orders);
};

module.exports = {
  postOrder,
  getOrders,
  getOrder,
  updateStatus,
};
