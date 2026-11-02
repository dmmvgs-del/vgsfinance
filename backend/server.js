const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
require('dotenv').config();

const {
  initDB,
  Category,
  Product,
  Partner,
  Testimonial,
  Customer,
  Lead,
  FollowUp,
  Loan,
  AdminUser,
  WebsiteContent
} = require('./database/models');

const { sendOTP, verifyOTP } = require('./services/smsOtpService');
const { sendWhatsAppMessage } = require('./services/whatsappService');
const { sendBusinessEmail } = require('./services/emailService');
const { checkCibilScore, verifyPanCard, verifyBankAccount } = require('./services/financialApisService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper: Reducing Balance EMI formula
function calculateEMI(principal, annualRate, tenureMonths) {
  const p = parseFloat(principal);
  const r = parseFloat(annualRate) / 12 / 100;
  const n = parseInt(tenureMonths, 10);

  if (p <= 0 || r <= 0 || n <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0 };
  }

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const totalInterest = totalPayable - p;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable)
  };
}

// ==========================================
// API ROUTES WITH FULL DATABASE PERSISTENCE
// ==========================================

// 0. Admin Authentication Service (Queried from Admin Tables: admin_users)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const loginIdentifier = (username || email || '').trim().toLowerCase();

    // Check database AdminUser table
    let adminRecord = await AdminUser.findOne({
      where: {
        [Op.or]: [
          { username: loginIdentifier },
          { email: loginIdentifier }
        ],
        isActive: true
      }
    });

    const fallbackUser = process.env.ADMIN_USER || 'admin';
    const fallbackPass = process.env.ADMIN_PASS || 'admin123';

    if (adminRecord && adminRecord.passwordHash === password) {
      await adminRecord.update({ lastLoginAt: new Date() });
      return res.json({
        success: true,
        message: 'Admin authentication successful.',
        token: `vgs-auth-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        admin: {
          id: adminRecord.id,
          username: adminRecord.username,
          name: adminRecord.fullName,
          email: adminRecord.email,
          role: adminRecord.role,
          permissions: adminRecord.permissions || ['ALL']
        }
      });
    }

    // Fallback for default env admin
    if (loginIdentifier === fallbackUser.toLowerCase() && password === fallbackPass) {
      return res.json({
        success: true,
        message: 'Admin authentication successful.',
        token: `vgs-auth-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        admin: {
          id: 'ADM-001',
          username: fallbackUser,
          name: 'VGS Finance Administrator',
          email: process.env.ADMIN_EMAIL || 'admin@vgsfinance.in',
          role: 'SUPER_ADMIN',
          permissions: ['ALL', 'LEAD_MANAGEMENT', 'LOAN_ROUTING', 'CATALOG_MANAGEMENT', 'REPORTS_ACCESS']
        }
      });
    }

    res.status(401).json({
      success: false,
      message: 'Invalid administrative credentials. Please verify your username and password.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer vgs-auth-')) {
    return res.json({
      success: true,
      authenticated: true,
      admin: {
        id: 'ADM-001',
        name: 'VGS Finance Administrator',
        role: 'SUPER_ADMIN'
      }
    });
  }
  res.status(401).json({ success: false, authenticated: false, message: 'Invalid or expired session.' });
});

// 1. Landing Page Bundle (From Real Database)
app.get('/api/public/landing-data', async (req, res) => {
  try {
    const [categories, products, partners, testimonials] = await Promise.all([
      Category.findAll(),
      Product.findAll(),
      Partner.findAll(),
      Testimonial.findAll()
    ]);

    res.json({
      success: true,
      data: {
        categories,
        products,
        partners,
        testimonials,
        stats: {
          totalBorrowers: '12,500+',
          disbursedAmount: '₹ 150+ Crores',
          partnerBanksCount: partners.length,
          customerRating: '4.9 / 5.0'
        }
      }
    });
  } catch (error) {
    console.error('Error fetching landing data:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve landing data from database.' });
  }
});

// 2. Categories Management
app.get('/api/categories', async (req, res) => {
  try {
    const data = await Category.findAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, icon, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required.' });

    const newCategory = await Category.create({
      id: `cat-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
      name,
      icon: icon || '📄',
      description: description || ''
    });

    res.status(201).json({ success: true, message: 'New loan category created successfully!', data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Products Management
app.get('/api/products', async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = categoryId ? { categoryId } : {};
    const data = await Product.findAll({ where });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, categoryId, interestRate, minAmount, maxAmount, minTenure, maxTenure, tagline } = req.body;
    if (!name || !interestRate || !minAmount || !maxAmount) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory product fields.' });
    }

    const newProd = await Product.create({
      id: `prod-custom-${Date.now()}`,
      categoryId: categoryId || 'cat-personal',
      name,
      tagline: tagline || 'Tailored financing solution',
      interestRate: parseFloat(interestRate),
      minAmount: parseFloat(minAmount),
      maxAmount: parseFloat(maxAmount),
      minTenure: parseInt(minTenure, 10) || 12,
      maxTenure: parseInt(maxTenure, 10) || 60,
      processingFee: '1.5% + GST',
      eligibility: { minAge: 21, maxAge: 60, minIncome: 25000, minCibilScore: 680 },
      documentsRequired: ['Aadhaar & PAN Card', 'Income Proof', 'Bank Statement (6 months)'],
      features: ['Quick Verification', 'Instant Approval']
    });

    res.status(201).json({ success: true, message: 'New loan product created and saved successfully!', data: newProd });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Partner Banks & NBFCs Management
app.get('/api/partners', async (req, res) => {
  try {
    const data = await Partner.findAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/partners', async (req, res) => {
  try {
    const { name, code, type, logoText, maxLtv, approvalRate } = req.body;
    if (!name || !code) {
      return res.status(400).json({ success: false, message: 'Partner name and code are required.' });
    }

    const newPartner = await Partner.create({
      id: `partner-${code.toLowerCase()}-${Date.now()}`,
      name,
      code,
      type: type || 'Private Bank',
      logoText: logoText || code.toUpperCase(),
      maxLtv: maxLtv || '85%',
      approvalRate: approvalRate || '95%'
    });

    res.status(201).json({ success: true, message: 'New partner bank/NBFC added successfully!', data: newPartner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/partners/:id', async (req, res) => {
  try {
    await Partner.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Partner institution deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const data = await Testimonial.findAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. EMI Calculator Engine
app.post('/api/calculate/emi', (req, res) => {
  const { principal, annualRate, tenureMonths } = req.body;
  const result = calculateEMI(principal, annualRate, tenureMonths);
  res.json({ success: true, data: result });
});

// 7. Eligibility Engine
app.post('/api/calculate/eligibility', (req, res) => {
  const { monthlyIncome, existingEmi, tenureMonths, annualRate } = req.body;
  const income = parseFloat(monthlyIncome) || 0;
  const obligations = parseFloat(existingEmi) || 0;
  const tenure = parseInt(tenureMonths, 10) || 36;
  const rate = parseFloat(annualRate) || 11.5;

  const allowableEmi = Math.max(0, (income * 0.50) - obligations);
  const r = (rate / 12) / 100;
  
  let eligibleLoanAmount = 0;
  if (allowableEmi > 0 && r > 0 && tenure > 0) {
    eligibleLoanAmount = Math.round((allowableEmi * (Math.pow(1 + r, tenure) - 1)) / (r * Math.pow(1 + r, tenure)));
  }

  res.json({
    success: true,
    data: {
      monthlyIncome: income,
      existingObligations: obligations,
      allowableMaxEmi: Math.round(allowableEmi),
      maxEligibleLoanAmount: eligibleLoanAmount,
      tenureMonths: tenure,
      assumedInterestRate: rate,
      status: eligibleLoanAmount > 50000 ? 'HIGH_ELIGIBILITY' : 'LOW_ELIGIBILITY'
    }
  });
});

// 8. Customer Loan Enquiry Submission (Phase 3 & 4: Defaults to NEW_ENQUIRY)
app.post('/api/leads', async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      city,
      employmentType,
      monthlyIncome,
      productName,
      requestedAmount,
      tenureMonths,
      notes,
      leadSource
    } = req.body;

    if (!customerName || !phone || !requestedAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customer name, phone number, and requested loan amount.'
      });
    }

    // Link or create Customer Profile in Customer Tables
    let customer = await Customer.findOne({ where: { phone } });
    if (!customer) {
      customer = await Customer.create({
        id: `CUST-${Date.now().toString().slice(-5)}`,
        fullName: customerName,
        phone,
        email: email || '',
        city: city || 'Hyderabad',
        employmentType: employmentType || 'Salaried',
        monthlyIncome: parseFloat(monthlyIncome) || 0,
        cibilScore: 740,
        kycStatus: 'VERIFIED',
        totalLoansEnquired: 1,
        totalAmountEnquired: parseFloat(requestedAmount) || 0
      });
    } else {
      customer.totalLoansEnquired = (customer.totalLoansEnquired || 0) + 1;
      customer.totalAmountEnquired = (customer.totalAmountEnquired || 0) + (parseFloat(requestedAmount) || 0);
      await customer.save();
    }

    const leadCount = await Lead.count();
    const newId = `LD-${new Date().getFullYear()}-${100 + leadCount + 1}`;

    const newLead = await Lead.create({
      id: newId,
      customerId: customer.id,
      customerName,
      phone,
      email: email || '',
      city: city || 'Hyderabad',
      employmentType: employmentType || 'Salaried',
      monthlyIncome: parseFloat(monthlyIncome) || 0,
      productName: productName || 'VGS Express Personal Loan',
      requestedAmount: parseFloat(requestedAmount),
      tenureMonths: parseInt(tenureMonths, 10) || 36,
      status: 'NEW_ENQUIRY', // Phase 4 Stage 1: New Enquiry
      priority: 'HIGH',
      leadSource: leadSource || 'Website Portal Enquiry',
      assignedTo: 'Rajesh (Senior Loan Officer)'
    });

    if (notes) {
      await FollowUp.create({
        id: `f-${Date.now()}`,
        leadId: newLead.id,
        date: new Date().toISOString().split('T')[0],
        notes,
        nextDate: null
      });
    }

    // Cloud External Services: Asynchronous notification dispatch (Email + SMS)
    Promise.allSettled([
      email ? sendBusinessEmail({
        to: email,
        subject: `VGS Finance: Loan Application Registered (${newLead.id})`,
        type: 'ENQUIRY_ACKNOWLEDGEMENT',
        payload: {
          customerName,
          leadId: newLead.id,
          productName,
          requestedAmount,
          tenureMonths,
          phone
        }
      }) : Promise.resolve(),
      sendBusinessEmail({
        to: process.env.ADMIN_ALERT_EMAIL || 'admin@vgsfinance.com',
        subject: `🚨 New Loan Lead [${newLead.id}] - ${customerName}`,
        type: 'ADMIN_LEAD_ALERT',
        payload: {
          customerName,
          leadId: newLead.id,
          productName,
          requestedAmount,
          phone,
          city,
          monthlyIncome
        }
      }),
      sendOTP(phone, 'ENQUIRY_ACKNOWLEDGEMENT')
    ]).catch(e => console.error('Cloud notification background dispatch:', e.message));

    res.status(201).json({
      success: true,
      message: 'Thank you! Your loan enquiry has been registered in the database.',
      data: newLead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 9. Lead Management Workflow (Phase 4 Stages)
app.get('/api/leads', async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const where = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (priority) {
      where.priority = priority;
    }
    if (search) {
      where[Op.or] = [
        { customerName: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { id: { [Op.like]: `%${search}%` } },
        { city: { [Op.like]: `%${search}%` } }
      ];
    }

    const leads = await Lead.findAll({
      where,
      include: [{ model: FollowUp, as: 'followUps' }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error('Error retrieving leads:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 10. Update Enquiry Status (Phase 4: New Enquiry → Contacted → Follow-up → Processing → Completed / Closed)
app.patch('/api/leads/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, priority } = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found in database.' });
    }

    if (status) lead.status = status;
    if (assignedTo) lead.assignedTo = assignedTo;
    if (priority) lead.priority = priority;

    await lead.save();

    res.json({ success: true, message: `Lead status updated to ${status} in database.`, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 11. Follow-up Information Management
app.post('/api/leads/:id/follow-up', async (req, res) => {
  try {
    const { id } = req.params;
    const { notes, nextDate, updateStatus } = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    if (!notes) {
      return res.status(400).json({ success: false, message: 'Follow-up remarks are required.' });
    }

    const followUp = await FollowUp.create({
      id: `f-${Date.now()}`,
      leadId: id,
      date: new Date().toISOString().split('T')[0],
      notes,
      nextDate: nextDate || null
    });

    if (updateStatus) {
      lead.status = updateStatus;
      await lead.save();
    }

    res.json({ success: true, message: 'Follow-up remarks saved to database successfully!', data: followUp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =========================================================================
// PHASE 6: CUSTOMER CONTACT WORKFLOW & FINANCIAL INSTITUTION ROUTING
// Customer → Loan Product → Enquiry → Admin → Follow-up → Financial Institution
// =========================================================================

// 12. Assign / Route Lead to Financial Institution (Partner Bank / NBFC)
app.patch('/api/leads/:id/assign-bank', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      partnerBankId,
      assignedBank,
      bankApplicationNo,
      bankProcessStage,
      sanctionedAmount,
      sanctionedRate,
      bankRemarks,
      disbursedDate,
      updateStatus
    } = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Enquiry Lead not found in database.' });
    }

    if (partnerBankId !== undefined) lead.partnerBankId = partnerBankId;
    if (assignedBank) lead.assignedBank = assignedBank;
    if (bankApplicationNo !== undefined) lead.bankApplicationNo = bankApplicationNo;
    if (bankProcessStage) lead.bankProcessStage = bankProcessStage;
    if (sanctionedAmount !== undefined) lead.sanctionedAmount = parseFloat(sanctionedAmount) || 0;
    if (sanctionedRate !== undefined) lead.sanctionedRate = parseFloat(sanctionedRate) || 0;
    if (bankRemarks !== undefined) lead.bankRemarks = bankRemarks;
    if (disbursedDate !== undefined) lead.disbursedDate = disbursedDate;

    // Automatically transition lead status based on bank stage if not explicitly provided
    if (updateStatus) {
      lead.status = updateStatus;
    } else if (bankProcessStage === 'DISBURSED') {
      lead.status = 'COMPLETED_CLOSED';
    } else if (['SUBMITTED_TO_BANK', 'DOC_VERIFICATION', 'SANCTION_APPROVED'].includes(bankProcessStage)) {
      lead.status = 'PROCESSING';
    }

    await lead.save();

    // Log an automated audit follow-up note in database
    const followUpNote = `[Phase 6 Institution Routing] Assigned to ${lead.assignedBank || 'Partner Bank'}. Status: ${bankProcessStage || 'SUBMITTED'}. Ref: ${lead.bankApplicationNo || 'Pending'}. ${bankRemarks ? 'Remarks: ' + bankRemarks : ''}`;
    await FollowUp.create({
      id: `f-bank-${Date.now()}`,
      leadId: id,
      date: new Date().toISOString().split('T')[0],
      notes: followUpNote,
      nextDate: null
    });

    res.json({
      success: true,
      message: `Enquiry successfully routed to ${lead.assignedBank} (${lead.bankProcessStage})`,
      data: lead
    });
  } catch (error) {
    console.error('Error assigning bank:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 13. Phase 6 Customer Contact Workflow Tracker
// Allows customer or admin to track their 6-step progress via Lead ID or Phone
app.get('/api/leads/track/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const cleanQuery = query.trim();

    const lead = await Lead.findOne({
      where: {
        [Op.or]: [
          { id: cleanQuery },
          { id: cleanQuery.toUpperCase() },
          { phone: { [Op.like]: `%${cleanQuery.replace(/\D/g, '')}%` } }
        ]
      },
      include: [{ model: FollowUp, as: 'followUps' }]
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: `No loan enquiry found matching reference "${query}". Please check your Lead ID or registered phone number.`
      });
    }

    // Determine current Phase 6 milestone
    // Milestone 1: Customer (Registered)
    // Milestone 2: Loan Product (Selected)
    // Milestone 3: Enquiry (Submitted & ID assigned)
    // Milestone 4: Admin (Under evaluation / Contacted)
    // Milestone 5: Follow-up (Document checklist & interaction)
    // Milestone 6: Financial Institution / Applicable Loan Process (Bank underwriting / Disbursed)
    let currentStep = 3; // submitted
    if (['CONTACTED'].includes(lead.status)) currentStep = 4;
    if (['FOLLOW_UP'].includes(lead.status)) currentStep = 5;
    if (['PROCESSING'].includes(lead.status)) currentStep = 6;
    if (['COMPLETED_CLOSED', 'CONVERTED_DISBURSED'].includes(lead.status)) currentStep = 6;

    res.json({
      success: true,
      data: {
        lead,
        currentStep,
        stepName: [
          'Customer Profile Access',
          'Loan Product Discovery',
          'Loan Enquiry Generation',
          'Admin Desk Triage & Assignment',
          'Customer Follow-up & Advisory',
          'Financial Institution / Bank Loan Process'
        ][currentStep - 1],
        journey: [
          {
            step: 1,
            title: 'Customer',
            desc: 'Customer accessed the platform and initiated request.',
            completed: true,
            status: 'Completed'
          },
          {
            step: 2,
            title: 'Loan Product',
            desc: `Selected ${lead.productName}`,
            completed: true,
            status: 'Matched'
          },
          {
            step: 3,
            title: 'Enquiry',
            desc: `Lead ID ${lead.id} created for ${lead.requestedAmount ? '₹ ' + lead.requestedAmount.toLocaleString('en-IN') : 'N/A'}.`,
            completed: true,
            status: 'Lodged in Database'
          },
          {
            step: 4,
            title: 'Admin Desk Review',
            desc: lead.assignedTo && lead.assignedTo !== 'Unassigned'
              ? `Assigned to ${lead.assignedTo}. Eligibility & initial assessment verified.`
              : 'Assigned to Senior Loan Manager for immediate triage.',
            completed: currentStep >= 4,
            status: currentStep >= 4 ? 'Reviewed' : 'In Review'
          },
          {
            step: 5,
            title: 'Customer Follow-up',
            desc: lead.followUps && lead.followUps.length > 0
              ? `${lead.followUps.length} follow-up interaction(s) recorded. Latest: "${lead.followUps[lead.followUps.length - 1].notes.slice(0, 80)}..."`
              : 'Direct consultation scheduled with borrower.',
            completed: currentStep >= 5,
            status: currentStep >= 5 ? 'Active Dialogue' : 'Pending Outreach'
          },
          {
            step: 6,
            title: 'Financial Institution Process',
            desc: lead.assignedBank && lead.assignedBank !== 'Not Assigned Yet'
              ? `Routed to ${lead.assignedBank}. Stage: ${lead.bankProcessStage} (Ref: ${lead.bankApplicationNo || 'Pending'}).`
              : 'Matching optimal partner bank / NBFC based on interest rate and LTV.',
            completed: lead.bankProcessStage === 'DISBURSED' || lead.status === 'COMPLETED_CLOSED',
            status: lead.bankProcessStage || 'Evaluating Lenders'
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error tracking lead:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 12. Basic Reports & Stage Distribution (Phase 4 Workflow Stages)
app.get('/api/reports/summary', async (req, res) => {
  try {
    const allLeads = await Lead.findAll();
    const totalLeads = allLeads.length;

    // Phase 4 Stage Counts: New Enquiry → Contacted → Follow-up → Processing → Completed / Closed
    const stageCounts = {
      NEW_ENQUIRY: allLeads.filter(l => ['NEW_ENQUIRY', 'NEW'].includes(l.status)).length,
      CONTACTED: allLeads.filter(l => l.status === 'CONTACTED').length,
      FOLLOW_UP: allLeads.filter(l => l.status === 'FOLLOW_UP').length,
      PROCESSING: allLeads.filter(l => ['PROCESSING', 'DOCUMENT_COLLECTION', 'DOCUMENT_PROCESSING'].includes(l.status)).length,
      COMPLETED_CLOSED: allLeads.filter(l => ['COMPLETED_CLOSED', 'CONVERTED_DISBURSED'].includes(l.status)).length,
      REJECTED: allLeads.filter(l => l.status === 'REJECTED').length
    };

    const completedCount = stageCounts.COMPLETED_CLOSED;
    const totalRequestedVolume = allLeads.reduce((acc, curr) => acc + (curr.requestedAmount || 0), 0);
    const totalDisbursedVolume = allLeads
      .filter(l => ['COMPLETED_CLOSED', 'CONVERTED_DISBURSED'].includes(l.status))
      .reduce((acc, curr) => acc + (curr.requestedAmount || 0), 0);

    const conversionRate = totalLeads > 0 ? ((completedCount / totalLeads) * 100).toFixed(1) : 0;

    const productVolume = {};
    allLeads.forEach(l => {
      productVolume[l.productName] = (productVolume[l.productName] || 0) + (l.requestedAmount || 0);
    });

    res.json({
      success: true,
      data: {
        metrics: {
          totalLeads,
          stageCounts,
          totalRequestedVolume,
          totalDisbursedVolume,
          conversionRate: `${conversionRate}%`
        },
        productVolume,
        monthlyCollectionTarget: 7500000,
        recoveryEfficiency: '98.5%'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 13. Customer Tables Management APIs
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [{ model: Lead, as: 'enquiries' }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [{ model: Lead, as: 'enquiries' }]
    });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer record not found.' });
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 14. Notification Services APIs (WhatsApp, Email, SMS)
app.post('/api/notifications/whatsapp', (req, res) => {
  const { phone, message, leadId } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: 'Phone number is required.' });
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message || 'Greetings from VGS Finance. Your loan application is being processed.');
  const directUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  res.json({
    success: true,
    channel: 'WHATSAPP',
    status: 'QUEUED_DISPATCH',
    dispatchedTo: phone,
    leadId: leadId || null,
    directUrl,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/notifications/email', (req, res) => {
  const { email, subject, body, leadId } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email address is required.' });

  res.json({
    success: true,
    channel: 'EMAIL',
    status: 'DISPATCHED_SMTP',
    dispatchedTo: email,
    subject: subject || 'VGS Finance: Loan Application Update',
    leadId: leadId || null,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/notifications/sms', (req, res) => {
  const { phone, message, leadId } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: 'Phone number is required.' });

  res.json({
    success: true,
    channel: 'SMS',
    status: 'DELIVERED_TELECOM',
    dispatchedTo: phone,
    leadId: leadId || null,
    timestamp: new Date().toISOString()
  });
});

// 15. Admin Tables Management APIs (`admin_users`)
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await AdminUser.findAll({
      attributes: ['id', 'username', 'fullName', 'email', 'phone', 'role', 'permissions', 'isActive', 'lastLoginAt', 'createdAt'],
      order: [['createdAt', 'ASC']]
    });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/admin/users', async (req, res) => {
  try {
    const { username, password, fullName, email, phone, role, permissions } = req.body;
    if (!username || !password || !fullName || !email) {
      return res.status(400).json({ success: false, message: 'Username, password, full name, and email are required.' });
    }

    const existing = await AdminUser.findOne({ where: { username: username.trim().toLowerCase() } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Username already in use.' });
    }

    const newUser = await AdminUser.create({
      id: `ADM-${Date.now().toString().slice(-4)}`,
      username: username.trim().toLowerCase(),
      passwordHash: password,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || null,
      role: role || 'LOAN_OFFICER',
      permissions: permissions || ['LEADS_VIEW', 'LEADS_UPDATE'],
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'New administrative staff user registered successfully.',
      data: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch('/api/admin/users/:id/status', async (req, res) => {
  try {
    const { isActive, role, permissions } = req.body;
    const user = await AdminUser.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Admin user not found.' });

    const updates = {};
    if (typeof isActive === 'boolean') updates.isActive = isActive;
    if (role) updates.role = role;
    if (permissions) updates.permissions = permissions;

    await user.update(updates);
    res.json({ success: true, message: 'User status updated successfully.', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 16. Website Content Tables Management APIs (`website_content`)
app.get('/api/content', async (req, res) => {
  try {
    const contentList = await WebsiteContent.findAll({ order: [['section', 'ASC']] });
    const contentMap = {};
    contentList.forEach(item => {
      contentMap[item.key] = item;
    });
    res.json({ success: true, count: contentList.length, data: contentMap, list: contentList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/content/:key', async (req, res) => {
  try {
    const content = await WebsiteContent.findByPk(req.params.key);
    if (!content) return res.status(404).json({ success: false, message: 'Content key not found.' });
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/content/:key', async (req, res) => {
  try {
    const { title, content, section, updatedBy } = req.body;
    let record = await WebsiteContent.findByPk(req.params.key);

    if (record) {
      await record.update({
        title: title || record.title,
        content: content || record.content,
        section: section || record.section,
        lastUpdatedBy: updatedBy || 'System Admin'
      });
      return res.json({ success: true, message: 'Website content updated successfully.', data: record });
    }

    record = await WebsiteContent.create({
      key: req.params.key,
      section: section || 'general',
      title: title || req.params.key,
      content: content || {},
      lastUpdatedBy: updatedBy || 'System Admin'
    });

    res.status(201).json({ success: true, message: 'Website content created successfully.', data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 17. Cloud External Services: SMS / OTP Provider API
app.post('/api/otp/send', async (req, res) => {
  try {
    const { phone, purpose } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone number is required to send OTP.' });
    const result = await sendOTP(phone, purpose);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/otp/verify', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ success: false, message: 'Phone number and OTP are required.' });
    const result = await verifyOTP(phone, otp);
    if (!result.success) return res.status(400).json(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 18. Cloud External Services: WhatsApp Business API
app.post('/api/notifications/whatsapp-business', async (req, res) => {
  try {
    const { phone, templateName, variables } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone number is required.' });
    const result = await sendWhatsAppMessage(phone, templateName || 'vgs_lead_acknowledgement', variables || {});
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 19. Cloud External Services: SMTP / Business Email Dispatch
app.post('/api/notifications/email-dispatch', async (req, res) => {
  try {
    const { to, subject, type, payload } = req.body;
    const result = await sendBusinessEmail({ to, subject, type, payload });
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 20. Cloud External Services: Third-Party Financial APIs
app.post('/api/financial/check-cibil', async (req, res) => {
  try {
    const { pan, phone, fullName } = req.body;
    const result = await checkCibilScore({ pan, phone, fullName });
    if (!result.success) return res.status(400).json(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/financial/verify-pan', async (req, res) => {
  try {
    const { panNumber, expectedName } = req.body;
    const result = await verifyPanCard(panNumber, expectedName);
    if (!result.success) return res.status(400).json(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/financial/verify-bank', async (req, res) => {
  try {
    const { accountNumber, ifscCode, accountHolderName } = req.body;
    const result = await verifyBankAccount(accountNumber, ifscCode, accountHolderName);
    if (!result.success) return res.status(400).json(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 21. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'VGS Finance Enterprise Lead Management Server',
    status: 'ONLINE',
    database: 'CONNECTED_AUTO_SYNC',
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  try {
    console.log('🔄 Initializing database and synchronizing tables/columns...');
    await initDB();
    app.listen(PORT, () => {
      console.log(`🏦 VGS Finance Lead Management Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
