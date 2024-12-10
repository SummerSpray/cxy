module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      InfoImg:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // 新增外键字段
      village_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 如果允许某些产品没有村庄关联，可以设为 true
        references: {
          model: 'villages', // 关联到 'villages' 表
          key: 'id', // 外键关联到 'villages' 表的 id 字段
        },
      },
    },
    {
      tableName: 'products',
      timestamps: true,
    }
  );

  // 定义与 Village 的关联
  Product.associate = (models) => {
    // 一个产品属于一个村庄
    Product.belongsTo(models.Village, {
      foreignKey: 'village_id',
      as: 'village', // 别名 'village'
    });
  };

  return Product;
};
