/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_clients', {
    client_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_secret: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    redirect_uri: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'oauth_clients'
  });
};
