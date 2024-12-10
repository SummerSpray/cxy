const express = require('express');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const { Sequelize } = require('sequelize');
const db = require('./models'); // 引入包含所有模型的 db 对象
const userRoutes = require('./routes/userRoutes');
const app = express();
const multer = require('multer'); // 引入 multer
const path = require('path'); // 引入 path 模块
const PORT = 5000;



// 配置 multer 存储
const fs = require('fs'); // 引入 fs 模块

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = 'frontend/src/assets';
        const fullPath = path.join(__dirname, '..', folder);

        // 创建文件夹（如果不存在）
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}_${file.originalname}`);
    }
});

const upload = multer({ storage });
// 示例路由
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', filePath: req.file.path });
});

// 静态资源服务
app.use('/assets', express.static(path.join(__dirname, '../frontend/src/assets')));


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 数据库连接测试
const sequelize = new Sequelize('village_db', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

// 根路径路由
app.get('/', (req, res) => {
  res.send(`
    <h1>欢迎来到农业信息化平台后端 API</h1>
    <ul>
      <li><a href="http://localhost:5000/api/village" target="_blank">村庄信息</a></li>
      <li><a href="http://localhost:5000/api/products" target="_blank">产品信息</a></li>
      <li><a href="http://localhost:5000/api/notices" target="_blank">通知信息</a></li>
      <li><a href="http://localhost:5000/api/techteams" target="_blank">科技团队信息</a></li>
      <li><a href="http://localhost:5000/api/users" target="_blank">用户信息</a></li>
      <li><a href="http://localhost:5000/api/villages/:id/products" target="_blank">获取村庄内所有产品</a></li>
    </ul>
  `);
});

// 获取村庄信息 API
app.get('/api/village', async (req, res) => {
  try {
    const villages = await db.Village.findAll();  // 使用 Sequelize 查询村庄信息
    res.json(villages); // 返回 JSON 数据
  } catch (error) {
    console.error('获取村庄信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取单个村庄信息 API
app.get('/api/village/:id', async (req, res) => {
  try {
    const village = await db.Village.findByPk(req.params.id); // 使用主键查找单个村庄
    if (village) {
      res.json(village); // 如果找到村庄，返回JSON数据
    } else {
      res.status(404).json({ error: '村庄未找到' }); // 如果未找到村庄，返回404状态码和错误信息
    }
  } catch (error) {
    console.error('获取村庄信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' }); // 如果发生错误，返回500状态码和错误信息
  }
});

// 更新整个村委信息 API
app.put('/api/village_committee/:villageId', async (req, res) => {
  try {
    const villageId = req.params.villageId;
    let updatedFields = req.body;

    // 解析 committeeMembers 字符串为数组
    if (typeof updatedFields.committeeMembers === 'string') {
      updatedFields.committeeMembers = JSON.parse(updatedFields.committeeMembers);
    }

    // 更新 VillageCommittee 记录
    const [affectedRows] = await db.VillageCommittee.update({
      committee_overview: updatedFields.committee_overview,
      committee_achievements: updatedFields.committee_achievements,
      committee_tracking: updatedFields.committee_tracking,
      longitude: parseFloat(updatedFields.longitude), // 确保是数字类型
      latitude: parseFloat(updatedFields.latitude),   // 确保是数字类型
    }, {
      where: { village_id: villageId }
    });

    if (affectedRows > 0) {
      // 获取 VillageCommittee 的 ID
      const villageCommittee = await db.VillageCommittee.findOne({ where: { village_id: villageId } });
      if (!villageCommittee) {
        console.error('村委记录未找到');
        return res.status(404).json({ error: '村委未找到' });
      }
      const committeeId = villageCommittee.id;
      console.log('committeeId:', committeeId);

      // 更新 CommitteeMember 记录
      const committeeMembers = updatedFields.committeeMembers || [];
      console.log('committeeMembers:', committeeMembers);

      // 删除不再存在的成员
      const existingMembers = await db.CommitteeMember.findAll({ where: { village_id: villageId } });
      const existingMemberIds = existingMembers.map(member => member.id);
      const newMemberIds = committeeMembers.map(member => member.id).filter(id => id !== undefined);
      const membersToDelete = existingMemberIds.filter(id => !newMemberIds.includes(id));
      if (membersToDelete.length > 0) {
        await db.CommitteeMember.destroy({ where: { id: membersToDelete } });
      } else {
        console.log('没有需要删除的成员');
      }

      // 更新现有成员
      for (const member of existingMembers) {
        const updatedMember = committeeMembers.find(m => m.id === member.id);
        if (updatedMember) {
          await member.update({
            ...updatedMember,
            committeeId: committeeId // 确保 committeeId 被赋值
          });
        }
      }

      // 添加新成员
      const newMembersToAdd = committeeMembers.filter(member => !member.id);
      for (const newMember of newMembersToAdd) {
        await db.CommitteeMember.create({
          village_id: villageId, // 使用固定的 village_id
          name: newMember.name,
          role: newMember.role,
          committeeId: committeeId // 确保 committeeId 被赋值
        });
      }

      res.status(200).json({ message: '村委信息更新成功' });
    } else {
      res.status(404).json({ error: '村委未找到' });
    }
  } catch (error) {
    console.error('更新村委信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 获取所有通知信息 API
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await db.Notice.findAll(); // 使用 Sequelize 查询通知信息
    res.json(notices); // 返回 JSON 数据
  } catch (error) {
    console.error('获取通知信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取单个通知
app.get('/api/notices/:id', async (req, res) => {
  try {
    const notice = await db.Notice.findByPk(req.params.id); // 使用主键查找单个通知
    if (notice) {
      res.json(notice);
    } else {
      res.status(404).json({ error: '通知未找到' });
    }
  } catch (error) {
    console.error('获取通知信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取所有产品信息 API
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.Product.findAll(); // 使用 Sequelize 查询所有产品
    res.json(products); // 返回 JSON 数据
  } catch (error) {
    console.error('获取产品信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取单个产品信息 API
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id); // 使用主键查找单个产品
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: '产品未找到' });
    }
  } catch (error) {
    console.error('获取产品信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取所有科技团队信息 API
app.get('/api/techteams', async (req, res) => {
  try {
    const techTeams = await db.TechTeam.findAll(); // 使用 Sequelize 查询所有科技团队
    res.json(techTeams); // 返回 JSON 数据
  } catch (error) {
    console.error('获取科技团队信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取单个科技团队信息 API
app.get('/api/techteams/:id', async (req, res) => {
  try {
    const techTeam = await db.TechTeam.findByPk(req.params.id); // 使用主键查找单个科技团队
    if (techTeam) {
      res.json(techTeam);
    } else {
      res.status(404).json({ error: '科技团队未找到' });
    }
  } catch (error) {
    console.error('获取科技团队信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

//获取单个团队报告api
app.get('/api/techteams/:id/reports', async (req, res) => {
  try {
    const team = await db.TechTeam.findByPk(req.params.id, {
      include: [{
        model: db.TeamReport,
        as: 'TeamReports',
      }],
    });

    if (!team) {
      return res.status(404).json({ error: '团队未找到' });
    }

    res.json(team.TeamReports);
  } catch (error) {
    console.error('获取团队报告信息出错：', error);
    res.status(500).json({ error: '服务器内部错误', details: error.message });
  }
});
// 更新团队信息 API
app.put('/api/techteams/:id', async (req, res) => {
  try {
    const teamId = req.params.id;
    const updatedFields = req.body;

    const [affectedRows] = await db.TechTeam.update(updatedFields, {
      where: { id: teamId }
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: '团队信息更新成功' });
    } else {
      res.status(404).json({ error: '团队未找到' });
    }
  } catch (error) {
    console.error('更新团队信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 创建团队报告 API
app.post('/api/team_reports', async (req, res) => {
  try {
    const report = req.body;

    const newReport = await db.TeamReport.create(report);

    res.status(201).json({
      message: '团队报告创建成功',
      report: newReport
    });
  } catch (error) {
    console.error('创建团队报告出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 更新团队报告 API
app.put('/api/team_reports/:id', async (req, res) => {
  try {
    const reportId = req.params.id;
    const updatedFields = req.body;

    const [affectedRows] = await db.TeamReport.update(updatedFields, {
      where: { id: reportId }
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: '团队报告更新成功' });
    } else {
      res.status(404).json({ error: '团队报告未找到' });
    }
  } catch (error) {
    console.error('更新团队报告出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 获取所有团队报告 API
app.get('/api/team_reports', async (req, res) => {
  try {
    const teamReports = await db.TeamReport.findAll(); // 使用 Sequelize 查询所有团队报告
    res.json(teamReports); // 返回 JSON 数据
  } catch (error) {
    console.error('获取团队报告信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 获取特定 ID 的团队报告 API
app.get('/api/team_reports/:id', async (req, res) => {
  try {
    const reportId = req.params.id;

    // 使用主键查找单个团队报告
    const report = await db.TeamReport.findByPk(reportId);

    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ error: '团队报告未找到' });
    }
  } catch (error) {
    console.error('获取团队报告信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 删除团队报告 API
app.delete('/api/team_reports/:id', async (req, res) => {
  try {
    const reportId = req.params.id;

    // 查找并删除团队报告
    const deletedRows = await db.TeamReport.destroy({
      where: { id: reportId }
    });

    if (deletedRows > 0) {
      res.status(200).json({ message: '团队报告删除成功' });
    } else {
      res.status(404).json({ error: '团队报告未找到' });
    }
  } catch (error) {
    console.error('删除团队报告出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取所有用户信息 API
app.get('/api/users', async (req, res) => {
  try {
    const { team_id } = req.query; // 获取查询参数 team_id

    let users;
    if (team_id) {
      users = await db.User.findAll({
        where: { team_id: team_id } // 根据 team_id 查询用户
      });
    } else {
      users = await db.User.findAll(); // 如果没有 team_id，返回所有用户
    }

    res.json(users); // 返回 JSON 数据
  } catch (error) {
    console.error('获取用户信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取单个用户信息 API
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id); // 使用主键查找单个用户
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: '用户未找到' });
    }
  } catch (error) {
    console.error('获取用户信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

//修改用户信息api
app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedFields = req.body;

    const [affectedRows] = await db.User.update(updatedFields, {
      where: { id: userId }
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: '用户信息更新成功' });
    } else {
      res.status(404).json({ error: '用户未找到' });
    }
  } catch (error) {
    console.error('更新用户信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 创建产品信息 API
app.post('/api/products', async (req, res) => {
  try {
    const { village_id } = req.body;

    const newProduct = await db.Product.create({
      village_id,
      name: '无', // 可以设置默认值为空字符串或其他默认值
      description: '无', // 可以设置默认值为空字符串或其他默认值
      price: 0,
      
    });

    res.status(201).json({
      message: '产品信息创建成功',
      product: newProduct
    });
  } catch (error) {
    console.error('创建产品信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 删除产品信息 API
app.delete('/api/products/:villageId', async (req, res) => {
  try {
    const villageId = req.params.villageId;

    // 查找并删除产品信息
    const deletedRows = await db.Product.destroy({
      where: { village_id: villageId }
    });

    if (deletedRows > 0) {
      res.status(200).json({ message: '产品信息删除成功' });
    } else {
      res.status(404).json({ error: '产品信息未找到' });
    }
  } catch (error) {
    console.error('删除产品信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取村庄内所有产品 API
app.get('/api/villages/:villageId/products', async (req, res) => {
  try {
    const village = await db.Village.findByPk(req.params.villageId, {
      include: [{
        model: db.Product,  // 显示加载与 Village 关联的 Product 数据
        as: 'products',    // 使用在 Village 模型中定义的别名
      }],
    });

    if (!village) {
      return res.status(404).json({ error: '村庄未找到' });
    }

    res.json(village.products); // 返回村庄关联的所有产品数据
  } catch (error) {
    console.error('获取村庄产品信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取单个村委信息 API
app.get('/api/village_committee/:villageId', async (req, res) => {
  try {
    const committee = await db.VillageCommittee.findOne({
      where: { village_id: req.params.villageId },
      include: [
        { model: db.CommitteeMember, as: 'committeeMembers' }
      ]
    });
    if (committee) {
      res.json(committee);
    } else {
      res.status(404).json({ error: '村委未找到' });
    }
  } catch (error) {
    console.error('获取村委信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 创建村委信息 API
app.post('/api/village_committee', async (req, res) => {
  try {
    const { village_id, committee_overview, committee_achievements, committee_tracking } = req.body;

    const newCommittee = await db.VillageCommittee.create({
      village_id,
      committee_overview: committee_overview || '',
      committee_achievements: committee_achievements || '',
      committee_tracking: committee_tracking || ''
    });

    res.status(201).json(newCommittee);
  } catch (error) {
    console.error('创建村委信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 删除村委 记录 API
app.delete('/api/village_committee/:villageId', async (req, res) => {
  try {
    const villageId = req.params.villageId;

    // 删除 VillageCommittee 记录
    const deletedRows = await db.VillageCommittee.destroy({ where: { village_id: villageId } });

    if (deletedRows > 0) {
      res.status(200).json({ message: '村委信息删除成功' });
    } else {
      res.status(404).json({ error: '村委信息未找到' });
    }
  } catch (error) {
    console.error('删除村委信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});


// 获取单个村况信息 API
app.get('/api/village_status/:villageId', async (req, res) => {
  try {
    const status = await db.VillageStatus.findOne({
      where: { village_id: req.params.villageId }
    });
    if (status) {
      res.json(status);
    } else {
      res.status(404).json({ error: '村况未找到' });
    }
  } catch (error) {
    console.error('获取村况信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 创建村况信息 API
app.post('/api/village_status', async (req, res) => {
  try {
    const { village_id, status_overview, status_map, status_structure, status_dynamic_map } = req.body;

    const newStatus = await db.VillageStatus.create({
      village_id,
      status_overview: status_overview || '',
      status_map: status_map || '',
      status_structure: status_structure || '',
      status_dynamic_map: status_dynamic_map || ''
    });

    res.status(201).json(newStatus);
  } catch (error) {
    console.error('创建村况信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 删除 村况 记录 API
app.delete('/api/village_status/:id', async (req, res) => {
  try {
    const villageId = req.params.id;

    // 删除 VillageStatus 记录
    const deletedRows = await db.VillageStatus.destroy({ where: { village_id: villageId } });

    if (deletedRows > 0) {
      res.status(200).json({ message: '村况信息删除成功' });
    } else {
      res.status(404).json({ error: '村况信息未找到' });
    }
  } catch (error) {
    console.error('删除村况信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取单个地理位置信息 API
app.get('/api/village_location/:villageId', async (req, res) => {
  try {
    const location = await db.VillageLocation.findOne({
      where: { village_id: req.params.villageId }
    });
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ error: '地理位置未找到' });
    }
  } catch (error) {
    console.error('获取地理位置信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 创建地理位置信息 API
app.post('/api/village_location', async (req, res) => {
  try {
    const { village_id, latitude, longitude } = req.body;

    const newLocation = await db.VillageLocation.create({
      village_id,
      latitude: latitude || '0',
      longitude: longitude || '0',
    });

    res.status(201).json(newLocation);
  } catch (error) {
    console.error('创建地理位置信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 删除地理位置记录 API
app.delete('/api/village_location/:id', async (req, res) => {
  try {
    const villageId = req.params.id;

    // 删除 VillageLocation 记录
    const deletedRows = await db.VillageLocation.destroy({ where: { village_id: villageId } });

    if (deletedRows > 0) {
      res.status(200).json({ message: '地理位置信息删除成功' });
    } else {
      res.status(404).json({ error: '地理位置信息未找到' });
    }
  } catch (error) {
    console.error('删除地理位置信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

//注册
app.post("/api/users", async (req, res) => {
  const { username, email, password } = req.body;

  // 参数验证：确保所有字段都存在
  if (!username || !email || !password) {
    return res.status(400).json({ message: "所有字段都是必填的" });
  }

  try {
    // 检查用户名是否已存在
    const existingUser = await db.User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "用户名已存在" });
    }

    // 获取当前时间
    const now = new Date().toISOString();

    // 插入数据到数据库（使用 Sequelize）
    const newUser = await db.User.create({
      username,
      email,
      password,
      role: "user",  // 默认角色为 customer
      createdAt: now,
      updatedAt: now,
    });

    // 返回注册成功的用户信息
    res.status(201).json({
      message: "注册成功",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ message: '注册失败，请稍后再试' });
  }
});

// 登录接口
app.post('/api/users/login', async (req, res) => {
  console.log("API 被调用");
  console.log("收到的请求体:", req.body);  // 打印请求体

  const { username, password } = req.body;

  // 检查用户名和密码是否存在
  if (!username || !password) {
    return res.status(400).json({ message: '缺少用户名或密码' });
  }

  try {
    // 使用 Sequelize 查找用户
    const user = await db.User.findOne({
      where: {
        username: username,
        password: password,  // 注意：密码应加密处理，生产环境建议加密密码
      },
    });

    if (!user) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        team_id: user.team_id,
        village_id: user.village_id,
      },
    });
  } catch (error) {
    console.error("查询用户失败:", error);
    res.status(500).json({ message: '服务器错误，请稍后再试' });
  }
});

// 使用用户路由
app.use('/api/users', userRoutes);




// 修改该村一村一品
app.put('/api/products/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'InfoImg', maxCount: 1 }
]), async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedFields = { ...req.body };

    if (req.files?.image) {
      updatedFields.image = req.files.image[0].filename;
    }
    if (req.files?.InfoImg) {
      updatedFields.InfoImg = req.files.InfoImg[0].filename;
    }

    const [affectedRows] = await db.Product.update(updatedFields, { where: { id: productId } });
    if (affectedRows > 0) {
      res.status(200).json({ message: '产品信息更新成功' });
    } else {
      res.status(404).json({ error: '产品未找到' });
    }
  } catch (error) {
    console.error('更新产品信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 修改村信息
app.put('/api/village/:id', upload.single('image'), async (req, res) => {
  try {
    const villageId = req.params.id;
    const updatedFields = { ...req.body };

    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    // 确保 committeeMembers 是一个数组
    if (typeof updatedFields.committeeMembers === 'string') {
      updatedFields.committeeMembers = JSON.parse(updatedFields.committeeMembers);
    }

    // 提取 committee 和 location 数据
    const committeeData = {
      committee_overview: updatedFields.committeeOverview,
      committee_achievements: updatedFields.committeeAchievements,
      committee_tracking: updatedFields.committeeTracking,
    };

    const locationData = {
      latitude: updatedFields.latitude,
      longitude: updatedFields.longitude,
    };

    // 提取 status 数据
    const statusData = {
      status_overview: updatedFields.statusOverview,
      status_map: updatedFields.statusMap,
      status_structure: updatedFields.statusStructure,
      status_dynamic_map: updatedFields.statusDynamicMap,
    };

    // 删除 committee, location 和 status 相关字段，避免更新到 Village 表
    delete updatedFields.committeeOverview;
    delete updatedFields.committeeAchievements;
    delete updatedFields.committeeTracking;
    delete updatedFields.latitude;
    delete updatedFields.longitude;
    delete updatedFields.statusOverview;
    delete updatedFields.statusMap;
    delete updatedFields.statusStructure;
    delete updatedFields.statusDynamicMap;

    // 更新 Village 表
    const [affectedRows] = await db.Village.update(updatedFields, { where: { id: villageId } });

    if (affectedRows > 0) {
      // 更新 VillageCommittee 表
      const [affectedCommitteeRows] = await db.VillageCommittee.update(committeeData, { where: { village_id: villageId } });

      // 更新 VillageLocation 表
      const [affectedLocationRows] = await db.VillageLocation.update(locationData, { where: { village_id: villageId } });

      // 更新 VillageStatus 表
      const [affectedStatusRows] = await db.VillageStatus.update(statusData, { where: { village_id: villageId } });

      // 更新 CommitteeMember 表
      const existingMembers = await db.CommitteeMember.findAll({ where: { village_id: villageId } });

      // 删除不再存在的成员
      const existingMemberIds = existingMembers.map(member => member.id);
      const newMemberIds = updatedFields.committeeMembers.map(member => member.id).filter(id => id !== undefined);
      const membersToDelete = existingMemberIds.filter(id => !newMemberIds.includes(id));
      await db.CommitteeMember.destroy({ where: { id: membersToDelete } });

      // 更新现有成员
      for (const member of existingMembers) {
        const updatedMember = updatedFields.committeeMembers.find(m => m.id === member.id);
        if (updatedMember) {
          await member.update(updatedMember);
        }
      }

      // 添加新成员
      const newMembersToAdd = updatedFields.committeeMembers.filter(member => !member.id);
      for (const newMember of newMembersToAdd) {
        await db.CommitteeMember.create({
          village_id: villageId,
          name: newMember.name,
          role: newMember.role,
        });
      }

      res.status(200).json({ message: '村庄信息更新成功' });
    } else {
      res.status(404).json({ error: '村庄未找到' });
    }
  } catch (error) {
    console.error('更新村庄信息出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 上传头图 API
app.post('/api/upload-header-image', upload.single('image'), async (req, res) => {
  try {
    // 这里假设头图存储在一个固定的路径下，并且只有一个头图
    const imagePath = req.file.path;
    // 更新数据库中的头图路径（这里假设有一个表来存储这些信息）
    // db.HeaderImage.update({ path: imagePath }, { where: { id: 1 } });
    res.status(200).json({ message: '头图上传成功', path: imagePath });
  } catch (error) {
    console.error('头图上传失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 删除头图 API
app.delete('/api/delete-header-image', async (req, res) => {
  try {
    // 假设头图存储在一个固定的路径下，并且只有一个头图
    const imagePath = 'path/to/current/header/image.jpg'; // 这里需要根据实际情况获取当前头图的路径
    fs.unlinkSync(imagePath); // 删除文件
    // 更新数据库中的头图路径（这里假设有一个表来存储这些信息）
    // db.HeaderImage.update({ path: null }, { where: { id: 1 } });
    res.status(200).json({ message: '头图删除成功' });
  } catch (error) {
    console.error('头图删除失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取当前头图 API
app.get('/api/get-header-image', async (req, res) => {
  try {
    // 假设头图存储在一个固定的路径下，并且只有一个头图
    const imagePath = 'path/to/current/header/image.jpg'; // 这里需要根据实际情况获取当前头图的路径
    res.status(200).json({ path: imagePath });
  } catch (error) {
    console.error('获取当前头图失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 添加通知 API
app.post('/api/notices', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: '通知标题和内容不能为空' });
    }
    const newNotice = await db.Notice.create({ title, content });
    res.status(201).json({ message: '通知添加成功', notice: newNotice });
  } catch (error) {
    console.error('添加通知失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
// 删除单个通知 API
app.delete('/api/notices/:id', async (req, res) => {
    try {
        const noticeId = req.params.id;

        // 查找并删除通知
        const deletedRows = await db.Notice.destroy({
            where: { id: noticeId }
        });

        if (deletedRows > 0) {
            res.status(200).json({ message: '通知删除成功' });
        } else {
            res.status(404).json({ error: '通知未找到' });
        }
    } catch (error) {
        console.error('删除通知出错：', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});
// 置顶通知
app.put('/api/notices/:id/pin', async (req, res) => {
  try {
    const noticeId = req.params.id;
    const [affectedRows] = await db.Notice.update(
      { isPinned: 1 },
      { where: { id: noticeId } }
    );

    if (affectedRows > 0) {
      const updatedNotice = await db.Notice.findByPk(noticeId);
      res.status(200).json({ message: '通知已置顶', notice: updatedNotice });
    } else {
      res.status(404).json({ error: '通知未找到' });
    }
  } catch (error) {
    console.error('置顶通知出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 取消置顶通知
app.put('/api/notices/:id/unpin', async (req, res) => {
  try {
    const noticeId = req.params.id;
    const [affectedRows] = await db.Notice.update(
      { isPinned: 0 },
      { where: { id: noticeId } }
    );

    if (affectedRows > 0) {
      const updatedNotice = await db.Notice.findByPk(noticeId);
      res.status(200).json({ message: '通知已取消置顶', notice: updatedNotice });
    } else {
      res.status(404).json({ error: '通知未找到' });
    }
  } catch (error) {
    console.error('取消置顶通知出错：', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});
sequelize
  .sync({ alter: true }) // 如果模型结构有变更，可以设置 alter: true 来自动更新表结构
  .then(() => console.log('所有模型同步成功'))
  .catch((err) => console.error('同步模型失败:', err));

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
  sequelize.sync({ alter: true }) // 同步数据库表
    .then(() => console.log('所有模型同步成功'))
    .catch(err => console.error('同步模型失败:', err));
});