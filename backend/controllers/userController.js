const { User } = require('../models/index'); // 确保这里正确导入了 User 模型


// 更新用户角色 API
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // 添加日志以检查请求参数
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);

    // 验证 id 和 role 是否存在
    if (!id || !role) {
      return res.status(400).json({ message: '缺少必要的参数' });
    }

    // 查找用户
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: '用户未找到' });
    }

    // 更新用户角色
    user.role = role;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error); // 添加错误日志
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
};

// 获取所有用户 API
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
};

// 删除用户 API
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: '用户未找到' });
    }

    res.status(200).json({ message: '用户已删除' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error });
  }
};