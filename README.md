# VGS Finance & Loans Management System (Enterprise Edition)

Full-Stack Financial Services and Loan Management Platform built with **React**, **Tailwind CSS**, **Node.js Express**, and **Sequelize ORM** with Automated Schema Synchronization.

---

## 🌐 WEBSITE DEVELOPMENT SCOPE – Home Page Architecture

The Home Page ([`App.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/App.jsx)) is structured with high-conversion financial components covering all 9 required sections:

| # | Home Page Section | Component File | Description & Scope |
| :-: | :--- | :--- | :--- |
| **1** | **Hero Banner** | [`HeroSection.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/HeroSection.jsx) | High-impact fintech headline, India #1 trust badge, 2-hour sanction guarantees, interest rate callouts (from 8.5%), and primary CTAs (`Apply Now`, `Calculate EMI`). |
| **2** | **Loan Search / Enquiry Section** | [`LoanSearchSection.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/LoanSearchSection.jsx) | Interactive discovery engine allowing borrowers to search by keywords/purpose, select loan categories, adjust real-time amount sliders (₹50K to ₹1Cr), and trigger instant comparison or fast enquiry. |
| **3** | **Popular Loan Categories** | [`PopularCategoriesSection.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/PopularCategoriesSection.jsx) | Interactive 16-card portfolio grid with family filter pills (`Retail`, `Business`, `Property`, `Professional`, `Equipment`) showcasing all 16 loan categories with live interest rates, limits, and 1-click discovery. |
| **4** | **Featured Loan Products** | [`FeaturedLoanProducts.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/FeaturedLoanProducts.jsx) | Spotlight comparison cards highlighting top-tier market loan offerings (e.g. `VGS Express Personal Loan`, `VGS Business Growth Loan`, `VGS Super Fast Gold Loan`) with interest rates, processing fees, and direct application CTAs. |
| **5** | **Why Choose Us** | [`WhyChooseUs.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/WhyChooseUs.jsx) | 6 customer trust pillars (Multi-Bank Aggregator, 2-Hour In-Principle Approval, Lowest Interest Rates, 100% Paperless Digital KYC, Zero Upfront Fees, Dedicated Loan Advisor) + live performance metrics counter (₹150+ Cr Disbursed, 12.5k+ Borrowers, 99.2% Sanction Rate, 15+ Banks). |
| **6** | **Financial Partner Section** | [`PartnersSection.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/PartnersSection.jsx) | Official lending network showcase featuring SBI, HDFC Bank, ICICI Bank, Bajaj Finserv, Tata Capital, and Kotak Mahindra with maximum LTVs and approval metrics. |
| **7** | **Customer Testimonials** | [`TestimonialsSection.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/TestimonialsSection.jsx) | Real borrower feedback cards with 5-star ratings, sanctioned loan amounts, customer locations, and loan type tags. |
| **8** | **Quick Enquiry Section** | [`QuickEnquirySection.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/QuickEnquirySection.jsx) | 30-second rapid callback enquiry widget (Name, Phone, Loan Amount, Category, Preferred Callback Window) generating real-time database Lead IDs (`LD-*`) and WhatsApp priority triggers. |
| **9** | **Contact Section** | [`ContactEnquiryForm.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/ContactEnquiryForm.jsx) | Comprehensive 13-step loan application form, direct phone (`tel:`), email (`mailto:`), 1-click WhatsApp advisory desk (`wa.me`), headquarters address, and branch offices locator. |

---

## 📑 LOAN DETAILS PAGE ARCHITECTURE (All 13 Comprehensive Sections)

The platform provides a dedicated, high-conversion **Loan Details Page** ([`LoanDetailsPage.jsx`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/frontend/src/components/LoanDetailsPage.jsx)) accessible from any product card in the Loan Supermarket (`LoanProducts.jsx`) and Featured Products section (`FeaturedLoanProducts.jsx`). It comprehensively covers all 13 required business specifications:

| # | Specification Item | Implementation Scope & Highlights |
| :-: | :--- | :--- |
| **1** | **Loan Name** | Product title with category badge, Product ID, verified lender network pill, and official institution backing. |
| **2** | **Loan Description** | Comprehensive in-depth overview explaining loan purpose, borrower target profile, usage scenarios (working capital, asset purchase, debt consolidation, medical emergency). |
| **3** | **Key Benefits** | 6+ visual value highlight cards (lowest benchmark rates, paperless digital KYC, 24-48 hour rapid sanction, zero hidden fees, high LTV, flexible part-prepayment). |
| **4** | **Loan Amount Information** | Minimum & maximum borrowing quantum (formatted in Indian currency ₹), sanction milestones, and indicative Loan-to-Value (LTV up to 85%-95%). |
| **5** | **Interest Rate Information** | Annual Percentage Rate (% p.a.), reducing-balance calculation formula disclosure, floating/fixed repo-linked rate terms, and transparent processing fees. |
| **6** | **Tenure Information** | Minimum & maximum tenure in months & years (12 to 360 months), monthly NACH auto-debit schedule, and part-prepayment / early foreclosure policies. |
| **7** | **Basic Eligibility** | Detailed criteria: Borrower age (21-65 yrs), minimum net monthly income (₹25,000+), acceptable employment profiles (Salaried MNC/Govt, Self-Employed Professionals, MSMEs), minimum CIBIL score (680+), and 50% FOIR capacity guideline. |
| **8** | **Required Documents** | Organized into 4 categorized checklists: (1) Salaried Applicants, (2) Self-Employed & MSMEs, (3) Collateral / Property Deeds, and (4) Standard KYC & Address Proofs. |
| **9** | **Loan Process Information** | 5-step interactive visual roadmap: Step 1 (Online Enquiry) ➔ Step 2 (Document Pickup) ➔ Step 3 (Credit Underwriting) ➔ Step 4 (Sanction Letter) ➔ Step 5 (Direct Bank Disbursal). |
| **10** | **EMI Calculator** | Live embedded reducing-balance simulator with Amount, Interest Rate, and Tenure sliders, live monthly EMI, total interest, total payment, visual principal vs. interest breakdown, and a 6-month initial amortization preview table. |
| **11** | **Apply Now** | Primary conversion button carrying calculated loan amount, tenure, and EMI directly to the comprehensive Application Desk with instant pre-population. |
| **12** | **Enquire Now** | Rapid 1-click callback button triggering an instant enquiry modal (Name, Mobile, City) with a guaranteed 15-minute callback SLA. |
| **13** | **Contact Information** | Dedicated loan officer desk: Toll-Free Helpline (`1800-425-9988`), WhatsApp Advisory Desk (`+91 7675852618`), Email Desk (`reachus@ascendmedialabs.com`), and Visakhapatnam regional operations hub. |

---

## 💼 Comprehensive Loan Categories & Financial Products (All 16 Products)

VGS Finance centralizes the complete spectrum of retail, commercial, enterprise, and professional credit solutions across 16 specialized categories:

1. **👤 Personal Loan:** Quick unsecured capital for medical emergencies, travel, weddings, or debt consolidation (from 10.5% p.a.).
2. **🏢 Business Loan:** Working capital and collateral-free enterprise term loans for trade expansion, machinery, and inventory (from 11.5% p.a.).
3. **🏠 Home Loan:** Competitive housing purchase, villa construction, and plot loan solutions with extended 30-year tenures (from 8.4% p.a.).
4. **🚗 Car Loan:** Affordable auto financing with up to 95% on-road funding for new and pre-owned personal cars (from 8.85% p.a.).
5. **🪙 Gold Loan:** Instant 15-minute cash or NEFT against gold jewelry with bank-grade vault security and lowest rates (from 8.5% p.a.).
6. **🎓 Education Loan:** 100% course fee and living costs coverage for higher studies in India and premier universities across 30+ countries (from 9.25% p.a.).
7. **🏛️ Mortgage Loan:** Structured high-ticket real estate mortgage lines against residential or commercial properties (from 9.0% p.a.).
8. **🏢 Loan Against Property (LAP):** Long-term financing unlocking high equity value from residential, commercial, or industrial real estate (from 9.15% p.a.).
9. **💼 Professional Loan:** Unsecured customized credit lines for practicing Chartered Accountants, CS, Architects, and Consultants (from 10.75% p.a.).
10. **🩺 Doctor Loan:** Pre-approved high-ticket funding for Doctors, Dentists, and Surgeons for clinic setup and healthcare equipment (from 9.99% p.a.).
11. **⚙️ Equipment Loan:** Finance industrial machinery, diagnostic systems, and manufacturing plant tools with flexible tenures (from 10.95% p.a.).
12. **🚛 Commercial Vehicle Loan:** Financing for heavy trucks, buses, tippers, tankers, and light commercial vehicles (LCVs) (from 10.5% p.a.).
13. **📈 Working Capital Loan:** Revolving Cash Credit (CC) and Overdraft (OD) limits to maintain smooth day-to-day business operations (from 11.25% p.a.).
14. **👔 Self-Employed Professional Loan:** Unsecured capital for freelance tech consultants, legal advisors, designers, and independent practitioners (from 11.75% p.a.).
15. **🏗️ Construction Equipment Loan:** Specialized loans for excavators, road rollers, cranes, backhoe loaders, and heavy infrastructure machinery (from 10.75% p.a.).
16. **💳 Other Financial Products:** Debt consolidation, balance transfers with top-up, microfinance, and bespoke credit lines (from 9.75% p.a.).

---

## 🌟 Key Modules & Features

### 1. 🌐 Public-Facing Portal & Website
- **Hero Showcase:** Key loan highlights, trust metrics, instant sanction guarantees.
- **Loan Products Portfolio:** Personal, Business, Gold, Vehicle, and Housing Loans.
- **Interactive EMI Calculator:** Live mathematical reducing-balance EMI calculations with amount, rate, and tenure sliders.
- **Loan Eligibility Engine:** Dynamic calculation based on monthly income and existing liabilities (FOIR 50%).
- **Documentation Guide:** Required document checklists for Salaried, Business, Gold, and Property loans.
- **Partner Banks & NBFCs:** Network showcase (SBI, HDFC, ICICI, Bajaj Finserv, Tata Capital, Kotak).
- **Customer Testimonials:** Verified borrower reviews, sanctioned amounts, and ratings.
- **Loan Enquiry Portal:** Direct online application submission with automated Lead ID tracking.

### 2. 🔒 Executive Admin Dashboard
- **Lead & Enquiry Management:** Search, filter by status (`NEW`, `FOLLOW_UP`, `DOCUMENT_COLLECTION`, `CONVERTED_DISBURSED`, `REJECTED`), and reassign officers.
- **Follow-up Interaction Logs:** Track customer call notes, past conversation history, and schedule reminder dates.
- **Loan Product Management:** Add, configure, and customize loan products, interest rates, and loan limits.
- **Basic Reports & Analytics:**
  - Total lead counts and conversion rate (%)
  - Pipeline requested volume vs. disbursed capital
  - Demand distribution breakdown by loan product
  - Recovery and collection efficiency

### 3. 🗄️ Automated Database Synchronization
- **Zero-Migration Auto-Sync:** On application launch or redeployment, `sequelize.sync({ alter: true })` automatically inspects, creates, and updates tables and columns.
- **Permanent Data Persistence:** All customer enquiries, follow-up notes, and products are stored permanently in the database (`backend/database/vgsfinance.sqlite`).
- **Database Query Filtering:** Search, status filtering, and sorting run directly at the database query level (`Op.like`, `Op.eq`).

---

## 🚀 How to Run the Application

### 1. Backend Server:
```powershell
npm run backend
```
> Runs the API server and database auto-sync on **http://localhost:5000**.

### 2. Frontend Client:
```powershell
npm run frontend
```
> Launches the React client on **http://localhost:3000**.
> Access the **Admin Dashboard** anytime via the top right **"🔒 Admin Login"** button.

---

## 🏛️ SYSTEM ARCHITECTURE

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CLIENT APPLICATION                                     │
├───────────────────────────────┬────────────────────────────┬───────────────────────────┤
│    Public Responsive Website  │   Loan Enquiry Interface   │      Admin Dashboard      │
│  - Supermarket Loan Discovery │  - 13-Step Ingestion Form  │  - Auth Protected Desk    │
│  - Reducing Balance EMI Calc  │  - Instant Lead ID (LD-*)  │  - 5-Stage Lead Pipeline  │
│  - 50% FOIR Eligibility Engine│  - Real-time Lead Tracking │  - Follow-up Logs & Bank  │
│  - Categorized Doc Checklists │  - WhatsApp 1-Click Support│  - Customer KYC & CIBIL   │
└───────────────────────────────┴─────────────┬──────────────┴───────────────────────────┘
                                              │ REST API / JSON
                                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  BACKEND SERVICES                                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • REST APIs: Express 4.x modular router running on Node.js                             │
│ • Admin Authentication: JWT token verification & role enforcement (`/api/auth/*`)      │
│ • Loan Management APIs: Categories & Products catalog CRUD (`/api/categories`, /products)│
│ • Customer Enquiry APIs: Public borrower submission & auto-profiling (`/api/leads`)    │
│ • Lead Management APIs: Multi-factor search, stage transitions (`/api/leads/*`)        │
│ • Follow-up APIs: Interaction history & callback scheduling (`/api/leads/:id/follow-up`)│
│ • Notification APIs: WhatsApp (`wa.me`), transactional Email, and SMS dispatch         │
│ • Reports APIs: Real-time analytics, pipeline conversion, product demand breakdown     │
└─────────────────────────────────────────────┬──────────────────────────────────────────┘
                                              │ Sequelize ORM (Auto-Sync)
                                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   DATABASE LAYER                                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Multi-Dialect Support: MySQL (via mysql2), PostgreSQL (pg), and SQLite (zero-config) │
│ • Customer Tables (`customers`): CIBIL score, KYC status, employment, aggregated debt  │
│ • Loan Category Tables (`loan_categories`): Categorized loan families & metadata       │
│ • Loan Product Tables (`loan_products`): Rates, tenures, processing fees, criteria     │
│ • Enquiry Tables (`loan_leads`, `loan_follow_ups`, `disbursed_loans`): Lead lifecycle  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Client Application
- **Public Responsive Website:**
  - Modern dark-slate fintech interface built with React 18 and Tailwind CSS.
  - Multi-factor search and sortable loan product catalog (Personal, Business, Gold, Vehicle, Housing, Property).
  - 7-step mathematical reducing-balance EMI calculator with live principal/interest distribution.
  - 50% FOIR credit capacity and basic eligibility assessment engine.
  - Categorized documentation checklists for Salaried, Self-Employed, Gold, and Property borrowers.
- **Customer Loan Enquiry Interface:**
  - Streamlined enquiry form with real-time field validation.
  - Automatic unique Lead ID generation (`LD-YYYY-XXXXX`).
  - Self-service real-time milestone tracking for customers (`/api/leads/track/:id`).
  - Integrated 1-click WhatsApp advisory desk.
- **Executive Admin Dashboard:**
  - Secure credential-gated login desk (`admin` / `admin123`).
  - 5-stage pipeline management: `NEW_ENQUIRY` ➔ `CONTACTED` ➔ `FOLLOW_UP` ➔ `PROCESSING` ➔ `COMPLETED_CLOSED`.
  - Financial institution routing desk with sanction approvals, application IDs, and interest rates.
  - Customer directory with KYC verification statuses, CIBIL credit scores, and direct 1-click WhatsApp messaging.
  - Executive analytics: Lead volume, conversion rates, and loan demand breakdown.

---

### 2. Backend Services
- **REST APIs (`backend/server.js`):** Built with Express 4.x providing standardized JSON request/response formats.
- **Admin Authentication (`/api/auth/*`):** Secure login endpoint returning session tokens, user roles (`SUPER_ADMIN`), and validation mechanisms.
- **Loan Management APIs (`/api/categories`, `/api/products`):** Full CRUD control over loan products, dynamic interest rates, and loan limit configurations.
- **Customer Enquiry APIs (`/api/leads`):** Ingestion service that registers enquiries, creates/links customer profile records, and initializes interaction logs.
- **Lead Management APIs (`/api/leads`, `/api/leads/:id/status`):** Database-level search, stage transitions, and pipeline filtering.
- **Follow-up APIs (`/api/leads/:id/follow-up`):** Logging of customer interaction remarks, conversation notes, and scheduled next follow-up dates.
- **Notification APIs (`/api/notifications/*`):** Multi-channel alerts including WhatsApp (`wa.me`), Email notifications, and SMS triggers.
- **Reports APIs (`/api/reports/summary`):** Aggregation service computing real-time pipeline volume, product interest distributions, and closing ratios.

---

### 3. Database Layer & Relational Tables
- **ORM & Automatic Synchronization:** Powered by **Sequelize ORM** with `sequelize.sync({ alter: true })`, inspecting, creating, and updating all relational models and columns on startup with zero manual migrations.
- **Customer Tables (`customers`):** Stores borrower profile data, phone, email, employment type, monthly income, CIBIL credit score, KYC verification status, and cumulative enquiries.
- **Loan Category Tables (`loan_categories`):** Classifies products into Personal, Business, Gold, Vehicle, and Housing finance.
- **Loan Product Tables (`loan_products`):** Contains min/max amounts, interest rates, tenure windows, processing fees, and eligibility criteria.
- **Enquiry / Lead Tables (`loan_leads`):** Stores incoming borrower loan applications, requested amounts, underwriting stages (`NEW_ENQUIRY` ➔ `CONTACTED` ➔ `FOLLOW_UP` ➔ `PROCESSING` ➔ `COMPLETED_CLOSED`), assigned officers, and financial institution routing details.
- **Follow-up Tables (`loan_follow_ups`):** Maintains full interaction logs, conversation remarks, call timestamps, and scheduled next follow-up dates linked via `leadId`.
- **Admin Tables (`admin_users`):** Manages executive credentials, full name, contact, roles (`SUPER_ADMIN`, `LOAN_OFFICER`, `CREDIT_MANAGER`), permissions, active status, and last login timestamps.
- **Partner Tables (`lending_partners`):** Stores lending institutions (SBI, HDFC, ICICI, Bajaj Finserv, Tata Capital, Kotak Mahindra), max LTV, approval rates, and codes.
- **Testimonial Tables (`customer_testimonials`):** Displays verified borrower reviews, sanctioned loan amounts, locations, and ratings.
- **Website Content Tables (`website_content`):** Administrative control over corporate profile, contact desk numbers, working hours, compliance disclosures, and integration parameters.

#### 🐬 Switching to MySQL in Production:
The database connection (`backend/database/connection.js`) supports MySQL via `mysql2`. Set the environment variables in your `.env` or cloud container:
```env
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=vgsfinance_db
DB_USER=vgs_user
DB_PASSWORD=your_secure_password
```
When these variables are present, Sequelize automatically connects to MySQL and creates/syncs all tables automatically. Without them, it falls back to the embedded zero-config SQLite persistence (`backend/database/vgsfinance.sqlite`).

---

### 4. Cloud / External Services
- **VPS / Hosting Server:**
  - Production process management via **PM2** cluster engine ([`ecosystem.config.js`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/ecosystem.config.js)).
  - Containerized deployment ready via Docker & Docker Compose ([`deploy/docker-compose.yml`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/deploy/docker-compose.yml)).
  - Comprehensive Linux VPS deployment guide ([`deploy/vps-deployment-guide.md`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/deploy/vps-deployment-guide.md)).
- **Nginx Reverse Proxy:**
  - Production configuration file ([`deploy/nginx.conf`](file:///c:/Users/KameswariPachipulusu/Ascend media labs/vgsfinance/deploy/nginx.conf)) with Let's Encrypt automated SSL/TLS termination, HTTP/2, Gzip compression, and SPA HTML5 fallback routing.
  - Strict security headers (`HSTS`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`).
  - Rate limiting zones (`30 req/min` on `/api/`, `5 req/min` on `/api/leads` to prevent bot spam).
- **OTP / SMS Provider (`backend/services/smsOtpService.js`):**
  - Pluggable gateway adapter supporting Fast2SMS, MSG91, Twilio, and console simulator mode.
  - Endpoints: `POST /api/otp/send` and `POST /api/otp/verify` with 10-minute expiry and attempt throttling.
- **WhatsApp Business API (`backend/services/whatsappService.js`):**
  - Configured for Meta WhatsApp Cloud API (Graph v19.0) with official template dispatch for loan status updates.
  - 1-click customer advisor routing via direct WhatsApp chat links (`wa.me`).
- **SMTP / Business Email (`backend/services/emailService.js`):**
  - Multi-provider SMTP dispatch supporting Google Workspace, Amazon SES, and SendGrid.
  - Automated HTML email templates for Borrower Application Receipts, Bank Sanction Notices, and Internal Staff Alerts.
- **Third-Party Financial APIs (`backend/services/financialApisService.js`):**
  - **Credit Bureau Check:** Simulates and connects with CIBIL / Experian credit scoring engines returning 300–900 scores and risk tiers.
  - **PAN Verification:** Validates format, entity category (Individual/Company), and ITD/NSDL operative status.
  - **Bank Account Verification:** NPCI / IMPS Penny Drop verification validating IFSC code and beneficiary account validity.

---

## ⚖️ Statutory Financial & Regulatory Disclaimer
> **Important:** EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.

---

## 🏗️ DEVELOPMENT PROCESS FLOW (Software Development Lifecycle)

### Step 1 – Requirement Analysis
- **Business Requirement Discussion:** Centralized loan supermarket aggregator connecting retail/commercial borrowers to leading banks & NBFCs.
- **Website Requirement Analysis:** Modern dark-slate fintech portal with high-conversion discovery, EMI calculations, and transparent lead routing.
- **Loan Category Finalization:** Personal Loans, Business & MSME Loans, Gold Loans, Vehicle Loans, Home & Housing Loans, Loan Against Property (LAP).
- **Feature Finalization:** 7-step reducing-balance EMI engine, 50% FOIR eligibility assessment, categorized document checklist, 5-stage administrative pipeline, real-time Lead ID tracking, and Financial Institution routing.
- **Database Planning:** Relational Sequelize ORM architecture supporting `Category`, `Product`, `Partner`, `Lead`, `FollowUp`, `Loan`, and `Testimonial` models.
- **API Planning:** RESTful endpoints for landing data, CRUD product catalog, enquiry ingestion, status patching, follow-up scheduling, and live tracking.

### Step 2 – UI / UX Design
- **Premium Website UI Design:** Fintech dark-mode aesthetic with Emerald/Indigo/Sky accents, glassmorphic cards, and intuitive micro-interactions.
- **Responsive Layout Design:** High-performance mobile-first responsive grid across smartphones, tablets, and wide desktop displays.
- **Loan Listing Design:** Centralized supermarket comparison grid with category pills, live text search, and multi-factor sorting (interest rate, amount, tenure).
- **Loan Details Page Design:** Full modal view showcasing interest rates, processing fees, age/income criteria, and categorized document checklists.
- **Enquiry Form Design:** 13-step streamlined enquiry workflow with automatic Lead ID generation and direct WhatsApp support.
- **EMI Calculator Design:** 7-step mathematical reducing-balance EMI engine with dual inputs, real-time range sliders, and principal-vs-interest proportion bars.
- **Admin Dashboard Design:** Executive lead management desk with 5-stage pipeline stepper, interaction logs, and Financial Institution routing desk.

### Step 3 – Backend Development
- **Customer Enquiry APIs:** `POST /api/leads` (Lead registration, unique Lead ID generation, initial follow-up creation).
- **Loan Product APIs:** `GET /api/products`, `POST /api/products` (Catalog filtering, CRUD operations).
- **Loan Category APIs:** `GET /api/categories`, `POST /api/categories`.
- **Admin APIs:** `PATCH /api/leads/:id/status`, `PATCH /api/leads/:id/assign-bank`.
- **Lead Management APIs:** `GET /api/leads` (Multi-factor database filtering with `Op.like`, `Op.or`, and relational associations).
- **Follow-up APIs:** `POST /api/leads/:id/follow-up` (Interaction logs, call notes, and next callback dates).
- **Contact APIs:** Direct telephone (`tel:`), email (`mailto:`), and WhatsApp API integration (`wa.me`).
- **Content Management APIs:** Partner banks (`/api/partners`) and customer testimonials (`/api/testimonials`).
- **Reports APIs:** `GET /api/reports/summary` (Stage distribution, total volume, conversion rates, product demand).

### Step 4 – Frontend Development
- **Responsive Website Development:** Built with React 18, Vite 6, and Tailwind CSS.
- **Home Page:** [`HeroSection.jsx`](file:///frontend/src/components/HeroSection.jsx) with live metrics and trust badges.
- **Loan Category Pages & Supermarket:** [`LoanProducts.jsx`](file:///frontend/src/components/LoanProducts.jsx).
- **Loan Details Modal:** Integrated detail view with in-modal mini EMI simulator.
- **EMI Calculator:** [`EmiCalculator.jsx`](file:///frontend/src/components/EmiCalculator.jsx).
- **Customer Enquiry Forms:** [`ContactEnquiryForm.jsx`](file:///frontend/src/components/ContactEnquiryForm.jsx).
- **Contact & Workflow Tracker:** [`CustomerContactWorkflow.jsx`](file:///frontend/src/components/CustomerContactWorkflow.jsx).
- **About Us Page:** [`AboutCompany.jsx`](file:///frontend/src/components/AboutCompany.jsx) with corporate disclosures and pillars.
- **Admin Dashboard:** [`AdminDashboard.jsx`](file:///frontend/src/components/AdminDashboard.jsx).

### Step 5 – Integration
- **Database Integration:** SQLite zero-config persistence (`vgsfinance.sqlite`) with automatic schema synchronization (`alter: true`) and PostgreSQL production compatibility.
- **WhatsApp Integration:** 1-click WhatsApp advisory chat for customers and 1-click personalized notification dispatch for administrators (`wa.me`).
- **Email & Phone Integration:** Direct protocol links (`tel:`, `mailto:`) for immediate borrower outreach.
- **Third-Party Financial APIs Ready:** Modular model and API foundation prepared for CIBIL/Experian credit bureau score checks and digital KYC.

### Step 6 – Testing
- **Automated Verification Suite:** Built in [`tests/sdlc_verification.js`](file:///tests/sdlc_verification.js) covering 11 critical endpoints and workflows.
- **Functional & Form Testing:** Verified mandatory field validations, amount bounds, and automated Lead ID generation.
- **UI & Responsive Testing:** Verified across mobile, tablet, and desktop viewports.
- **API Testing:** 100% pass rate across public, administrative, calculator, and tracking endpoints.
- **Admin Pipeline Testing:** Verified stage transitions from `NEW_ENQUIRY` ➔ `CONTACTED` ➔ `FOLLOW_UP` ➔ `PROCESSING` ➔ `COMPLETED_CLOSED`.

### Step 7 – Deployment
- **Production Server Configuration:** Node.js Express server running with environment variable support (`PORT`, `DATABASE_URL`, `NODE_ENV`).
- **Production Database Setup:** Automatic schema migration via Sequelize ORM upon server startup.
- **Frontend Production Build:** Highly optimized static assets compiled via `npm --prefix frontend run build` (`dist/`).
- **SSL & Domain Configuration:** Ready for reverse proxy deployment behind Nginx, Caddy, Cloudflare, or cloud hosts (Render, AWS, Railway, DigitalOcean).

---

## 🏢 Platform Engineering & Technical Partnership

**Ascend Media Labs — Visakhapatnam**
- **Website:** [www.ascendmedialabs.com](https://www.ascendmedialabs.com)
- **Corporate Email:** reachus@ascendmedialabs.com
- **Direct Hotline:** +91 7675852618
- **Headquarters:** Visakhapatnam, Andhra Pradesh, India
- **Platform Scope:** Enterprise Full-Stack FinTech Engineering, Centralized Loan Supermarket Marketplace, Intelligent Discovery & Search Engine, Multi-Factor Category Filtering, and Multi-Dialect Database Persistence.
