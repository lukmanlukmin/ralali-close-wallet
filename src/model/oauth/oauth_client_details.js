/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_client_details', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    client_app_id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      references: {
        model: 'oauth_client_app',
        key: 'id'
      }
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access_token_validity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    additional_information: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authorities: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authorized_grant_types: {
      type: DataTypes.STRING,
      allowNull: true
    },
    client_secret: {
      type: DataTypes.STRING,
      allowNull: true
    },
    refresh_token_validity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    resource_ids: {
      type: DataTypes.STRING,
      allowNull: true
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true
    },
    web_server_redirect_uri: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'oauth_client_details'
  });
};
