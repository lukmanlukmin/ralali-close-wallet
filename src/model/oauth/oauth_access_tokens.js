/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_access_tokens', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access_token_expires_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    client_detail_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'oauth_client_details',
        key: 'id'
      }
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refresh_token_expires_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'oauth_access_tokens'
  });
};
