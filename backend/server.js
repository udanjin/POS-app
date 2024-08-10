require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");
const transactionRoutes = require("./routes/transaction");
const auth = require("./routes/auth");

const path = require("path");

const app = express();
const cors = require("cors");

app.use("/images", express.static(path.join(__dirname, "uploads")));

// app.use(cors({
//   origin:["https://pos-app-api-five.vercel.app"]
// }));
app.use(cors({
  origin:["http://localhost:3000"]
}));
// app.use(cors())
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// app.use(fileUpload());
app.use(express.json());
// app.use(cors());
app.get("/", (req, res) => {
  console.log(__dirname);
  res.json({ msg: "welkam" });
});
//routes
app.use("/api/menu", menuRoutes);
// app.use('/api/images', imagesRoutes)
app.use("/api/order", orderRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/auth", auth);

mongoose
  .connect(process.env.MONGO_URL, {
    // dns: '8.8.8.8'
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listen 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });


module.exports = app;
