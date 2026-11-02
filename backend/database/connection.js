const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Determine Database Dialect and Target (MySQL, Postgres, or Zero-Config SQLite)
const dbDialect = process.env.DB_DIALECT ||
  (process.env.DATABASE_URL?.startsWith('mysql') ? 'mysql' :
    process.env.DATABASE_URL?.startsWith('postgres') ? 'postgres' : 'sqlite');

let sequelize;

if (dbDialect === 'mysql') {
  if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      logging: false,
      pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
    });
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME || 'vgsfinance_db',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
        dialect: 'mysql',
        logging: false,
        pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
      }
    );
  }
  console.log('🗄️ Database configured for MySQL Server engine.');
} else if (dbDialect === 'postgres') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    logging: false
  });
  console.log('🗄️ Database configured for PostgreSQL engine.');
} else {
  // Default: Zero-config SQLite stored locally in backend/database/vgsfinance.sqlite
  const dbPath = process.env.DB_PATH || path.join(__dirname, 'vgsfinance.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false
  });
  console.log('🗄️ Database configured for Zero-Config SQLite (Embedded local persistence).');
}

module.exports = sequelize;
