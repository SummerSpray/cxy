module.exports = (sequelize, DataTypes) => {
  const VillageLocation = sequelize.define('VillageLocation', {
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
    latitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: false
    },
  }, {
    tableName: 'village_locations',
    timestamps: false, // 启用 `createdAt` 和 `updatedAt` 字段
  });

  VillageLocation.associate = (models) => {
    VillageLocation.belongsTo(models.Village, {
      foreignKey: 'village_id',
      as: 'village',
    });
  };

  return VillageLocation;
};