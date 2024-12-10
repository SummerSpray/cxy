const express = require('express');
const router = express.Router();
const techTeamController = require('../controllers/techTeamController');

// 获取所有科技团队信息
router.get('/', techTeamController.getAllTechTeams);

module.exports = router;
