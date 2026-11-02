const fs = require('fs');
const path = require('path');
const {
  Category, Product, Partner, Testimonial, Customer, Lead, FollowUp, AdminUser, WebsiteContent
} = require('./database/models');

async function generate() {
  const categories = await Category.findAll();
  const products = await Product.findAll();
  const partners = await Partner.findAll();
  const testimonials = await Testimonial.findAll();
  const customers = await Customer.findAll();
  const admins = await AdminUser.findAll();
  const leads = await Lead.findAll();
  const followups = await FollowUp.findAll();

  let sql = '-- ====================================================\n';
  sql += '-- VGS Finance & Loans Management System - Full Schema & Seed\n';
  sql += '-- Hostinger MySQL / phpMyAdmin Ready\n';
  sql += '-- Database: u218019073_Vgsfinance\n';
  sql += '-- ====================================================\n\n';
  sql += 'SET FOREIGN_KEY_CHECKS = 0;\n\n';

  // 1. Categories
  sql += 'CREATE TABLE IF NOT EXISTS `categories` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `name` VARCHAR(255) NOT NULL,\n';
  sql += '  `icon` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `description` TEXT DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 2. Products
  sql += 'CREATE TABLE IF NOT EXISTS `products` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `categoryId` VARCHAR(255) NOT NULL,\n';
  sql += '  `name` VARCHAR(255) NOT NULL,\n';
  sql += '  `tagline` TEXT DEFAULT NULL,\n';
  sql += '  `interestRate` FLOAT NOT NULL,\n';
  sql += '  `minAmount` DOUBLE NOT NULL,\n';
  sql += '  `maxAmount` DOUBLE NOT NULL,\n';
  sql += '  `minTenure` INT NOT NULL,\n';
  sql += '  `maxTenure` INT NOT NULL,\n';
  sql += '  `processingFee` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `eligibility` TEXT DEFAULT NULL,\n';
  sql += '  `documentsRequired` TEXT DEFAULT NULL,\n';
  sql += '  `features` TEXT DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n';
  sql += '  INDEX `idx_categoryId` (`categoryId`)\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 3. Partners
  sql += 'CREATE TABLE IF NOT EXISTS `partners` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `name` VARCHAR(255) NOT NULL,\n';
  sql += '  `code` VARCHAR(255) NOT NULL,\n';
  sql += '  `type` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `logoText` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `maxLtv` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `approvalRate` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `features` TEXT DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 4. Testimonials
  sql += 'CREATE TABLE IF NOT EXISTS `testimonials` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `name` VARCHAR(255) NOT NULL,\n';
  sql += '  `loanType` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `amount` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `city` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `rating` INT DEFAULT 5,\n';
  sql += '  `comment` TEXT DEFAULT NULL,\n';
  sql += '  `avatar` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 5. Customers
  sql += 'CREATE TABLE IF NOT EXISTS `customers` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `fullName` VARCHAR(255) NOT NULL,\n';
  sql += '  `phone` VARCHAR(255) NOT NULL UNIQUE,\n';
  sql += '  `email` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `city` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `employmentType` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `monthlyIncome` DOUBLE DEFAULT 0,\n';
  sql += '  `cibilScore` INT DEFAULT NULL,\n';
  sql += '  `kycStatus` VARCHAR(255) DEFAULT \'PENDING\',\n';
  sql += '  `totalLoansEnquired` INT DEFAULT 0,\n';
  sql += '  `totalAmountEnquired` DOUBLE DEFAULT 0,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 6. Leads
  sql += 'CREATE TABLE IF NOT EXISTS `leads` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `customerId` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `customerName` VARCHAR(255) NOT NULL,\n';
  sql += '  `phone` VARCHAR(255) NOT NULL,\n';
  sql += '  `email` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `city` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `employmentType` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `monthlyIncome` DOUBLE DEFAULT NULL,\n';
  sql += '  `productName` VARCHAR(255) NOT NULL,\n';
  sql += '  `requestedAmount` DOUBLE NOT NULL,\n';
  sql += '  `tenureMonths` INT NOT NULL,\n';
  sql += '  `status` VARCHAR(255) DEFAULT \'NEW_ENQUIRY\',\n';
  sql += '  `priority` VARCHAR(255) DEFAULT \'HIGH\',\n';
  sql += '  `leadSource` VARCHAR(255) DEFAULT \'Website Portal Enquiry\',\n';
  sql += '  `assignedTo` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `partnerBankId` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `assignedBank` VARCHAR(255) DEFAULT \'Not Assigned Yet\',\n';
  sql += '  `bankApplicationNo` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `bankProcessStage` VARCHAR(255) DEFAULT \'NOT_ROUTED\',\n';
  sql += '  `sanctionedAmount` DOUBLE DEFAULT NULL,\n';
  sql += '  `sanctionedRate` FLOAT DEFAULT NULL,\n';
  sql += '  `bankRemarks` TEXT DEFAULT NULL,\n';
  sql += '  `disbursedDate` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n';
  sql += '  INDEX `idx_customerId` (`customerId`)\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 7. FollowUps
  sql += 'CREATE TABLE IF NOT EXISTS `follow_ups` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `leadId` VARCHAR(255) NOT NULL,\n';
  sql += '  `date` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `notes` TEXT DEFAULT NULL,\n';
  sql += '  `nextDate` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n';
  sql += '  INDEX `idx_leadId` (`leadId`)\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 8. Loans
  sql += 'CREATE TABLE IF NOT EXISTS `loans` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `leadId` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `customerId` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `loanType` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `amount` DOUBLE DEFAULT NULL,\n';
  sql += '  `interestRate` FLOAT DEFAULT NULL,\n';
  sql += '  `tenureMonths` INT DEFAULT NULL,\n';
  sql += '  `status` VARCHAR(255) DEFAULT \'ACTIVE\',\n';
  sql += '  `disbursalDate` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 9. AdminUsers
  sql += 'CREATE TABLE IF NOT EXISTS `admin_users` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `username` VARCHAR(255) NOT NULL UNIQUE,\n';
  sql += '  `password` VARCHAR(255) NOT NULL,\n';
  sql += '  `fullName` VARCHAR(255) NOT NULL,\n';
  sql += '  `email` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `phone` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `role` VARCHAR(255) DEFAULT \'LOAN_OFFICER\',\n';
  sql += '  `isActive` TINYINT(1) DEFAULT 1,\n';
  sql += '  `lastLogin` VARCHAR(255) DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // 10. WebsiteContents
  sql += 'CREATE TABLE IF NOT EXISTS `website_contents` (\n';
  sql += '  `id` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
  sql += '  `key` VARCHAR(255) NOT NULL UNIQUE,\n';
  sql += '  `content` TEXT DEFAULT NULL,\n';
  sql += '  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n';
  sql += '  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n';
  sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n';

  // Helper escape
  const esc = (val) => {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return val;
    if (typeof val === 'object') {
      const s = JSON.stringify(val);
      return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
    }
    const s = String(val);
    return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  };

  // Seed Categories
  sql += '-- Seed Categories\n';
  for (const c of categories) {
    sql += `INSERT INTO \`categories\` (\`id\`, \`name\`, \`icon\`, \`description\`) VALUES (${esc(c.id)}, ${esc(c.name)}, ${esc(c.icon)}, ${esc(c.description)}) ON DUPLICATE KEY UPDATE \`name\`=VALUES(\`name\`);\n`;
  }
  sql += '\n';

  // Seed Products
  sql += '-- Seed Products\n';
  for (const p of products) {
    sql += `INSERT INTO \`products\` (\`id\`, \`categoryId\`, \`name\`, \`tagline\`, \`interestRate\`, \`minAmount\`, \`maxAmount\`, \`minTenure\`, \`maxTenure\`, \`processingFee\`, \`eligibility\`, \`documentsRequired\`, \`features\`) VALUES (${esc(p.id)}, ${esc(p.categoryId)}, ${esc(p.name)}, ${esc(p.tagline)}, ${esc(p.interestRate)}, ${esc(p.minAmount)}, ${esc(p.maxAmount)}, ${esc(p.minTenure)}, ${esc(p.maxTenure)}, ${esc(p.processingFee)}, ${esc(p.eligibility)}, ${esc(p.documentsRequired)}, ${esc(p.features)}) ON DUPLICATE KEY UPDATE \`name\`=VALUES(\`name\`);\n`;
  }
  sql += '\n';

  // Seed Partners
  sql += '-- Seed Partners\n';
  for (const p of partners) {
    sql += `INSERT INTO \`partners\` (\`id\`, \`name\`, \`code\`, \`type\`, \`logoText\`, \`maxLtv\`, \`approvalRate\`, \`features\`) VALUES (${esc(p.id)}, ${esc(p.name)}, ${esc(p.code)}, ${esc(p.type)}, ${esc(p.logoText)}, ${esc(p.maxLtv)}, ${esc(p.approvalRate)}, ${esc(p.features)}) ON DUPLICATE KEY UPDATE \`name\`=VALUES(\`name\`);\n`;
  }
  sql += '\n';

  // Seed Testimonials
  sql += '-- Seed Testimonials\n';
  for (const t of testimonials) {
    sql += `INSERT INTO \`testimonials\` (\`id\`, \`name\`, \`loanType\`, \`amount\`, \`city\`, \`rating\`, \`comment\`, \`avatar\`) VALUES (${esc(t.id)}, ${esc(t.name)}, ${esc(t.loanType)}, ${esc(t.amount)}, ${esc(t.city)}, ${esc(t.rating)}, ${esc(t.comment)}, ${esc(t.avatar)}) ON DUPLICATE KEY UPDATE \`name\`=VALUES(\`name\`);\n`;
  }
  sql += '\n';

  // Seed Customers
  sql += '-- Seed Customers\n';
  for (const cust of customers) {
    sql += `INSERT INTO \`customers\` (\`id\`, \`fullName\`, \`phone\`, \`email\`, \`city\`, \`employmentType\`, \`monthlyIncome\`, \`cibilScore\`, \`kycStatus\`, \`totalLoansEnquired\`, \`totalAmountEnquired\`) VALUES (${esc(cust.id)}, ${esc(cust.fullName)}, ${esc(cust.phone)}, ${esc(cust.email)}, ${esc(cust.city)}, ${esc(cust.employmentType)}, ${esc(cust.monthlyIncome)}, ${esc(cust.cibilScore)}, ${esc(cust.kycStatus)}, ${esc(cust.totalLoansEnquired)}, ${esc(cust.totalAmountEnquired)}) ON DUPLICATE KEY UPDATE \`fullName\`=VALUES(\`fullName\`);\n`;
  }
  sql += '\n';

  // Seed Admin User
  sql += '-- Seed Admin User (admin / admin123)\n';
  sql += "INSERT INTO `admin_users` (`id`, `username`, `password`, `fullName`, `email`, `role`, `isActive`) VALUES ('adm-super', 'admin', 'admin123', 'Super Administrator', 'reachus@ascendmedialabs.com', 'SUPER_ADMIN', 1) ON DUPLICATE KEY UPDATE `username`=VALUES(`username`);\n\n";

  // Seed Leads
  sql += '-- Seed Sample Leads\n';
  for (const l of leads) {
    sql += `INSERT INTO \`leads\` (\`id\`, \`customerId\`, \`customerName\`, \`phone\`, \`email\`, \`city\`, \`employmentType\`, \`monthlyIncome\`, \`productName\`, \`requestedAmount\`, \`tenureMonths\`, \`status\`, \`priority\`, \`leadSource\`, \`assignedTo\`, \`assignedBank\`, \`bankProcessStage\`, \`sanctionedAmount\`, \`sanctionedRate\`) VALUES (${esc(l.id)}, ${esc(l.customerId)}, ${esc(l.customerName)}, ${esc(l.phone)}, ${esc(l.email)}, ${esc(l.city)}, ${esc(l.employmentType)}, ${esc(l.monthlyIncome)}, ${esc(l.productName)}, ${esc(l.requestedAmount)}, ${esc(l.tenureMonths)}, ${esc(l.status)}, ${esc(l.priority)}, ${esc(l.leadSource)}, ${esc(l.assignedTo)}, ${esc(l.assignedBank)}, ${esc(l.bankProcessStage)}, ${esc(l.sanctionedAmount)}, ${esc(l.sanctionedRate)}) ON DUPLICATE KEY UPDATE \`customerName\`=VALUES(\`customerName\`);\n`;
  }
  sql += '\n';

  // Seed FollowUps
  sql += '-- Seed FollowUps\n';
  for (const f of followups) {
    sql += `INSERT INTO \`follow_ups\` (\`id\`, \`leadId\`, \`date\`, \`notes\`, \`nextDate\`) VALUES (${esc(f.id)}, ${esc(f.leadId)}, ${esc(f.date)}, ${esc(f.notes)}, ${esc(f.nextDate)}) ON DUPLICATE KEY UPDATE \`notes\`=VALUES(\`notes\`);\n`;
  }
  sql += '\n';

  sql += 'SET FOREIGN_KEY_CHECKS = 1;\n';

  const outPath = path.join(__dirname, '..', 'vgsfinance_full.sql');
  fs.writeFileSync(outPath, sql, 'utf8');
  console.log('✅ Generated MySQL export at:', outPath, 'Length:', sql.length, 'bytes');
}

generate().catch(console.error);
