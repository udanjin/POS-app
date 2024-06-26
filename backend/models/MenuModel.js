const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const menuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price:{
      type:Number,
      required:true
    },
    imgPath:{
      type: String,
      
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Menu", menuSchema);
