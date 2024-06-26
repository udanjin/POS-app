const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    tableId: {
      type: Number,
      // required: true,
      default:null
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalTax: {
      type: Number,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "orderitems",
      required: true,
    },
    transactionStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("transactionDetails", transactionSchema);
