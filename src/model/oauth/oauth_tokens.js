/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_tokens', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    access_token_expires_on: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    client_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    refresh_token_expires_on: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'oauth_tokens'
  });
};
