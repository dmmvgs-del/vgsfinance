// SDLC Step 6 – Automated End-to-End Test Suite for VGS Finance
// Tests Backend APIs, Form Validations, Loan Lifecycle, Follow-up, and Financial Institution Routing

const BASE_URL = 'http://127.0.0.1:5000';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING SDLC STEP 6 AUTOMATED VERIFICATION SUITE');
  console.log('====================================================\n');

  // Ensure server is up (in-process fallback if not reachable in sandbox)
  let activeServer = null;
  try {
    const check = await fetch(`${BASE_URL}/api/health`);
    if (!check.ok) throw new Error();
  } catch (err) {
    console.log('🔄 Bootstrapping in-process server for verification suite...');
    const { startServer } = require('../backend/server.js');
    activeServer = await startServer();
  }

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`• ${name}... `);
      await fn();
      console.log('✅ PASS');
      passed++;
    } catch (err) {
      console.log(`❌ FAIL: ${err.message}`);
      failed++;
    }
  }

  // 1. Health & Server Check
  await test('Backend Health Check & Database Auto-Sync (/api/health)', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.status !== 'ONLINE') throw new Error('Server not online');
  });

  // 2. Landing Data Bundle
  await test('Public Landing Page Data Retrieval (/api/public/landing-data)', async () => {
    const res = await fetch(`${BASE_URL}/api/public/landing-data`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.data.categories || !json.data.products || !json.data.partners) {
      throw new Error('Incomplete landing dataset');
    }
  });

  // 3. Products & Categories Management
  await test('Loan Products API & Category Query Filtering (/api/products)', async () => {
    const res = await fetch(`${BASE_URL}/api/products?categoryId=cat-personal`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json.data) || json.data.length === 0) throw new Error('No products returned');
  });

  // 4. Mathematical EMI Calculator Engine
  await test('Reducing Balance EMI Mathematical Calculation (/api/calculate/emi)', async () => {
    const res = await fetch(`${BASE_URL}/api/calculate/emi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ principal: 1000000, annualRate: 10.5, tenureMonths: 60 })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.data.monthlyEmi <= 0 || json.data.totalPayment <= json.data.totalInterest) {
      throw new Error('EMI calculation output invalid');
    }
  });

  // 5. Basic Loan Eligibility (FOIR 50%) Engine
  await test('Credit Capacity & Basic Eligibility Engine (/api/calculate/eligibility)', async () => {
    const res = await fetch(`${BASE_URL}/api/calculate/eligibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monthlyIncome: 60000, existingEmi: 10000, tenureMonths: 36, annualRate: 11.5 })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.data.allowableMaxEmi !== 20000) { // (60000 * 0.50) - 10000 = 20000
      throw new Error(`Expected allowableMaxEmi 20000 but got ${json.data.allowableMaxEmi}`);
    }
  });

  // 6. Customer Enquiry Submission & Lead ID Generation
  let createdLeadId = null;
  await test('Customer Loan Enquiry Generation & DB Persistence (/api/leads)', async () => {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Raghavendra Rao',
        phone: '+91 99887 76655',
        email: 'raghavendra.rao@example.com',
        city: 'Hyderabad',
        employmentType: 'Salaried',
        monthlyIncome: 65000,
        productName: 'VGS Express Personal Loan',
        requestedAmount: 400000,
        tenureMonths: 36,
        notes: 'Urgent medical requirement for home treatment.'
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.data.id || !json.data.id.startsWith('LD-')) throw new Error('Lead ID not generated');
    createdLeadId = json.data.id;
  });

  // 7. Lead Stage Lifecycle Transition
  await test('Admin Lead Stage Transition (NEW_ENQUIRY -> CONTACTED) (/api/leads/:id/status)', async () => {
    const res = await fetch(`${BASE_URL}/api/leads/${createdLeadId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'CONTACTED' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.data.status !== 'CONTACTED') throw new Error('Stage transition failed');
  });

  // 8. Follow-up Interaction Logging
  await test('Customer Follow-up Log & Callback Date Scheduling (/api/leads/:id/follow-up)', async () => {
    const res = await fetch(`${BASE_URL}/api/leads/${createdLeadId}/follow-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notes: 'Connected with borrower. KYC documents verified, proceeding to bank routing.',
        nextDate: '2026-11-04',
        updateStatus: 'PROCESSING'
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });

  // 9. Financial Institution Routing (Phase 6)
  await test('Phase 6: Financial Institution Routing & Sanction (/api/leads/:id/assign-bank)', async () => {
    const res = await fetch(`${BASE_URL}/api/leads/${createdLeadId}/assign-bank`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        partnerBankId: 'partner-hdfc',
        assignedBank: 'HDFC Bank',
        bankApplicationNo: 'HDFC-PL-2026-SDLC',
        bankProcessStage: 'SANCTION_APPROVED',
        sanctionedAmount: 400000,
        sanctionedRate: 10.75,
        bankRemarks: 'Fast-track sanction letter approved by HDFC Bank underwriting desk.',
        updateStatus: 'PROCESSING'
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.data.assignedBank !== 'HDFC Bank' || json.data.bankProcessStage !== 'SANCTION_APPROVED') {
      throw new Error('Bank routing data not saved correctly');
    }
  });

  // 10. Customer Contact Workflow Real-time Tracker
  await test('Phase 6: Live Lead Tracking & Milestone Resolution (/api/leads/track/:query)', async () => {
    const res = await fetch(`${BASE_URL}/api/leads/track/${createdLeadId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.data.currentStep !== 6) throw new Error(`Expected Step 6, got Step ${json.data.currentStep}`);
    if (json.data.lead.assignedBank !== 'HDFC Bank') throw new Error('Tracking lead missing bank');
  });

  // 11. Reports & Analytics Summary
  await test('Executive Dashboard Reporting & Analytics (/api/reports/summary)', async () => {
    const res = await fetch(`${BASE_URL}/api/reports/summary`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.data.metrics.totalLeads || !json.data.metrics.stageCounts) {
      throw new Error('Reports summary metrics missing');
    }
  });

  // 12. System Architecture: Admin Authentication
  await test('Admin Authentication Service (/api/auth/login)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.token || json.admin?.role !== 'SUPER_ADMIN') throw new Error('Auth login token missing');
  });

  // 13. System Architecture: Customer Tables API
  await test('Database Layer: Customer Tables API (/api/customers)', async () => {
    const res = await fetch(`${BASE_URL}/api/customers`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json.data) || json.data.length === 0) throw new Error('Customer table is empty');
  });

  // 14. System Architecture: Notification Services API
  await test('Backend Services: Notification APIs (WhatsApp & Email)', async () => {
    const resWa = await fetch(`${BASE_URL}/api/notifications/whatsapp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '+91 98480 12345', message: 'Loan sanctioned successfully', leadId: createdLeadId })
    });
    if (!resWa.ok) throw new Error(`WhatsApp API HTTP ${resWa.status}`);

    const resEm = await fetch(`${BASE_URL}/api/notifications/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'borrower@example.com', subject: 'Sanction Notice', leadId: createdLeadId })
    });
    if (!resEm.ok) throw new Error(`Email API HTTP ${resEm.status}`);
  });

  // 15. System Architecture: Admin Tables API
  await test('Database Layer: Admin Users Tables (/api/admin/users)', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/users`);
    if (!res.ok) throw new Error(`Admin users HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json.data) || json.data.length === 0) throw new Error('Admin users table is empty');
    const adminUser = json.data.find(u => u.username === 'admin');
    if (!adminUser) throw new Error('Super admin user missing from admin_users table');
  });

  // 16. System Architecture: Website Content Tables API
  await test('Database Layer: Website Content Tables (/api/content)', async () => {
    const res = await fetch(`${BASE_URL}/api/content`);
    if (!res.ok) throw new Error(`Content API HTTP ${res.status}`);
    const json = await res.json();
    if (!json.data.company_profile || !json.data.contact_desk) throw new Error('Missing website content key records');
  });

  // 17. Cloud External Services: OTP / SMS Gateway
  await test('Cloud Services: OTP & SMS Dispatch + Verification (/api/otp/send, /api/otp/verify)', async () => {
    const resSend = await fetch(`${BASE_URL}/api/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '+91 99887 76655', purpose: 'LOAN_VERIFICATION' })
    });
    if (!resSend.ok) throw new Error(`OTP send HTTP ${resSend.status}`);
    const sendJson = await resSend.json();
    const otp = sendJson.demoOtp;
    if (!otp) throw new Error('Demo OTP not returned in test environment');

    const resVerify = await fetch(`${BASE_URL}/api/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '+91 99887 76655', otp })
    });
    if (!resVerify.ok) throw new Error(`OTP verify HTTP ${resVerify.status}`);
    const verifyJson = await resVerify.json();
    if (!verifyJson.success) throw new Error('OTP verification returned false');
  });

  // 18. Cloud External Services: WhatsApp Business API
  await test('Cloud Services: WhatsApp Business API (/api/notifications/whatsapp-business)', async () => {
    const res = await fetch(`${BASE_URL}/api/notifications/whatsapp-business`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '+91 98480 12345',
        templateName: 'vgs_loan_sanctioned',
        variables: {
          customerName: 'Raghavendra Rao',
          leadId: createdLeadId,
          assignedBank: 'HDFC Bank',
          sanctionedAmount: '4,00,000',
          sanctionedRate: '10.75'
        }
      })
    });
    if (!res.ok) throw new Error(`WhatsApp Business HTTP ${res.status}`);
    const json = await res.json();
    if (!json.directWaUrl) throw new Error('Direct WhatsApp fallback URL missing');
  });

  // 19. Cloud External Services: SMTP / Business Email Dispatch
  await test('Cloud Services: SMTP / Business Email Dispatch (/api/notifications/email-dispatch)', async () => {
    const res = await fetch(`${BASE_URL}/api/notifications/email-dispatch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'raghavendra.rao@example.com',
        subject: 'VGS Finance: Loan Sanction Approved',
        type: 'SANCTION_APPROVED',
        payload: {
          customerName: 'Raghavendra Rao',
          leadId: createdLeadId,
          assignedBank: 'HDFC Bank',
          bankApplicationNo: 'HDFC-PL-2026-SDLC',
          sanctionedAmount: 400000,
          sanctionedRate: 10.75
        }
      })
    });
    if (!res.ok) throw new Error(`Email Dispatch HTTP ${res.status}`);
  });

  // 20. Cloud External Services: Third-Party Financial APIs (CIBIL, PAN, Penny Drop)
  await test('Cloud Services: Third-Party Financial APIs (CIBIL Bureau, PAN, Bank Verification)', async () => {
    // CIBIL Bureau
    const resCibil = await fetch(`${BASE_URL}/api/financial/check-cibil`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pan: 'ABCDE1234F', phone: '+91 99887 76655', fullName: 'Raghavendra Rao' })
    });
    if (!resCibil.ok) throw new Error(`CIBIL check HTTP ${resCibil.status}`);
    const cibilJson = await resCibil.json();
    if (!cibilJson.cibilScore || cibilJson.cibilScore < 300) throw new Error('Invalid CIBIL score');

    // PAN Card Verification
    const resPan = await fetch(`${BASE_URL}/api/financial/verify-pan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ panNumber: 'ABCDE1234F', expectedName: 'Raghavendra Rao' })
    });
    if (!resPan.ok) throw new Error(`PAN check HTTP ${resPan.status}`);
    const panJson = await resPan.json();
    if (!panJson.valid) throw new Error('PAN check failed');

    // Bank Account Penny Drop
    const resBank = await fetch(`${BASE_URL}/api/financial/verify-bank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountNumber: '123456789012', ifscCode: 'HDFC0001234', accountHolderName: 'Raghavendra Rao' })
    });
    if (!resBank.ok) throw new Error(`Bank verify HTTP ${resBank.status}`);
    const bankJson = await resBank.json();
    if (!bankJson.valid) throw new Error('Bank verification failed');
  });

  // 21. Loan Categories: All 16 Applicable Financial Products
  await test('Loan Categories: Verify All 16 Applicable Financial Products (/api/categories)', async () => {
    const res = await fetch(`${BASE_URL}/api/categories`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json.data) || json.data.length < 16) {
      throw new Error(`Expected at least 16 categories, found ${json.data?.length}`);
    }
  });

  // 22. Loan Details Page Specifications Validation
  await test('Loan Details Page: Verify Product Specifications Coverage (13 Elements Ready)', async () => {
    const res = await fetch(`${BASE_URL}/api/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const prods = json.data;
    if (!Array.isArray(prods) || prods.length === 0) throw new Error('No products found');
    
    // Verify each product has the necessary attributes for the 13 Loan Details sections
    for (const p of prods) {
      if (!p.name || !p.tagline) throw new Error(`Product ${p.id} missing name or tagline`);
      if (typeof p.interestRate !== 'number' || p.interestRate <= 0) throw new Error(`Product ${p.id} invalid interestRate`);
      if (!p.minAmount || !p.maxAmount || p.minAmount > p.maxAmount) throw new Error(`Product ${p.id} invalid amount range`);
      if (!p.minTenure || !p.maxTenure || p.minTenure > p.maxTenure) throw new Error(`Product ${p.id} invalid tenure range`);
      if (!p.eligibility || typeof p.eligibility.minAge !== 'number') throw new Error(`Product ${p.id} missing eligibility`);
      if (!Array.isArray(p.features) || p.features.length === 0) throw new Error(`Product ${p.id} missing features`);
    }
  });

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (activeServer) {
    activeServer.close();
  }

  if (failed > 0) process.exit(1);
  process.exit(0);
}

runTests();

