const { db } = require('../models/index'); 

// 获取所有产品信息
exports.getProducts = async (req, res) => {
  try {
    const products = await db.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 添加新产品
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const newProduct = await db.create({ name, description, price, image });
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
