module.exports = (sequelize, DataTypes) => {
  const Village = sequelize.define('Village', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'villages',
    timestamps: true, // 启用 `createdAt` 和 `updatedAt` 字段
  });

  Village.associate = (models) => {
    // 与 products 表的关联
    Village.hasMany(models.Product, {
      foreignKey: 'village_id', // 与 `products` 表中的外键一致
      as: 'products', // 别名为 'products'
    });

    // 与 village_committees 表的关联
    Village.hasOne(models.VillageCommittee, {
      foreignKey: 'village_id', // 与 `village_committees` 表中的外键一致
      as: 'committee', // 别名为 'committee'
    });

    // 与 village_status 表的关联
    Village.hasOne(models.VillageStatus, {
      foreignKey: 'village_id', // 与 `village_status` 表中的外键一致
      as: 'status', // 别名为 'status'
    });

    // 与 village_locations 表的关联
    Village.hasOne(models.VillageLocation, {
      foreignKey: 'village_id', // 与 `village_locations` 表中的外键一致
      as: 'location', // 别名为 'location'
    });
    
    // 与 users 表的关联
     Village.hasMany(models.User, {
      foreignKey: 'village_id',
      as: 'users',
    });
  };

  return Village;
};