module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define(
    'Notice',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
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
      isPinned: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      

    },
    {
      tableName: 'notices',
      timestamps: true,
    }
  );

  return Notice;
};
