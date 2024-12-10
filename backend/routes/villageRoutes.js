const express = require('express');
const router = express.Router();
const villageController = require('../controllers/villageController');

// 获取和更新村庄信息
router.get('/:id', villageController.getVillageInfo);
router.put('/:id', villageController.updateVillageInfo);
router.get('/nearby', villageController.getNearbyVillages);

module.exports = router;
