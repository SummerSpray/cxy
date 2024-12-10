// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'techteams',
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
      }
    },
    {
      tableName: 'users',
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.TechTeam, { foreignKey: 'team_id' });
    User.belongsTo(models.Village, { foreignKey: 'village_id' });
  };

  return User;
};