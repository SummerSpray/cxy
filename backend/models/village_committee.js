// village_committee.js
module.exports = (sequelize, DataTypes) => {
  const VillageCommittee = sequelize.define('VillageCommittee', {
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
    committee_overview: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    committee_achievements: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    committee_tracking: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    tableName: 'village_committees',
    timestamps: false, // 启用 `createdAt` 和 `updatedAt` 字段
  });

  VillageCommittee.associate = (models) => {
    VillageCommittee.belongsTo(models.Village, {
      foreignKey: 'village_id',
      as: 'village',
    });

    // 添加对 CommitteeMember 的关联
    VillageCommittee.hasMany(models.CommitteeMember, {
      foreignKey: 'committee_id',
      as: 'committeeMembers',
    });
  };

  return VillageCommittee;
};