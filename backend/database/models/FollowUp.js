const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const FollowUp = sequelize.define('FollowUp', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  leadId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  nextDate: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'lead_follow_ups',
  timestamps: true
});

module.exports = FollowUp;

