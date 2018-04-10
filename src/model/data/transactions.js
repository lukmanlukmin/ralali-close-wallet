/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
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
    trans_type: {
      type: DataTypes.ENUM('Order','Cancel','Refund','PartialRefund','Credit','Confirmed','Cashback','DebitToSettlement'),
      allowNull: false
    },
    trans_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    linked_txn_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transactions',
        key: 'id'
      }
    },
    obligor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    beneficiary_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    amount_currency: {
      type: DataTypes.ENUM('IDR','USD','CNY'),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount_idr: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'transactions'
  });
};
