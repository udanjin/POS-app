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
  getNewMenu,
  uploadImg,
  createMenuV2
} = require("../controllers/menuController");
// const upload = multer({ dest: './uploads' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const base ='file:///D:/Skripsi/POS-app/backend'
    cb(null,path.join(__dirname, "uploads"));
    console.log(__dirname);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
const inMemoryStorge = multer.memoryStorage()
const uploads = multer({ storage : inMemoryStorge})
router.post("/upload",uploadImg);
router.post("/v2",uploads.single('imgPath'),createMenuV2)
router.post("/",upload.single('imgPath'), createMenu);
// router.post("/upload",uploadImg);
// router.post("/upload",upload)
router.get("/", getMenus);
router.get("/popular", getPopularMenu);
router.get("/newMenu", getNewMenu);
router.get("/:id", getMenu);
router.delete("/:id", deleteProduct);
router.put("/:id",upload.single('imgPath'), updateProduct);
module.exports = router;
