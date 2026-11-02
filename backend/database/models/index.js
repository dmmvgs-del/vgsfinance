const sequelize = require('../connection');
const Category = require('./Category');
const Product = require('./Product');
const Partner = require('./Partner');
const Testimonial = require('./Testimonial');
const Customer = require('./Customer');
const Lead = require('./Lead');
const FollowUp = require('./FollowUp');
const Loan = require('./Loan');
const AdminUser = require('./AdminUser');
const WebsiteContent = require('./WebsiteContent');

// Setup Associations
Customer.hasMany(Lead, { foreignKey: 'customerId', as: 'enquiries', onDelete: 'SET NULL' });
Lead.belongsTo(Customer, { foreignKey: 'customerId', as: 'customerProfile' });

Lead.hasMany(FollowUp, { foreignKey: 'leadId', as: 'followUps', onDelete: 'CASCADE' });
FollowUp.belongsTo(Lead, { foreignKey: 'leadId' });

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Default Seed Data (All 16 Applicable Financial Products in Clean English)
const defaultCategories = [
  { id: 'cat-personal', name: 'Personal Loan', icon: '👤', description: 'Instant unsecured personal loans for weddings, travel, medical emergencies, or debt consolidation.' },
  { id: 'cat-business', name: 'Business Loan', icon: '🏢', description: 'Collateral-free working capital and term loans to fuel enterprise expansion, inventory, and trade.' },
  { id: 'cat-home', name: 'Home Loan', icon: '🏠', description: 'Lowest interest housing purchase, construction, and plot loan solutions with extended 30-year tenures.' },
  { id: 'cat-car', name: 'Car Loan', icon: '🚗', description: 'Affordable auto financing with up to 95% on-road funding for new and pre-owned personal cars.' },
  { id: 'cat-gold', name: 'Gold Loan', icon: '🪙', description: 'Quick collateral cash loans against 18k-24k gold jewelry with lowest interest rates and bank safety.' },
  { id: 'cat-education', name: 'Education Loan', icon: '🎓', description: 'Comprehensive funding for domestic and overseas university tuition, living expenses, and higher studies.' },
  { id: 'cat-mortgage', name: 'Mortgage Loan', icon: '🏛️', description: 'High-value mortgage financing against residential or commercial real estate collateral.' },
  { id: 'cat-lap', name: 'Loan Against Property', icon: '🏢', description: 'Unlock high equity value from owned residential, commercial, or industrial properties with low EMIs.' },
  { id: 'cat-professional', name: 'Professional Loan', icon: '💼', description: 'Tailored credit lines for Chartered Accountants, CS, Architects, and Certified Consultants.' },
  { id: 'cat-doctor', name: 'Doctor Loan', icon: '🩺', description: 'Exclusive high-ticket loans for Medical Doctors and Healthcare Practitioners for clinic expansion.' },
  { id: 'cat-equipment', name: 'Equipment Loan', icon: '⚙️', description: 'Machinery, diagnostic equipment, and manufacturing tooling loans with flexible repayment tenures.' },
  { id: 'cat-commercial-vehicle', name: 'Commercial Vehicle Loan', icon: '🚛', description: 'Affordable financing for heavy trucks, buses, tippers, light commercial vehicles (LCVs), and fleet.' },
  { id: 'cat-working-capital', name: 'Working Capital Loan', icon: '📈', description: 'Revolving Cash Credit (CC), Overdraft (OD), and trade invoice discounting to power daily operations.' },
  { id: 'cat-sep', name: 'Self-Employed Professional Loan', icon: '👔', description: 'Custom unsecured capital for freelance engineers, legal advisors, designers, and consultants.' },
  { id: 'cat-construction-equipment', name: 'Construction Equipment Loan', icon: '🏗️', description: 'Specialized loans for cranes, backhoe loaders, excavators, and heavy infrastructure machinery.' },
  { id: 'cat-other', name: 'Other Financial Products', icon: '💳', description: 'Debt consolidation, balance transfer with top-up, microfinance, and customized credit solutions.' }
];

const defaultProducts = [
  {
    id: 'prod-personal-express',
    categoryId: 'cat-personal',
    name: 'VGS Express Personal Loan',
    tagline: 'Quick approval within 2 hours with minimal documentation',
    interestRate: 10.5,
    minAmount: 50000,
    maxAmount: 1500000,
    minTenure: 12,
    maxTenure: 60,
    processingFee: '1.5% + GST',
    eligibility: { minAge: 21, maxAge: 58, minIncome: 25000, employmentType: 'Salaried / Self-Employed', minCibilScore: 680 },
    documentsRequired: ['Aadhaar Card & PAN Card', 'Last 3 months salary slips', 'Last 6 months bank statement', 'Current address proof'],
    features: ['No physical visit needed', 'Zero foreclosure charges after 12 months', 'Direct bank disbursement']
  },
  {
    id: 'prod-business-growth',
    categoryId: 'cat-business',
    name: 'VGS Business Growth Loan',
    tagline: 'Collateral-free working capital for trade, retail & manufacturing',
    interestRate: 11.5,
    minAmount: 200000,
    maxAmount: 5000000,
    minTenure: 12,
    maxTenure: 84,
    processingFee: '2.0% + GST',
    eligibility: { minAge: 23, maxAge: 65, minIncome: 50000, employmentType: 'Business Owner / Sole Proprietor / Pvt Ltd', minCibilScore: 700 },
    documentsRequired: ['GST Registration & returns', 'Bank statement (12 months)', 'ITR with computation (2 years)', 'Business address proof'],
    features: ['Collateral-free up to ₹50 Lakhs', 'Flexible overdraft / EMI facility', 'Fast track sanction']
  },
  {
    id: 'prod-home-prime',
    categoryId: 'cat-home',
    name: 'VGS Prime Housing Loan',
    tagline: 'Lowest EMI schemes for ready-to-move and under-construction homes',
    interestRate: 8.4,
    minAmount: 500000,
    maxAmount: 15000000,
    minTenure: 60,
    maxTenure: 360,
    processingFee: '0.5% (Max ₹10,000)',
    eligibility: { minAge: 21, maxAge: 65, minIncome: 30000, employmentType: 'Salaried or Professional', minCibilScore: 720 },
    documentsRequired: ['Property title deeds & link documents', 'Approved municipal plan', 'PAN, Aadhaar, 3 months pay slips', 'Form 16 / ITR'],
    features: ['Tax benefits under 80C & 24b', 'Tenure up to 30 years', 'Balance transfer with top-up']
  },
  {
    id: 'prod-car-express',
    categoryId: 'cat-car',
    name: 'VGS Prime Car Loan',
    tagline: 'Up to 95% on-road funding for all popular automobile brands',
    interestRate: 8.85,
    minAmount: 100000,
    maxAmount: 5000000,
    minTenure: 12,
    maxTenure: 84,
    processingFee: '1.0% + GST',
    eligibility: { minAge: 21, maxAge: 65, minIncome: 25000, employmentType: 'Salaried or Business', minCibilScore: 700 },
    documentsRequired: ['KYC (PAN & Aadhaar)', 'Income proof / 6 months bank statement', 'Car proforma invoice from dealer'],
    features: ['Up to 95% on-road price', 'Pre-approved dealer tie-ups', 'Zero foreclosure fee after 2 years']
  },
  {
    id: 'prod-gold-instant',
    categoryId: 'cat-gold',
    name: 'VGS Super Fast Gold Loan',
    tagline: 'Highest per gram gold value with doorstep or branch pledge',
    interestRate: 8.5,
    minAmount: 25000,
    maxAmount: 3000000,
    minTenure: 3,
    maxTenure: 36,
    processingFee: '₹ 250 Flat',
    eligibility: { minAge: 18, maxAge: 75, minIncome: 0, employmentType: 'Anyone with Gold Ornaments', minCibilScore: 0 },
    documentsRequired: ['Aadhaar Card', 'PAN Card / Form 60', 'Original gold jewelry (18k-24k)'],
    features: ['Instant 15-minute cash or NEFT', 'Bank locker grade security for gold', 'Zero CIBIL requirement']
  },
  {
    id: 'prod-education-global',
    categoryId: 'cat-education',
    name: 'VGS Global Scholar Education Loan',
    tagline: 'Funding premier university courses in India and across 30+ countries',
    interestRate: 9.25,
    minAmount: 200000,
    maxAmount: 10000000,
    minTenure: 24,
    maxTenure: 180,
    processingFee: '0.75% + GST',
    eligibility: { minAge: 18, maxAge: 35, minIncome: 0, employmentType: 'Student with Co-borrower', minCibilScore: 680 },
    documentsRequired: ['Admission offer letter from university', 'Fee structure schedule', 'Academic marksheets (10th, 12th, Degree)', 'Co-borrower income documents'],
    features: ['Moratorium period: Course duration + 1 year', '100% tuition, travel, and living expense coverage', 'Tax exemption under Sec 80E']
  },
  {
    id: 'prod-mortgage-prime',
    categoryId: 'cat-mortgage',
    name: 'VGS Premier Mortgage Loan',
    tagline: 'High-value structured mortgage facility against real estate',
    interestRate: 9.0,
    minAmount: 1000000,
    maxAmount: 50000000,
    minTenure: 24,
    maxTenure: 180,
    processingFee: '1.0% + GST',
    eligibility: { minAge: 25, maxAge: 65, minIncome: 60000, employmentType: 'Salaried / Business Owner', minCibilScore: 720 },
    documentsRequired: ['Clear marketable property title', 'Approved building plan', '3 years audited ITR & balance sheets', 'Bank statements (12 months)'],
    features: ['High loan quantum up to ₹5 Crores', 'Flexible balloon EMI structure', 'Overdraft facility available']
  },
  {
    id: 'prod-lap-prime',
    categoryId: 'cat-lap',
    name: 'VGS Loan Against Property (LAP)',
    tagline: 'Unlock locked equity from your residential or commercial property',
    interestRate: 9.15,
    minAmount: 500000,
    maxAmount: 30000000,
    minTenure: 36,
    maxTenure: 180,
    processingFee: '1.0% + GST',
    eligibility: { minAge: 23, maxAge: 65, minIncome: 40000, employmentType: 'Salaried / Self-Employed', minCibilScore: 700 },
    documentsRequired: ['Property registry deeds', 'Prior title chains (13 years)', 'Property tax receipts', 'Income proofs'],
    features: ['Low interest rates compared to personal loans', 'Long repayment tenures up to 15 years', 'Multi-purpose utilization']
  },
  {
    id: 'prod-prof-ca',
    categoryId: 'cat-professional',
    name: 'VGS Professional Loan (CA/CS/Architect)',
    tagline: 'Custom credit lines crafted for licensed professional practitioners',
    interestRate: 10.75,
    minAmount: 200000,
    maxAmount: 4000000,
    minTenure: 12,
    maxTenure: 60,
    processingFee: '1.25% + GST',
    eligibility: { minAge: 24, maxAge: 65, minIncome: 35000, employmentType: 'Practicing CA / CS / Architect / Lawyer', minCibilScore: 700 },
    documentsRequired: ['Professional Degree / ICAI / ICSI / CoA certificate', 'COP (Certificate of Practice) 2+ years', 'Bank statement (6 months)', 'KYC documents'],
    features: ['Zero collateral requirement', 'Special reduced interest rate for professionals', 'Disbursal within 24 hours']
  },
  {
    id: 'prod-doctor-med',
    categoryId: 'cat-doctor',
    name: 'VGS Medico Doctor Loan',
    tagline: 'High-ticket specialized funding for Doctors, Dentists & Surgeons',
    interestRate: 9.99,
    minAmount: 300000,
    maxAmount: 7500000,
    minTenure: 12,
    maxTenure: 84,
    processingFee: '1.0% + GST',
    eligibility: { minAge: 25, maxAge: 68, minIncome: 50000, employmentType: 'MBBS / MD / MS / BDS / MDS Doctor', minCibilScore: 720 },
    documentsRequired: ['Medical Registration Certificate (MCI/State Council)', 'Highest qualification degree', 'Clinic address proof / hospital empanelment', 'Last 6 months bank statement'],
    features: ['Pre-approved collateral-free limits up to ₹75 Lakhs', 'Funds for clinic setup, renovation, or equipment', 'Doorstep document pickup']
  },
  {
    id: 'prod-equip-mfg',
    categoryId: 'cat-equipment',
    name: 'VGS Industrial Equipment & Machinery Loan',
    tagline: 'Finance new and imported industrial machinery and diagnostic units',
    interestRate: 10.95,
    minAmount: 500000,
    maxAmount: 30000000,
    minTenure: 12,
    maxTenure: 84,
    processingFee: '1.5% + GST',
    eligibility: { minAge: 25, maxAge: 65, minIncome: 75000, employmentType: 'Manufacturing / MSME Enterprise', minCibilScore: 690 },
    documentsRequired: ['Proforma invoice / Machinery quote', 'Factory electricity bills & lease agreement', '2 years audited balance sheets', 'Business vintage proof (3+ years)'],
    features: ['Up to 85% of machinery invoice value', 'Letters of Credit (LC) for imported equipment', 'Moratorium during machine installation']
  },
  {
    id: 'prod-cv-fleet',
    categoryId: 'cat-commercial-vehicle',
    name: 'VGS Commercial Vehicle & Fleet Loan',
    tagline: 'Financing for trucks, buses, tippers, tankers, and LCVs',
    interestRate: 10.5,
    minAmount: 300000,
    maxAmount: 15000000,
    minTenure: 12,
    maxTenure: 60,
    processingFee: '1.5% + GST',
    eligibility: { minAge: 21, maxAge: 60, minIncome: 30000, employmentType: 'Fleet Operator / Transport Contractor / Captive User', minCibilScore: 680 },
    documentsRequired: ['Vehicle proforma invoice', 'Fleet list with existing RC copies', 'Route permits / contract agreements', 'Bank statement (6 months)'],
    features: ['Funding for new chassis + body fabrication', 'Special schemes for First-Time Buyers (FTB)', 'Fast track sanction']
  },
  {
    id: 'prod-wc-revolving',
    categoryId: 'cat-working-capital',
    name: 'VGS Working Capital & CC/OD Facility',
    tagline: 'Revolving Cash Credit and Overdraft limits to maintain liquidity',
    interestRate: 11.25,
    minAmount: 500000,
    maxAmount: 50000000,
    minTenure: 12,
    maxTenure: 36,
    processingFee: '1.5% + GST',
    eligibility: { minAge: 25, maxAge: 65, minIncome: 100000, employmentType: 'Trading / Manufacturing / Service Firms', minCibilScore: 700 },
    documentsRequired: ['GST returns (last 12 months)', 'Debtors / Creditors stock audit statement', 'Audited financial statements (3 years)', 'Current account statements (1 year)'],
    features: ['Pay interest only on utilized capital', 'Instant limit renewal each year', 'Sub-limits for Letter of Credit & Bank Guarantee']
  },
  {
    id: 'prod-sep-prime',
    categoryId: 'cat-sep',
    name: 'VGS Self-Employed Professional Loan',
    tagline: 'Unsecured business funding for independent consultants & freelancers',
    interestRate: 11.75,
    minAmount: 100000,
    maxAmount: 3000000,
    minTenure: 12,
    maxTenure: 60,
    processingFee: '1.75% + GST',
    eligibility: { minAge: 23, maxAge: 62, minIncome: 30000, employmentType: 'Self-Employed Consultant / Designer / Tech Specialist', minCibilScore: 680 },
    documentsRequired: ['Client retainer contracts / Invoices', '12 months bank statements', 'PAN, Aadhaar & ITRs (2 years)', 'Office / Home address proof'],
    features: ['Quick 48-hour disbursal', 'No physical collateral needed', 'Flexible drop-line overdraft option']
  },
  {
    id: 'prod-ce-heavy',
    categoryId: 'cat-construction-equipment',
    name: 'VGS Heavy Construction Equipment Loan',
    tagline: 'Specialized asset funding for excavators, road rollers, and cranes',
    interestRate: 10.75,
    minAmount: 1000000,
    maxAmount: 50000000,
    minTenure: 12,
    maxTenure: 60,
    processingFee: '1.5% + GST',
    eligibility: { minAge: 25, maxAge: 65, minIncome: 150000, employmentType: 'Civil Contractors / Mining / Infrastructure Developers', minCibilScore: 700 },
    documentsRequired: ['Equipment proforma invoice from authorized OEM dealer', 'Work orders / PWD / NHAI contract copies', 'Audited financials (3 years)', 'Bank statement (12 months)'],
    features: ['Co-branding tie-ups with JCB, CAT, Tata Hitachi, Komatsu', 'Up to 90% funding on asset invoice', 'Custom structured seasonal repayment EMIs']
  },
  {
    id: 'prod-other-bt',
    categoryId: 'cat-other',
    name: 'VGS Smart Balance Transfer & Debt Consolidation',
    tagline: 'Consolidate multiple high-interest loans into one affordable EMI',
    interestRate: 9.75,
    minAmount: 100000,
    maxAmount: 10000000,
    minTenure: 12,
    maxTenure: 84,
    processingFee: '0.75% + GST',
    eligibility: { minAge: 21, maxAge: 60, minIncome: 30000, employmentType: 'Salaried or Self-Employed', minCibilScore: 700 },
    documentsRequired: ['Existing loan foreclosure / outstanding letters', 'Last 12 months EMI repayment track record', 'Current salary slips / ITR', 'KYC documents'],
    features: ['Lower monthly EMI by up to 35%', 'Additional Top-Up loan available simultaneously', 'Zero prepayment fees with partner banks']
  }
];

const defaultPartners = [
  { id: 'partner-sbi', name: 'State Bank of India', code: 'SBI', type: 'Public Sector Bank', logoText: 'SBI', maxLtv: '90%', approvalRate: '95%' },
  { id: 'partner-hdfc', name: 'HDFC Bank', code: 'HDFC', type: 'Private Bank', logoText: 'HDFC', maxLtv: '85%', approvalRate: '96%' },
  { id: 'partner-icici', name: 'ICICI Bank', code: 'ICICI', type: 'Private Bank', logoText: 'ICICI', maxLtv: '85%', approvalRate: '94%' },
  { id: 'partner-bajaj', name: 'Bajaj Finserv', code: 'BAJAJ', type: 'NBFC', logoText: 'BAJAJ', maxLtv: '95%', approvalRate: '98%' },
  { id: 'partner-tata', name: 'Tata Capital', code: 'TATA', type: 'NBFC', logoText: 'TATA', maxLtv: '90%', approvalRate: '97%' },
  { id: 'partner-kotak', name: 'Kotak Mahindra Bank', code: 'KOTAK', type: 'Private Bank', logoText: 'KOTAK', maxLtv: '85%', approvalRate: '93%' }
];

const defaultTestimonials = [
  {
    id: 't-1',
    name: 'Ramesh Reddy',
    location: 'Hyderabad, Telangana',
    loanType: 'Business Growth Loan',
    amount: '₹ 15,00,000',
    rating: 5,
    comment: 'Got my business expansion loan sanctioned in just 3 days without any collateral hassles. The process was completely transparent and smooth!',
    date: '2026-10-14'
  },
  {
    id: 't-2',
    name: 'Lakshmi Narayana',
    location: 'Vijayawada, Andhra Pradesh',
    loanType: 'Gold Loan',
    amount: '₹ 4,50,000',
    rating: 5,
    comment: 'Offered the highest per-gram gold valuation and lowest interest rate. The gold appraisal and cash transfer were completed in under 20 minutes.',
    date: '2026-10-20'
  },
  {
    id: 't-3',
    name: 'Kavitha Devi',
    location: 'Visakhapatnam, Andhra Pradesh',
    loanType: 'Home Loan',
    amount: '₹ 32,00,000',
    rating: 5,
    comment: 'VGS Prime Housing Loan made our dream home a reality. The 8.5% interest rate and flexible 20-year repayment schedule fit our monthly budget perfectly.',
    date: '2026-10-25'
  }
];

// Phase 6 Customer Contact Workflow Seed Leads:
// Customer → Loan Product → Enquiry → Admin → Follow-up → Financial Institution / Applicable Loan Process
const defaultLeads = [
  {
    id: 'LD-2026-101',
    customerName: 'Suresh Kumar',
    phone: '+91 98480 12345',
    email: 'suresh.kumar@example.com',
    city: 'Hyderabad',
    employmentType: 'Salaried',
    monthlyIncome: 45000,
    productName: 'VGS Express Personal Loan',
    requestedAmount: 300000,
    tenureMonths: 36,
    status: 'FOLLOW_UP', // Stage 5: Follow-up
    priority: 'HIGH',
    leadSource: 'Customer Website Portal',
    assignedTo: 'Rajesh (Senior Loan Officer)',
    assignedBank: 'HDFC Bank',
    partnerBankId: 'partner-hdfc',
    bankApplicationNo: 'HDFC-PL-2026-1049',
    bankProcessStage: 'DOC_VERIFICATION',
    sanctionedAmount: 300000,
    sanctionedRate: 11.25,
    bankRemarks: 'Salary slips and KYC lodged with HDFC Bank underwriting desk.'
  },
  {
    id: 'LD-2026-102',
    customerName: 'Venkat Rao',
    phone: '+91 99890 54321',
    email: 'venkat.mills@example.com',
    city: 'Guntur',
    employmentType: 'Business Owner',
    monthlyIncome: 120000,
    productName: 'VGS Business Growth Loan',
    requestedAmount: 2500000,
    tenureMonths: 60,
    status: 'PROCESSING', // Stage 6: In Bank Processing
    priority: 'URGENT',
    leadSource: 'Direct Enquiry Form',
    assignedTo: 'Ananya (Commercial Lending)',
    assignedBank: 'State Bank of India',
    partnerBankId: 'partner-sbi',
    bankApplicationNo: 'SBI-SME-2026-8812',
    bankProcessStage: 'SANCTION_APPROVED',
    sanctionedAmount: 2500000,
    sanctionedRate: 13.0,
    bankRemarks: 'Sanction letter issued by SBI SME Hub. Awaiting final mortgage sign-off.'
  },
  {
    id: 'LD-2026-103',
    customerName: 'Anil Varman',
    phone: '+91 98765 99887',
    email: 'anil.v@example.com',
    city: 'Tirupati',
    employmentType: 'Self-Employed',
    monthlyIncome: 35000,
    productName: 'VGS Super Fast Gold Loan',
    requestedAmount: 500000,
    tenureMonths: 12,
    status: 'COMPLETED_CLOSED', // Stage 6 Completed: Disbursed
    priority: 'MEDIUM',
    leadSource: 'Branch Walk-in',
    assignedTo: 'Praveen (Gold Desk)',
    assignedBank: 'Bajaj Finserv',
    partnerBankId: 'partner-bajaj',
    bankApplicationNo: 'BJ-GL-2026-4401',
    bankProcessStage: 'DISBURSED',
    sanctionedAmount: 500000,
    sanctionedRate: 8.9,
    bankRemarks: 'Loan successfully disbursed via NEFT into customer bank account.',
    disbursedDate: '2026-10-31'
  },
  {
    id: 'LD-2026-104',
    customerName: 'Deepika Sharma',
    phone: '+91 97000 55443',
    email: 'deepika.s@example.com',
    city: 'Bangalore',
    employmentType: 'Salaried',
    monthlyIncome: 75000,
    productName: 'VGS Auto & Two-Wheeler Loan',
    requestedAmount: 800000,
    tenureMonths: 48,
    status: 'CONTACTED', // Stage 4: Admin Contacted
    priority: 'HIGH',
    leadSource: 'Online EMI Calculator',
    assignedTo: 'Rajesh (Senior Loan Officer)',
    assignedBank: 'ICICI Bank',
    partnerBankId: 'partner-icici',
    bankApplicationNo: 'ICICI-AL-2026-3390',
    bankProcessStage: 'SUBMITTED_TO_BANK',
    sanctionedAmount: 0,
    sanctionedRate: 10.25,
    bankRemarks: 'Pre-qualified with ICICI Bank. Dealer invoice being gathered.'
  },
  {
    id: 'LD-2026-105',
    customerName: 'Mohan Krishna',
    phone: '+91 91234 44556',
    email: 'mohan.k@example.com',
    city: 'Vijayawada',
    employmentType: 'Business Owner',
    monthlyIncome: 90000,
    productName: 'VGS Prime Housing Loan',
    requestedAmount: 4500000,
    tenureMonths: 180,
    status: 'NEW_ENQUIRY', // Stage 3: Enquiry Received
    priority: 'URGENT',
    leadSource: 'Website Portal Enquiry',
    assignedTo: 'Unassigned',
    assignedBank: 'Not Assigned Yet',
    partnerBankId: null,
    bankApplicationNo: null,
    bankProcessStage: 'NOT_ROUTED',
    sanctionedAmount: 0,
    sanctionedRate: 0,
    bankRemarks: 'Fresh customer enquiry awaiting Admin review and partner institution selection.'
  }
];

// Initialize Database Function
async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    if (sequelize.getDialect() === 'sqlite') {
      await sequelize.query('PRAGMA foreign_keys = OFF;');
      await sequelize.query('DROP TABLE IF EXISTS loan_leads_backup;');
      await sequelize.query('DROP TABLE IF EXISTS loan_follow_ups_backup;');
      await sequelize.query('DROP TABLE IF EXISTS loan_categories_backup;');
      await sequelize.query('DROP TABLE IF EXISTS loan_products_backup;');
      await sequelize.query('DROP TABLE IF EXISTS partner_institutions_backup;');
      await sequelize.query('DROP TABLE IF EXISTS customer_testimonials_backup;');
    }
    await sequelize.sync({ alter: true });
    if (sequelize.getDialect() === 'sqlite') {
      await sequelize.query('PRAGMA foreign_keys = ON;');
    }
    console.log('✅ All database tables and columns synchronized automatically.');

    // Synchronize all 16 Loan Categories
    console.log('🌱 Synchronizing all 16 loan categories...');
    for (const cat of defaultCategories) {
      const existing = await Category.findByPk(cat.id);
      if (!existing) {
        await Category.create(cat);
      } else {
        await existing.update(cat);
      }
    }

    // Synchronize Loan Products across all categories
    console.log('🌱 Synchronizing loan products across categories...');
    for (const prod of defaultProducts) {
      const existing = await Product.findByPk(prod.id);
      if (!existing) {
        await Product.create(prod);
      } else {
        await existing.update(prod);
      }
    }

    const partnerCount = await Partner.count();
    if (partnerCount === 0) {
      console.log('🌱 Seeding partner institutions...');
      await Partner.bulkCreate(defaultPartners);
    }

    const testimonialCount = await Testimonial.count();
    if (testimonialCount === 0) {
      console.log('🌱 Seeding testimonials...');
      await Testimonial.bulkCreate(defaultTestimonials);
    }

    const customerCount = await Customer.count();
    if (customerCount === 0) {
      console.log('🌱 Seeding customer profiles table...');
      const defaultCustomers = [
        { id: 'CUST-101', fullName: 'Suresh Kumar', phone: '+91 98480 12345', email: 'suresh.kumar@example.com', city: 'Hyderabad', employmentType: 'Salaried', monthlyIncome: 45000, cibilScore: 745, kycStatus: 'VERIFIED', totalLoansEnquired: 1, totalAmountEnquired: 300000 },
        { id: 'CUST-102', fullName: 'Venkat Rao', phone: '+91 99890 54321', email: 'venkat.mills@example.com', city: 'Guntur', employmentType: 'Business Owner', monthlyIncome: 120000, cibilScore: 760, kycStatus: 'VERIFIED', totalLoansEnquired: 1, totalAmountEnquired: 2500000 },
        { id: 'CUST-103', fullName: 'Anil Varman', phone: '+91 98765 99887', email: 'anil.v@example.com', city: 'Tirupati', employmentType: 'Self-Employed', monthlyIncome: 35000, cibilScore: 710, kycStatus: 'VERIFIED', totalLoansEnquired: 1, totalAmountEnquired: 500000 },
        { id: 'CUST-104', fullName: 'Deepika Sharma', phone: '+91 97000 55443', email: 'deepika.s@example.com', city: 'Bangalore', employmentType: 'Salaried', monthlyIncome: 75000, cibilScore: 780, kycStatus: 'VERIFIED', totalLoansEnquired: 1, totalAmountEnquired: 800000 },
        { id: 'CUST-105', fullName: 'Mohan Krishna', phone: '+91 91234 44556', email: 'mohan.k@example.com', city: 'Vijayawada', employmentType: 'Business Owner', monthlyIncome: 90000, cibilScore: 735, kycStatus: 'PENDING', totalLoansEnquired: 1, totalAmountEnquired: 4500000 }
      ];
      await Customer.bulkCreate(defaultCustomers);
    }

    const adminCount = await AdminUser.count();
    if (adminCount === 0) {
      console.log('🌱 Seeding admin users table...');
      const defaultAdminUsers = [
        {
          id: 'ADM-001',
          username: 'admin',
          passwordHash: 'admin123',
          fullName: 'System Super Administrator',
          email: 'admin@vgsfinance.com',
          phone: '+91 98480 12345',
          role: 'SUPER_ADMIN',
          permissions: ['ALL', 'LEAD_MANAGEMENT', 'LOAN_ROUTING', 'CATALOG_MANAGEMENT', 'REPORTS_ACCESS', 'USER_MANAGEMENT', 'SETTINGS_CONFIG'],
          isActive: true,
          lastLoginAt: new Date()
        },
        {
          id: 'ADM-002',
          username: 'officer1',
          passwordHash: 'officer123',
          fullName: 'Rajesh Sharma (Senior Credit Officer)',
          email: 'rajesh.sharma@vgsfinance.com',
          phone: '+91 98480 23456',
          role: 'LOAN_OFFICER',
          permissions: ['LEAD_MANAGEMENT', 'LOAN_ROUTING', 'FOLLOW_UP_MANAGE'],
          isActive: true,
          lastLoginAt: null
        },
        {
          id: 'ADM-003',
          username: 'manager1',
          passwordHash: 'manager123',
          fullName: 'Kavitha Reddy (Credit Approval Manager)',
          email: 'kavitha.reddy@vgsfinance.com',
          phone: '+91 98480 34567',
          role: 'CREDIT_MANAGER',
          permissions: ['LEAD_MANAGEMENT', 'LOAN_ROUTING', 'BANK_ASSIGN', 'REPORTS_ACCESS'],
          isActive: true,
          lastLoginAt: null
        }
      ];
      await AdminUser.bulkCreate(defaultAdminUsers);
    }

    const webContentCount = await WebsiteContent.count();
    if (webContentCount === 0) {
      console.log('🌱 Seeding website content table...');
      const defaultWebContent = [
        {
          key: 'company_profile',
          section: 'company',
          title: 'Company Overview & Corporate Presentation',
          content: {
            companyName: 'VGS Finance & Loans Management Services Pvt Ltd',
            tagline: 'Your Trusted Multi-Bank Financial Supermarket',
            establishedYear: 2018,
            cin: 'U65999TG2018PTC123456',
            gstNumber: '36AAACV1234F1Z8',
            headquarters: 'Plot 42, Financial District, Gachibowli, Hyderabad, Telangana 500032',
            authorizedCapital: '₹ 10,00,00,000',
            dsaPartnerships: 'Direct Sales Associate with 15+ Scheduled Commercial Banks & Top NBFCs',
            missionStatement: 'Democratizing transparent credit access across retail, agriculture, MSME, and commercial sectors with zero upfront charges.'
          },
          lastUpdatedBy: 'Admin'
        },
        {
          key: 'contact_desk',
          section: 'contact',
          title: 'Customer Contact & Advisory Desk',
          content: {
            tollFree: '1800-425-9988',
            hotline: '+91 98480 12345',
            whatsappDesk: '+91 98480 12345',
            supportEmail: 'contact@vgsfinance.com',
            grievanceEmail: 'nodal.officer@vgsfinance.com',
            workingHours: 'Monday to Saturday: 9:30 AM – 6:30 PM (IST)',
            branchOffices: ['Hyderabad (HQ)', 'Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati', 'Bangalore']
          },
          lastUpdatedBy: 'Admin'
        },
        {
          key: 'regulatory_disclaimer',
          section: 'compliance',
          title: 'Statutory Regulatory & Indicative Calculations Disclaimer',
          content: {
            disclaimerText: 'EMI calculations, interest rates, and loan tenures displayed on this platform are indicative in nature and subject to underwriting guidelines of lending institutions. Final sanction, terms, and processing charges remain at the sole discretion of partner banks/NBFCs.',
            rbiComplianceNote: 'VGS Finance operates as an authorized lending facilitator and financial technology marketplace. We do not charge borrowers any advance fees for loan sanctioning.',
            dataPrivacyStatement: 'All customer data and KYC documents submitted are protected by 256-bit AES encryption in accordance with Digital Personal Data Protection (DPDP) Act.'
          },
          lastUpdatedBy: 'Admin'
        },
        {
          key: 'cloud_services_config',
          section: 'integrations',
          title: 'Cloud Infrastructure & External Services Registry',
          content: {
            vpsProvider: 'Hostinger Cloud / AWS EC2 Ubuntu 24.04 LTS',
            nginxVersion: 'Nginx 1.24+ Reverse Proxy with HTTP/2 & Let\'s Encrypt SSL',
            otpSmsProvider: 'Fast2SMS / MSG91 Enterprise DLT Gateway',
            whatsappBusinessApi: 'Meta WhatsApp Cloud API v19.0',
            smtpEmailServer: 'Google Workspace SMTP / Amazon SES (contact@vgsfinance.com)',
            financialApis: 'Experian & CIBIL Bureau Connect, NSDL PAN Verification, NPCI Penny Drop'
          },
          lastUpdatedBy: 'Admin'
        }
      ];
      await WebsiteContent.bulkCreate(defaultWebContent);
    }

    const leadCount = await Lead.count();
    if (leadCount === 0) {
      console.log('🌱 Seeding initial Phase 6 workflow leads...');
      await Lead.bulkCreate(defaultLeads);

      await FollowUp.create({
        id: 'f-101',
        leadId: 'LD-2026-101',
        date: '2026-10-29',
        notes: 'Initial call made. Customer requested callback for evening to discuss pay slip uploads.',
        nextDate: '2026-11-01'
      });

      await FollowUp.create({
        id: 'f-102',
        leadId: 'LD-2026-102',
        date: '2026-10-30',
        notes: 'Underwriting verification in progress. CIBIL verified at 752. Moving to bank sanction note.',
        nextDate: '2026-11-02'
      });

      console.log('✅ Initial database seed completed successfully.');
    } else {
      // Ensure all seed leads exist and Phase 6 columns are populated
      for (const defLead of defaultLeads) {
        const existing = await Lead.findByPk(defLead.id);
        if (!existing) {
          await Lead.create(defLead);
        } else if (!existing.assignedBank || existing.assignedBank === 'Not Assigned Yet') {
          await existing.update({
            assignedBank: defLead.assignedBank,
            partnerBankId: defLead.partnerBankId,
            bankApplicationNo: defLead.bankApplicationNo,
            bankProcessStage: defLead.bankProcessStage,
            sanctionedAmount: defLead.sanctionedAmount,
            sanctionedRate: defLead.sanctionedRate,
            bankRemarks: defLead.bankRemarks,
            disbursedDate: defLead.disbursedDate || null
          });
        }
      }
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

module.exports = {
  sequelize,
  Category,
  Product,
  Partner,
  Testimonial,
  Customer,
  Lead,
  FollowUp,
  Loan,
  AdminUser,
  WebsiteContent,
  initDB
};
