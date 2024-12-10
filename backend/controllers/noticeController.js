const { Notice} = require('../models/index'); 

// 获取所有通知
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.findAll({ order: [['createdAt', 'DESC']] });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
