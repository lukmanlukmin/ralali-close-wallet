/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  sequelize.associate = models => {
    models.transactions.belongsTo(models.currency, {
      foreignKey: 'currency_id'
    })
  }
  
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    trans_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Order','Refund','PartialRefund','Credit','Confirmed','Cashback','DebitToSettlement'),
      allowNull: false
    },
    trans_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Pending','Cancel','Completed'),
      allowNull: false
    },
    obligor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    beneficiary_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    linked_trans_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    currency_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'currency',
        key: 'id'
      }
    },
    info_1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    info_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'transactions'
  });
};
