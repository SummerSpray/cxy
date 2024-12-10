const { User } = require('../models/index'); 
const Content = require('../models/content');

// 获取所有用户
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 获取所有待审核内容
exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.findAll({ where: { status: 'pending' } });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 删除用户
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
