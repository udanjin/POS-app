const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderItemsSchema = new Schema(
  {
    id:{
      type:Number,
      required:true,
    },
    name: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    price:{
      type:Number,
      required:true
    },
    tax:{
      type:Number,
      required:true,
    },
    menuId: {
      type : String,
      required: true
    },
  },
  { timestamps: true }
);
const orderSchema = new Schema(
  {
    tableId:{
      type:Number,
      default:null,
      required:false

    },
    orderStatus:{
      type:String,
      required:true,
    },
    orderItems : [orderItemsSchema]
  },
  { timestamps: true }
)
module.exports = mongoose.model("OrderItems", orderSchema);
