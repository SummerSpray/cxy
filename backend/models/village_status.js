module.exports = (sequelize, DataTypes) => {
  const VillageStatus = sequelize.define('VillageStatus', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    village_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Villages',
        key: 'id'
      }
    },
    status_overview: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status_map: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_structure: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status_dynamic_map: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
  }, {
    tableName: 'village_status',
    timestamps: false, // 启用 `createdAt` 和 `updatedAt` 字段
  });

  VillageStatus.associate = (models) => {
    VillageStatus.belongsTo(models.Village, {
      foreignKey: 'village_id',
      as: 'village',
    });
  };

  return VillageStatus;
};