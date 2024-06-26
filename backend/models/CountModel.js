const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const countSchema = new Schema(
  {
    menuId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
    },
    count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("count", countSchema);
