/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('currency_idr', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: 'DOUBLE',
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'currency_idr'
  });
};
