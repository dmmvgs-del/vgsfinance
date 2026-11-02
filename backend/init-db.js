const { sequelize, initDB } = require('./database/models');
require('dotenv').config();

async function runAutoSync() {
  console.log('====================================================');
  console.log('🗄️ VGS FINANCE – AUTOMATED DATABASE TABLES CREATION');
  console.log('====================================================\n');

  console.log(`📡 Dialect : ${sequelize.getDialect().toUpperCase()}`);
  console.log(`📦 Database: ${process.env.DB_NAME || 'vgsfinance'}`);
  console.log(`👤 User    : ${process.env.DB_USER || 'root'}`);
  console.log(`🌐 Host    : ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}\n`);

  try {
    console.log('⏳ Connecting to Database...');
    await sequelize.authenticate();
    console.log('✅ Connection established successfully!\n');

    console.log('⏳ Creating and synchronizing all tables (alter: true)...');
    await initDB();

    console.log('\n====================================================');
    console.log('🎉 SUCCESS! ALL TABLES CREATED AUTOMATICALLY:');
    console.log('====================================================');
    console.log(' 1. Categories          (16 Loan Categories seeded)');
    console.log(' 2. Products            (Curated Loan Products seeded)');
    console.log(' 3. Partners            (Partner Banks & NBFCs seeded)');
    console.log(' 4. Testimonials        (Customer Testimonials seeded)');
    console.log(' 5. Customers           (Customer Profiles Table)');
    console.log(' 6. Leads               (Loan Enquiries & Applications)');
    console.log(' 7. FollowUps           (Follow-up Interaction Logs)');
    console.log(' 8. Loans               (Sanctioned & Disbursed Loans)');
    console.log(' 9. AdminUsers          (Management & Officer Accounts)');
    console.log(' 10. WebsiteContents    (Dynamic CMS Content Table)');
    console.log('====================================================\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ DATABASE CONNECTION FAILED:');
    console.error(error.message);

    if (error.name === 'SequelizeAccessDeniedError') {
      console.log('\n💡 TIP: Access denied! Please check your DB_USER and DB_PASSWORD in backend/.env.');
    } else if (error.name === 'SequelizeConnectionRefusedError' || error.code === 'ETIMEDOUT') {
      console.log('\n💡 TIP: Connection refused or timed out!');
      console.log('   - If connecting from your local PC to Hostinger MySQL:');
      console.log('     1. Open Hostinger hPanel -> Databases -> Remote MySQL');
      console.log('     2. Add your current IP (or % for any IP) to allow remote connections.');
      console.log('     3. Use the Hostinger Remote MySQL Hostname/IP in DB_HOST.');
      console.log('   - If running directly on the Hostinger server, use DB_HOST=localhost.');
    }
    process.exit(1);
  }
}

runAutoSync();

