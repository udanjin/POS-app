const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
  createMenu,
  getMenu,
  getMenus,
  deleteMenu,
  updateProduct,
  deleteProduct,
  updateMenu,
  getPopularMenu,
  getNewMenu
} = require("../controllers/menuController");
// const upload = multer({ dest: './uploads' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const base ='file:///D:/Skripsi/POS-app/backend'
     cb(null,path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
router.post("/",upload.single('imgPath'), createMenu);
// router.post("/upload",upload)
router.get("/", getMenus);
router.get("/popular", getPopularMenu);
router.get("/newMenu", getNewMenu);
router.get("/:id", getMenu);
router.delete("/:id", deleteProduct);
router.put("/:id",upload.single('imgPath'), updateProduct);
module.exports = router;
