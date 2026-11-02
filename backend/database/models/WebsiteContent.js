const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const WebsiteContent = sequelize.define('WebsiteContent', {
  key: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false // 'hero', 'company', 'contact', 'compliance', 'seo'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.JSON,
    allowNull: false
  },
  lastUpdatedBy: {
    type: DataTypes.STRING,
    defaultValue: 'System Admin'
  }
}, {
  tableName: 'website_content',
  timestamps: true
});

module.exports = WebsiteContent;

