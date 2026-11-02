# VGS Finance & Loans – VPS & Cloud Deployment Architecture Guide

This guide documents the enterprise deployment procedures for **VGS Finance & Loans Management System** on a Linux Virtual Private Server (VPS), containerized environments, and cloud infrastructure.

---

## 🏗️ 1. Platform & Hosting Architecture

```
Internet / Client Requests
          │
          ▼
   [ Nginx Reverse Proxy ] (Ports 80 & 443 with Let's Encrypt SSL)
          │
    ┌─────┴────────────────────────────────┐
    ▼                                      ▼
[ Static React SPA ]            [ Express API Backend ]
(Serves /frontend/dist)         (PM2 Cluster on 127.0.0.1:5000)
                                           │
                                ┌──────────┴──────────┐
                                ▼                     ▼
                        [ SQLite / MySQL DB ]  [ Cloud Services ]
                        (Sequelize Auto-Sync)  - Fast2SMS / Twilio
                                               - Meta WhatsApp Cloud API
                                               - Google Workspace SMTP
                                               - CIBIL / Experian Bureau
```

---

## 🖥️ 2. VPS Server Provisioning (Ubuntu 24.04 LTS / Debian 12)

### Step 2.1 – System Update & Node.js 20 LTS Installation:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential nginx certbot python3-certbot-nginx

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### Step 2.2 – Clone Repository & Install Dependencies:
```bash
cd /var/www
sudo git clone <YOUR_GIT_REPO_URL> vgsfinance
cd /var/www/vgsfinance

# Install dependencies & build production bundle
npm install
npm --prefix frontend install
npm --prefix frontend run build
```

---

## ⚡ 3. PM2 Process Manager Configuration (`ecosystem.config.js`)

Launch the backend Express cluster:
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

## 🛡️ 4. Nginx Reverse Proxy & SSL Configuration (`deploy/nginx.conf`)

1. Copy the configuration file:
```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/vgsfinance
sudo ln -s /etc/nginx/sites-available/vgsfinance /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
```

2. Test Nginx syntax and reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

3. Provision Free Automated Let's Encrypt SSL:
```bash
sudo certbot --nginx -d vgsfinance.com -d www.vgsfinance.com
```

---

## 🐳 5. Containerized Deployment (Docker & Docker Compose)

Deploy the full stack including MySQL database, backend API, and Nginx proxy with a single command:
```bash
docker compose -f deploy/docker-compose.yml up -d --build
```

---

## ☁️ 6. Cloud & External Services Configuration (`.env`)

Configure third-party service credentials in your production `.env`:

```env
# 1. Environment & Network
NODE_ENV=production
PORT=5000

# 2. Database Layer (MySQL Multi-Dialect)
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=vgsfinance_db
DB_USER=vgs_user
DB_PASSWORD=your_secure_password

# 3. OTP & SMS Gateway (Fast2SMS / MSG91 / Twilio)
SMS_PROVIDER=FAST2SMS
FAST2SMS_API_KEY=your_fast2sms_dlt_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# 4. WhatsApp Business Cloud API (Meta Graph v19.0)
WHATSAPP_CLOUD_API_TOKEN=your_meta_system_user_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id_from_meta

# 5. SMTP / Business Email (Google Workspace / Amazon SES)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@vgsfinance.com
SMTP_PASS=your_app_password
ADMIN_ALERT_EMAIL=underwriting@vgsfinance.com

# 6. Third-Party Financial APIs (Experian / CIBIL / NSDL)
CIBIL_API_KEY=your_credit_bureau_key
NSDL_PAN_API_KEY=your_pan_verification_key
NPCI_PENNY_DROP_API_KEY=your_bank_account_verification_key
```

