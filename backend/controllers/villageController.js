const { Village } = require('../models/index'); 
const { Op } = require('sequelize');

// 获取村庄信息
exports.getVillageInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const village = await Village.findByPk(id);
    res.json(village);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 更新村庄信息
exports.updateVillageInfo = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const village = await Village.findByPk(id);
    if (village) {
      village.name = name;
      village.description = description;
      await village.save();
      res.json(village);
    } else {
      res.status(404).json({ error: 'Village not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getNearbyVillages = async (req, res) => {
  const { lat, lon } = req.query;

  // 假设我们已经计算了一个基于距离的查询条件
  const nearbyVillages = await Village.findAll({
    where: {
      latitude: { [Op.between]: [lat - 0.1, lat + 0.1] },
      longitude: { [Op.between]: [lon - 0.1, lon + 0.1] },
    },
  });

  res.json(nearbyVillages);
};