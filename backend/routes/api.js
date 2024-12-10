const express = require('express');
const { Village, Product, Notice, User, TechTeam } = require('../models'); // 引入所有模型
const router = express.Router();

// ----------------- Village API -------------------

// 获取所有村庄
router.get('/villages', async (req, res) => {
  try {
    const villages = await Village.findAll();
    res.json(villages);
  } catch (error) {
    console.error('Error fetching villages:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 添加新村庄
router.post('/villages', async (req, res) => {
  try {
    const newVillage = await Village.create(req.body);
    res.status(201).json(newVillage);
  } catch (error) {
    console.error('Error creating village:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ----------------- Product API -------------------

// 获取所有产品
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 添加新产品
router.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ----------------- Notice API -------------------

// 获取所有通知
router.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.findAll();
    res.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 添加新通知
router.post('/notices', async (req, res) => {
  try {
    const newNotice = await Notice.create(req.body);
    res.status(201).json(newNotice);
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ----------------- User API -------------------


// 获取所有用户
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});



// 添加新用户
router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});


// ----------------- TechTeam API -------------------

// 获取所有科技团队
router.get('/techteams', async (req, res) => {
  try {
    const techTeams = await TechTeam.findAll();
    res.json(techTeams);
  } catch (error) {
    console.error('Error fetching tech teams:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 添加新科技团队
router.post('/techteams', async (req, res) => {
  try {
    const newTechTeam = await TechTeam.create(req.body);
    res.status(201).json(newTechTeam);
  } catch (error) {
    console.error('Error creating tech team:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
