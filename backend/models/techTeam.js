// models/techTeam.js
module.exports = (sequelize, DataTypes) => {
  const TechTeam = sequelize.define(
    'TechTeam',
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
      members: {
        type: DataTypes.JSON,
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'techteams',
      timestamps: true,
    }
  );

  TechTeam.associate = (models) => {
  TechTeam.hasMany(models.TeamReport, { 
    foreignKey: 'team_id',
    as: 'TeamReports'
  });
   TechTeam.hasMany(models.User, { 
      foreignKey: 'team_id',
      as: 'Users'
    });

    
};

  return TechTeam;
};