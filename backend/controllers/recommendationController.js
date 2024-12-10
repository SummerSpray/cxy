const { Village } = require('../models/index'); 

// 根据位置和角色获取推荐村庄
exports.getRecommendations = async (req, res) => {
  const { latitude, longitude, role } = req.query;

  try {
    const villages = await Village.findAll(); // 假设有所有村庄信息
    // 简单示例：根据位置计算距离
    const nearbyVillages = villages.filter((village) => {
      const distance = Math.sqrt(
        Math.pow(village.latitude - latitude, 2) +
          Math.pow(village.longitude - longitude, 2)
      );
      return distance < 1; // 距离小于 1 度的村庄
    });

    res.json(nearbyVillages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
