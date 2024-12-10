require('dotenv').config();  // 加载环境变量

const Sequelize = require('sequelize');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  db: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'village_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // 根据需要修改数据库类型
    logging: (msg) => {
      if (msg.includes('error') || msg.includes('Error')) {
        console.error(msg); // 只输出包含错误信息的日志
      }
    }
  },
};

// 如果你需要在其他地方使用 Sequelize 实例，可以在这里创建并导出
const sequelize = new Sequelize(
  module.exports.db.database,
  module.exports.db.username,
  module.exports.db.password,
  {
    host: module.exports.db.host,
    dialect: module.exports.db.dialect,
    logging: module.exports.db.logging, // 使用配置中的 logging 选项
  }
);

module.exports.sequelize = sequelize;