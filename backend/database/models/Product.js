const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  categoryId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tagline: {
    type: DataTypes.STRING,
    allowNull: true
  },
  interestRate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  minAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  maxAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  minTenure: {
    type: DataTypes.INTEGER,
    defaultValue: 12
  },
  maxTenure: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  processingFee: {
    type: DataTypes.STRING,
    defaultValue: '1.5% + GST'
  },
  eligibility: {
    type: DataTypes.JSON, // Stores object { minAge, minIncome, employmentType, minCibilScore }
    allowNull: true
  },
  documentsRequired: {
    type: DataTypes.JSON, // Stores array of string document requirements
    allowNull: true
  },
  features: {
    type: DataTypes.JSON, // Stores array of feature bullets
    allowNull: true
  }
}, {
  tableName: 'loan_products',
  timestamps: true
});

module.exports = Product;

