// models/team_reports.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const TeamReport = sequelize.define(
    'TeamReport',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'techteams',
          key: 'id',
        },
      },
      report_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      report_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'team_reports',
      timestamps: true,
    }
  );

  TeamReport.associate = (models) => {
  TeamReport.belongsTo(models.TechTeam, { foreignKey: 'team_id' });
};

  return TeamReport;
};