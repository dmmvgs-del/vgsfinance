const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: 'Hyderabad'
  },
  employmentType: {
    type: DataTypes.STRING,
    defaultValue: 'Salaried'
  },
  monthlyIncome: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  cibilScore: {
    type: DataTypes.INTEGER,
    defaultValue: 750
  },
  kycStatus: {
    type: DataTypes.STRING,
    defaultValue: 'VERIFIED' // PENDING | VERIFIED | REJECTED
  },
  totalLoansEnquired: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  totalAmountEnquired: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  tableName: 'customers',
  timestamps: true
});

module.exports = Customer;

