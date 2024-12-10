const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/:id', userController.updateUser);// 更新用户权限
router.get('/', userController.getUsers);
router.delete('/:id', userController.deleteUser);


module.exports = router;
