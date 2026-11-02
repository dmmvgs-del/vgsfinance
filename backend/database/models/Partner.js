const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'Bank'
  },
  logoText: {
    type: DataTypes.STRING,
    allowNull: true
  },
  maxLtv: {
    type: DataTypes.STRING,
    defaultValue: '85%'
  },
  approvalRate: {
    type: DataTypes.STRING,
    defaultValue: '95%'
  }
}, {
  tableName: 'lending_partners',
  timestamps: true
});

module.exports = Partner;

