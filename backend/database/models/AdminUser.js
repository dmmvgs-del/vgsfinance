const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const AdminUser = sequelize.define('AdminUser', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'LOAN_OFFICER' // 'SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_MANAGER'
  },
  permissions: {
    type: DataTypes.JSON,
    defaultValue: ['LEADS_VIEW', 'LEADS_UPDATE']
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'admin_users',
  timestamps: true
});

module.exports = AdminUser;

