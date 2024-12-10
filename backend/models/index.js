// 引入 dotenv 以加载 .env 文件
require('dotenv').config();

const Sequelize = require('sequelize');
const { DataTypes } = Sequelize; // 用于定义模型字段类型

// 数据库连接配置
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT // 数据库类型，例如 'mysql'
  }
);

console.log('DB Dialect:', process.env.DB_DIALECT);
console.log('DB Name:', process.env.DB_NAME);
console.log('DB Host:', process.env.DB_HOST);

// 初始化 db 对象
const db = {};

// 动态引入所有模型文件
const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname)
  .filter(file => 
    (file.indexOf('.') !== 0) && 
    (file !== 'index.js') && 
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// 建立关联关系
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 同步数据库，注意 `force: false` 避免覆盖现有数据
sequelize.sync({ force: false }) // 不修改现有数据
  .then(() => console.log('Database synchronized successfully'))
  .catch(err => console.error('Error syncing database:', err));

// 导出 db 对象
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;