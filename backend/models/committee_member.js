// committee_member.js
module.exports = (sequelize, DataTypes) => {
  const CommitteeMember = sequelize.define('CommitteeMember', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    committee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'VillageCommittees',
        key: 'id'
      }
    },
    village_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'villages',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'committee_members',
    timestamps: false, // 启用 `createdAt` 和 `updatedAt` 字段
  });

  CommitteeMember.associate = (models) => {
    CommitteeMember.belongsTo(models.VillageCommittee, {
      foreignKey: 'committee_id',
      as: 'committee',
    });

     CommitteeMember.belongsTo(models.Village, {
      foreignKey: 'village_id',
      as: 'village',
    });
  };

  return CommitteeMember;
};