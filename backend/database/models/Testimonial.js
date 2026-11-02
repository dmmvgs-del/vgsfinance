const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  loanType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'customer_testimonials',
  timestamps: true
});

module.exports = Testimonial;

