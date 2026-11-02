const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  borrowerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  loanType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tenureMonths: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  interestRate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  monthlyEmi: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING' // PENDING | DOCUMENT_VERIFICATION | APPROVED | DISBURSED | CLOSED
  },
  appliedDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  purpose: {
    type: DataTypes.STRING,
    defaultValue: 'General Purpose'
  }
}, {
  tableName: 'disbursed_loans',
  timestamps: true
});

module.exports = Loan;

