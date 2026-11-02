# VGS Finance & Loans Management System - Agent Guidelines

## 📌 Project Overview & Business Objectives
This repository is exclusively dedicated to **VGS Finance & Loans**, a full-stack, enterprise-grade **Loan Super Market & Financial Services Platform**.

### 🎯 Core Business Objectives (BRD)
The objective of this project is to develop a professional, responsive, and user-friendly Loan Super Market / Financial Services Platform where customers can explore available loan products, submit enquiries, and connect with the financial services team.

1. **Premium Responsive Website:** Built for the financial services business with modern aesthetics.
2. **Centralized Display of Loan Products:** Unified portfolio across personal, commercial, vehicle, gold, and housing finance.
3. **Customer-Friendly Loan Discovery Experience:** Searchable, sortable, and categorized product comparison marketplace.
4. **Loan Category & Product Management:** Dynamic administrative control over products, interest rates, tenures, and eligibility.
5. **Customer Loan Enquiry Generation:** Streamlined online application with automated Lead ID generation.
6. **Lead Management through Admin Dashboard:** Full lifecycle status management (`NEW`, `FOLLOW_UP`, `DOCUMENT_COLLECTION`, `CONVERTED_DISBURSED`, `REJECTED`).
7. **EMI Calculation Facility:** Live mathematical reducing-balance EMI engine with amortization summaries.
8. **Basic Loan Eligibility Information:** Standard FOIR (Fixed Obligation to Income Ratio 50%) credit capacity assessment.
9. **Required Document Information:** Comprehensive categorized checklists for Salaried, Business, Gold, and Property loans.
10. **Customer Follow-up Management:** Interaction logs, call notes, and next follow-up date scheduling.
11. **Partner / Bank / NBFC Information Management:** Showcase and administrative management of partner lending institutions.
12. **Professional Company & Service Presentation:** Corporate profile, compliance disclosures, and customer trust pillars.
13. **Mobile-Friendly Customer Experience:** High-performance responsive UI across smartphones, tablets, and desktops.
14. **Future-Ready Foundation:** Clean modular codebase ready for credit bureau APIs, payment gateway integrations, and digital KYC.

---

## 🗄️ Database Architecture & Auto-Sync Engine
The platform uses **Sequelize ORM** with **Automated Schema Synchronization (`sequelize.sync({ alter: true })`)**:
- All tables and columns are automatically created and updated on every deployment/restart.
- Real CRUD persistence in SQLite (`backend/database/vgsfinance.sqlite`) and PostgreSQL compatibility via `DATABASE_URL`.
- Filtering, sorting, and search execute directly at the database query level.
