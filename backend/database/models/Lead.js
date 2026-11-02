const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Lead = sequelize.define('Lead', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
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
  productName: {
    type: DataTypes.STRING,
    defaultValue: 'Personal Loan'
  },
  requestedAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tenureMonths: {
    type: DataTypes.INTEGER,
    defaultValue: 36
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'NEW' // NEW | FOLLOW_UP | DOCUMENT_COLLECTION | CONVERTED_DISBURSED | REJECTED
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 'HIGH' // LOW | MEDIUM | HIGH | URGENT
  },
  leadSource: {
    type: DataTypes.STRING,
    defaultValue: 'Website Portal Enquiry'
  },
  assignedTo: {
    type: DataTypes.STRING,
    defaultValue: 'Unassigned'
  },
  // Phase 6 – Financial Institution / Applicable Loan Process
  partnerBankId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  assignedBank: {
    type: DataTypes.STRING,
    defaultValue: 'Not Assigned Yet'
  },
  bankApplicationNo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bankProcessStage: {
    type: DataTypes.STRING,
    defaultValue: 'NOT_ROUTED' // NOT_ROUTED | SUBMITTED_TO_BANK | DOC_VERIFICATION | SANCTION_APPROVED | DISBURSED | REJECTED
  },
  sanctionedAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  sanctionedRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  bankRemarks: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  disbursedDate: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'loan_leads',
  timestamps: true
});

module.exports = Lead;

