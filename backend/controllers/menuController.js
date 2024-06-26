const Menu = require("../models/MenuModel");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const CountModel = require("../models/CountModel");

const getMenus = async (req, res) => {
  const menus = await Menu.find({}).sort({ createdAt: 1 });

  try {
    menus.forEach((menu) => {
      menu.imgPath = `${req.protocol}://${req.get("host")}/${menu.imgPath}`;
    });

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMenu = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such id" });
  }
  const menu = await Menu.findById(id);
  if (!menu) {
    return res.status(404).json({ error: "gada cok" });
  }

  menu.imgPath = `${req.protocol}://${req.get("host")}/${menu.imgPath}`;
  res.status(200).json(menu);
};

const getPopularMenu = async (req, res) => {
  try {
    
    const getPopular = await CountModel.find({}).sort({ count: -1 }).limit(5);
    const menuIds = getPopular.map((item) => item.menuId);
    const menus = await Menu.find({ _id: { $in: menuIds } });
    menus.forEach((menu) => {
      menu.imgPath = `${req.protocol}://${req.get("host")}/${menu.imgPath}`;
    });
    return res.status(201).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const createMenu = async (req, file,cb) => {
//   //add json to db
//   const { title, desc } = req.body;
//   try {
//     const menu = await Menu.create({ title, desc });
//     res.status(200).json(menu);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const createMenu = async (req, res) => {
  try {
    const { name, desc, price } = req.body;
    console.log(req.body);
    const imgPath = `images/${req.file.filename}`;

    const image = new Menu({ name, desc, price, imgPath });

    await image.save();
    res.status(201).send(`Image created successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error creating image`);
  }
};

const getNewMenu = async(req,res)=>{
  try{
    const newMenu = await Menu.find({}).sort({createdAt:-1}).limit(3);
    newMenu.forEach((menu) => {
      menu.imgPath = `${req.protocol}://${req.get("host")}/${menu.imgPath}`;
    });
    return res.status(201).json(newMenu);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

// const createMenu = async (req, file,cb) => {
//   //add json to db
//   const { title, desc } = req.body;
//   try {
//     const menu = await Menu.create({ title, desc });
//     res.status(200).json(menu);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const deleteMenu = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "no such id" });
//   }
//   const menu = await Menu.findOneAndDelete({ _id: id });
//   if (!menu) {
//     return res.status(404).json({ error: "gada cok" });
//   }
//   res.status(200).json(menu);
// };

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Menu.findOneAndDelete({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error deleting product" });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let update = {};
    if (req.file) {
      const imgPath = `images/${req.file.filename}`;
      update = {
        ...req.body,
        imgPath: imgPath,
      };
    } else {
      update = {
        ...req.body,
      };
    }

    const updatedProduct = await Menu.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const upload = async(res,res)=>{
//   if(!req.files|| Object.keys(req.files).length===0){
//     return res.status(400).send('no files upload')
//   }
//   let uploadedFile=req.files.files
//   const uploadPath = path.join(__dirname, 'uploads',uploadedFile.name);
//   uploadedFile.mv(uploadPath,(err)=>{
//     if(err){
//       return res.status(500).send(err);
//     }
//     res.send('file uploaded')
//   })
// }

module.exports = {
  createMenu,
  getMenu,
  getMenus,
  // deleteMenu
  deleteProduct,
  // updateMenu
  updateProduct,
  getPopularMenu,
  getNewMenu
};
