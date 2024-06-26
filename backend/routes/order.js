const express = require("express");
const router = express.Router();
const { postOrder, getOrders, getOrder, updateStatus } = require("../controllers/order");
router.post("/", postOrder);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id", updateStatus);
// router.put("/:id",updateProduct);
module.exports = router;
