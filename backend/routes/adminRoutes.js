const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// 用户管理接口
router.get('/users', adminController.getAllUsers);

// 内容审核接口
router.get('/content', adminController.getAllContent);

module.exports = router;
router.delete('/users/:id', adminController.deleteUser);
