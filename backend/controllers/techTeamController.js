const { TechTeam} = require('../models/index'); 

// 获取所有科技团队
exports.getAllTechTeams = async (req, res) => {
  try {
    const techTeams = await TechTeam.findAll();
    res.json(techTeams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
