/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth_client_app', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    app_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    application_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    application_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'oauth_client_app'
  });
};
