module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }, // 状态：待审核
  }, {
    timestamps: true
  });

  Content.associate = function(models) {
    // 定义关联关系
    // 例如，如果 Content 属于某个 Village
    Content.belongsTo(models.Village, {
      foreignKey: 'village_id',
      as: 'village'
    });
  };

  return Content;
};