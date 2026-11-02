// PM2 Production Process Manager Configuration for VPS Hosting
// Usage: pm2 start ecosystem.config.js --env production

module.exports = {
  apps: [
    {
      name: 'vgs-finance-api',
      script: './backend/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        DB_DIALECT: 'sqlite' // or 'mysql' with DB_HOST, DB_USER, DB_NAME
      }
    }
  ]
};

