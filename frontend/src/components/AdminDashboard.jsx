import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

export default function AdminDashboard({ onSwitchToWebsite }) {
  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('vgs_admin_auth') === 'true';
  });
  const [authForm, setAuthForm] = useState({ username: 'admin', password: 'admin123' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeAdminTab, setActiveAdminTab] = useState('leads'); // 'leads' | 'overview' | 'products' | 'partners' | 'customers' | 'admins' | 'cms' | 'cloud'
  const [leads, setLeads] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [partners, setPartners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [webContent, setWebContent] = useState({});
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin Users & Staff state
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    role: 'LOAN_OFFICER'
  });

  // Cloud & External Services Interactive Testing State
  const [otpTestPhone, setOtpTestPhone] = useState('+91 99887 76655');
  const [otpSentData, setOtpSentData] = useState(null);
  const [otpVerifyCode, setOtpVerifyCode] = useState('');
  const [otpVerifyResult, setOtpVerifyResult] = useState(null);

  const [waTestPhone, setWaTestPhone] = useState('+91 98480 12345');
  const [waTestResult, setWaTestResult] = useState(null);

  const [emailTestAddress, setEmailTestAddress] = useState('customer@example.com');
  const [emailTestType, setEmailTestType] = useState('ENQUIRY_ACKNOWLEDGEMENT');
  const [emailTestResult, setEmailTestResult] = useState(null);

  const [cibilTestPan, setCibilTestPan] = useState('ABCDE1234F');
  const [cibilTestResult, setCibilTestResult] = useState(null);

  const [panTestNumber, setPanTestNumber] = useState('ABCDE1234F');
  const [panTestResult, setPanTestResult] = useState(null);

  const [bankTestAcc, setBankTestAcc] = useState('123456789012');
  const [bankTestIfsc, setBankTestIfsc] = useState('HDFC0001234');
  const [bankTestResult, setBankTestResult] = useState(null);

  const [cmsSaveStatus, setCmsSaveStatus] = useState('');

  // Filters (Phase 4 Stages)
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Lead for Follow-up & Contact Modal (Phase 4 maintenance)
  const [selectedLead, setSelectedLead] = useState(null);
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [followUpNextDate, setFollowUpNextDate] = useState('');
  const [followUpNewStatus, setFollowUpNewStatus] = useState('FOLLOW_UP');

  // Phase 6 – Financial Institution / Partner Bank Routing Modal & State
  const [showBankRoutingModal, setShowBankRoutingModal] = useState(false);
  const [bankRoutingLead, setBankRoutingLead] = useState(null);
  const [bankFilter, setBankFilter] = useState('ALL');
  const [bankRoutingForm, setBankRoutingForm] = useState({
    partnerBankId: 'partner-hdfc',
    assignedBank: 'HDFC Bank',
    bankApplicationNo: '',
    bankProcessStage: 'SUBMITTED_TO_BANK',
    sanctionedAmount: '',
    sanctionedRate: '',
    bankRemarks: '',
    updateStatus: 'PROCESSING'
  });

  // Modals for Products, Categories, Partners
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    categoryId: 'cat-personal',
    interestRate: 11.5,
    minAmount: 50000,
    maxAmount: 1500000,
    minTenure: 12,
    maxTenure: 60,
    tagline: ''
  });

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryForm, setNewCategoryForm] = useState({ name: '', icon: '📄', description: '' });

  const [showAddPartner, setShowAddPartner] = useState(false);
  const [newPartnerForm, setNewPartnerForm] = useState({
    name: '',
    code: '',
    type: 'Private Bank',
    logoText: '',
    maxLtv: '85%',
    approvalRate: '95%'
  });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [leadsRes, prodsRes, catsRes, partnersRes, reportsRes, custRes, adminsRes, contentRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/leads`),
        fetch(`${API_BASE_URL}/api/products`),
        fetch(`${API_BASE_URL}/api/categories`),
        fetch(`${API_BASE_URL}/api/partners`),
        fetch(`${API_BASE_URL}/api/reports/summary`),
        fetch(`${API_BASE_URL}/api/customers`),
        fetch(`${API_BASE_URL}/api/admin/users`),
        fetch(`${API_BASE_URL}/api/content`)
      ]);

      if (leadsRes.ok) setLeads((await leadsRes.json()).data);
      if (prodsRes.ok) setProducts((await prodsRes.json()).data);
      if (catsRes.ok) setCategories((await catsRes.json()).data);
      if (partnersRes.ok) setPartners((await partnersRes.json()).data);
      if (reportsRes.ok) setReports((await reportsRes.json()).data);
      if (custRes.ok) setCustomers((await custRes.json()).data);
      if (adminsRes.ok) setAdminUsers((await adminsRes.json()).data);
      if (contentRes.ok) setWebContent((await contentRes.json()).data);
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('vgs_admin_auth', 'true');
        localStorage.setItem('vgs_admin_token', data.token);
        setIsAuthenticated(true);
        fetchAdminData();
      } else {
        setAuthError(data.message || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setAuthError('Unable to connect to authentication service.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vgs_admin_auth');
    localStorage.removeItem('vgs_admin_token');
    setIsAuthenticated(false);
    onSwitchToWebsite();
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Phase 4: Maintain Customer Enquiry Status
  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  // Phase 4: Maintain Follow-up Information
  const handleAddFollowUp = async (e) => {
    e.preventDefault();
    if (!selectedLead || !followUpNotes) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/${selectedLead.id}/follow-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: followUpNotes,
          nextDate: followUpNextDate,
          updateStatus: followUpNewStatus || undefined
        })
      });

      if (res.ok) {
        setFollowUpNotes('');
        setFollowUpNextDate('');
        setSelectedLead(null);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Follow-up error:', err);
    }
  };

  // Product, Category, Partner Management
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductForm)
      });
      if (res.ok) {
        setShowAddProduct(false);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Create product error:', err);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategoryForm)
      });
      if (res.ok) {
        setShowAddCategory(false);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Create category error:', err);
    }
  };

  const handleCreatePartner = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPartnerForm)
      });
      if (res.ok) {
        setShowAddPartner(false);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Create partner error:', err);
    }
  };

  const handleDeletePartner = async (id) => {
    if (!confirm('Are you sure you want to remove this partner institution?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/partners/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Delete partner error:', err);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdminForm)
      });
      if (res.ok) {
        setShowAddAdmin(false);
        setNewAdminForm({ username: '', password: '', fullName: '', email: '', phone: '', role: 'LOAN_OFFICER' });
        fetchAdminData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to create administrative user');
      }
    } catch (err) {
      console.error('Create admin user error:', err);
    }
  };

  const handleToggleAdminStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Update admin user error:', err);
    }
  };

  const handleSaveWebContent = async (key, updatedContent) => {
    try {
      setCmsSaveStatus('Saving changes...');
      const res = await fetch(`${API_BASE_URL}/api/content/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedContent })
      });
      if (res.ok) {
        setCmsSaveStatus('Saved successfully!');
        setTimeout(() => setCmsSaveStatus(''), 2500);
        fetchAdminData();
      }
    } catch (err) {
      setCmsSaveStatus('Failed to save content.');
    }
  };

  const handleTestOtpSend = async () => {
    try {
      setOtpVerifyResult(null);
      const res = await fetch(`${API_BASE_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: otpTestPhone, purpose: 'ADMIN_DESK_TEST' })
      });
      const data = await res.json();
      setOtpSentData(data);
      if (data.demoOtp) setOtpVerifyCode(data.demoOtp);
    } catch (err) {
      console.error('OTP Send error:', err);
    }
  };

  const handleTestOtpVerify = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: otpTestPhone, otp: otpVerifyCode })
      });
      const data = await res.json();
      setOtpVerifyResult(data);
    } catch (err) {
      console.error('OTP Verify error:', err);
    }
  };

  const handleTestWhatsApp = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications/whatsapp-business`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: waTestPhone,
          templateName: 'vgs_lead_acknowledgement',
          variables: { customerName: 'Test Borrower', leadId: 'LD-TEST-99', productName: 'VGS Express Personal Loan' }
        })
      });
      const data = await res.json();
      setWaTestResult(data);
    } catch (err) {
      console.error('WhatsApp Test error:', err);
    }
  };

  const handleTestEmail = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/notifications/email-dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailTestAddress,
          subject: 'VGS Finance: Loan Verification Notification',
          type: emailTestType,
          payload: { customerName: 'Test Borrower', leadId: 'LD-TEST-99', requestedAmount: 500000, productName: 'Express Personal Loan' }
        })
      });
      const data = await res.json();
      setEmailTestResult(data);
    } catch (err) {
      console.error('Email Test error:', err);
    }
  };

  const handleTestCibil = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/financial/check-cibil`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pan: cibilTestPan, phone: '+91 99887 76655', fullName: 'Raghavendra Rao' })
      });
      const data = await res.json();
      setCibilTestResult(data);
    } catch (err) {
      console.error('CIBIL Test error:', err);
    }
  };

  const handleTestPan = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/financial/verify-pan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ panNumber: panTestNumber, expectedName: 'Raghavendra Rao' })
      });
      const data = await res.json();
      setPanTestResult(data);
    } catch (err) {
      console.error('PAN Test error:', err);
    }
  };

  const handleTestBank = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/financial/verify-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountNumber: bankTestAcc, ifscCode: bankTestIfsc, accountHolderName: 'Raghavendra Rao' })
      });
      const data = await res.json();
      setBankTestResult(data);
    } catch (err) {
      console.error('Bank Verify Test error:', err);
    }
  };

  // Phase 6 – Open Financial Institution Routing Modal
  const handleOpenBankRoutingModal = (lead) => {
    setBankRoutingLead(lead);
    const matchedPartner = partners.find(p => p.id === lead.partnerBankId) || partners.find(p => p.name === lead.assignedBank) || partners[0] || { id: 'partner-hdfc', name: 'HDFC Bank', code: 'HDFC' };
    const bankCode = matchedPartner.code || 'BNK';
    const autoRef = `${bankCode}-${lead.id.replace('LD-', '')}-${Date.now().toString().slice(-4)}`;

    setBankRoutingForm({
      partnerBankId: lead.partnerBankId || matchedPartner.id,
      assignedBank: lead.assignedBank && lead.assignedBank !== 'Not Assigned Yet' ? lead.assignedBank : matchedPartner.name,
      bankApplicationNo: lead.bankApplicationNo || autoRef,
      bankProcessStage: lead.bankProcessStage && lead.bankProcessStage !== 'NOT_ROUTED' ? lead.bankProcessStage : 'SUBMITTED_TO_BANK',
      sanctionedAmount: lead.sanctionedAmount || lead.requestedAmount || '',
      sanctionedRate: lead.sanctionedRate || 10.5,
      bankRemarks: lead.bankRemarks || '',
      updateStatus: lead.status === 'COMPLETED_CLOSED' ? 'COMPLETED_CLOSED' : 'PROCESSING'
    });
    setShowBankRoutingModal(true);
  };

  // Phase 6 – Save Financial Institution Routing
  const handleSaveBankRouting = async (e) => {
    e.preventDefault();
    if (!bankRoutingLead) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/${bankRoutingLead.id}/assign-bank`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bankRoutingForm)
      });

      if (res.ok) {
        setShowBankRoutingModal(false);
        setBankRoutingLead(null);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Failed to assign financial institution:', err);
    }
  };

  // Filtered Leads (Phase 4 Stages & Phase 6 Institution Routing)
  const filteredLeads = leads.filter(l => {
    const isStageMatch = statusFilter === 'ALL' || l.status === statusFilter ||
      (statusFilter === 'NEW_ENQUIRY' && ['NEW_ENQUIRY', 'NEW'].includes(l.status)) ||
      (statusFilter === 'PROCESSING' && ['PROCESSING', 'DOCUMENT_COLLECTION', 'DOCUMENT_PROCESSING'].includes(l.status)) ||
      (statusFilter === 'COMPLETED_CLOSED' && ['COMPLETED_CLOSED', 'CONVERTED_DISBURSED'].includes(l.status));

    const isBankMatch = bankFilter === 'ALL' ||
      (bankFilter === 'UNASSIGNED' && (!l.assignedBank || l.assignedBank === 'Not Assigned Yet')) ||
      (l.assignedBank === bankFilter);

    const matchesSearch = searchQuery === '' ||
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.assignedBank && l.assignedBank.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.bankApplicationNo && l.bankApplicationNo.toLowerCase().includes(searchQuery.toLowerCase()));

    return isStageMatch && isBankMatch && matchesSearch;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Phase 4 Workflow Stage Counts
  const phase4Stages = [
    { key: 'NEW_ENQUIRY', label: '1. New Enquiry', icon: '📥', color: 'from-sky-500 to-indigo-600' },
    { key: 'CONTACTED', label: '2. Contacted', icon: '📞', color: 'from-amber-500 to-orange-600' },
    { key: 'FOLLOW_UP', label: '3. Follow-up', icon: '🗓️', color: 'from-purple-500 to-pink-600' },
    { key: 'PROCESSING', label: '4. Processing', icon: '⚙️', color: 'from-indigo-500 to-blue-600' },
    { key: 'COMPLETED_CLOSED', label: '5. Completed / Closed', icon: '✅', color: 'from-emerald-500 to-teal-600' }
  ];

  const getStageBadgeStyle = (status) => {
    if (['NEW_ENQUIRY', 'NEW'].includes(status)) return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    if (status === 'CONTACTED') return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    if (status === 'FOLLOW_UP') return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    if (['PROCESSING', 'DOCUMENT_COLLECTION'].includes(status)) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    if (['COMPLETED_CLOSED', 'CONVERTED_DISBURSED'].includes(status)) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  };

  const formatStageLabel = (status) => {
    if (['NEW_ENQUIRY', 'NEW'].includes(status)) return 'New Enquiry';
    if (status === 'CONTACTED') return 'Contacted';
    if (status === 'FOLLOW_UP') return 'Follow-up';
    if (['PROCESSING', 'DOCUMENT_COLLECTION'].includes(status)) return 'Processing';
    if (['COMPLETED_CLOSED', 'CONVERTED_DISBURSED'].includes(status)) return 'Completed / Closed';
    if (status === 'REJECTED') return 'Closed - Rejected';
    return status;
  };

  // If unauthenticated, render the Executive Admin Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 mx-auto flex items-center justify-center text-3xl font-black text-white shadow-lg">
              ⚡
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Admin Portal Login</h2>
            <p className="text-xs text-slate-400">
              VGS Finance & Loans Management System • Restricted Access
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center font-semibold">
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Admin Username / Email
              </label>
              <input
                type="text"
                required
                value={authForm.username}
                onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              {authLoading ? 'Verifying Credentials...' : '🔒 Sign In to Admin Desk'}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500 text-[11px]">Demo: admin / admin123</span>
            <button
              type="button"
              onClick={onSwitchToWebsite}
              className="text-emerald-400 hover:underline font-bold cursor-pointer"
            >
              Return to Website ➔
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

      {/* Admin Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center font-black text-lg text-white shadow-lg">
            ⚡
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              VGS Finance Admin Portal
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                Phase 6: Customer Contact & Institution Routing
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Customer ➔ Loan Product ➔ Enquiry ➔ Admin ➔ Follow-up ➔ Financial Institution / Bank Process
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
          >
            🔄 Refresh Pipeline
          </button>
          <button
            onClick={onSwitchToWebsite}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer flex items-center gap-1.5"
          >
            🌐 Public Website
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 cursor-pointer flex items-center gap-1"
          >
            🔒 Sign Out
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-6 flex flex-wrap gap-4 sm:gap-6">
        <button
          onClick={() => setActiveAdminTab('leads')}
          className={`py-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeAdminTab === 'leads'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-white'
            }`}
        >
          <span>📋 Lead Pipeline & Workflow</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
            {leads.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`py-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeAdminTab === 'overview'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-white'
            }`}
        >
          <span>📊 Stage Reports & Conversion</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('products')}
          className={`py-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeAdminTab === 'products'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-white'
            }`}
        >
          <span>⚙️ Products & Categories</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('partners')}
          className={`py-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeAdminTab === 'partners'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-white'
            }`}
        >
          <span>🏦 Partner Institutions</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('customers')}
          className={`py-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeAdminTab === 'customers'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-white'
            }`}
        >
          <span>👤 Customers & KYC</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
            {customers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminTab('admins')}
          className={`py-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeAdminTab === 'admins'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-white'
            }`}
        >
          <span>🛡️ Staff & Roles</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
            {adminUsers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminTab('cms')}
          className={`py-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeAdminTab === 'cms'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-white'
            }`}
        >
          <span>📝 Website Content</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('cloud')}
          className={`py-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${activeAdminTab === 'cloud'
            ? 'border-emerald-500 text-emerald-400'
            : 'border-transparent text-slate-400 hover:text-white'
            }`}
        >
          <span>☁️ Cloud & Integrations</span>
        </button>
      </div>

      {/* Admin Main Body */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">

        {/* TAB 1: Phase 4 Lead Management Workflow */}
        {activeAdminTab === 'leads' && (
          <div className="space-y-6">

            {/* Visual 5-Stage Pipeline Stepper */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Phase 4 Lead Stage Lifecycle Pipeline</span>
                <span className="text-emerald-400">Click any stage to filter</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {phase4Stages.map((st, idx) => {
                  const count = leads.filter(l => {
                    if (st.key === 'NEW_ENQUIRY') return ['NEW_ENQUIRY', 'NEW'].includes(l.status);
                    if (st.key === 'CONTACTED') return l.status === 'CONTACTED';
                    if (st.key === 'FOLLOW_UP') return l.status === 'FOLLOW_UP';
                    if (st.key === 'PROCESSING') return ['PROCESSING', 'DOCUMENT_COLLECTION', 'DOCUMENT_PROCESSING'].includes(l.status);
                    if (st.key === 'COMPLETED_CLOSED') return ['COMPLETED_CLOSED', 'CONVERTED_DISBURSED'].includes(l.status);
                    return false;
                  }).length;

                  const isSelected = statusFilter === st.key;

                  return (
                    <button
                      key={st.key}
                      onClick={() => setStatusFilter(isSelected ? 'ALL' : st.key)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${isSelected
                        ? 'bg-slate-800 border-emerald-400 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{st.icon}</span>
                        <span className={`text-sm font-black px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'
                          }`}>
                          {count}
                        </span>
                      </div>
                      <div className="font-bold text-white text-xs mt-2 truncate">{st.label}</div>
                      {idx < 4 && (
                        <div className="hidden sm:block absolute right-1 top-1/2 -translate-y-1/2 text-slate-700 font-bold text-xs">
                          ➔
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter, Search & Status Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${statusFilter === 'ALL' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                >
                  All ({leads.length})
                </button>
                {phase4Stages.map(st => (
                  <button
                    key={st.key}
                    onClick={() => setStatusFilter(st.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${statusFilter === st.key ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                  >
                    {st.label.split('. ')[1]}
                  </button>
                ))}
              </div>

              <div className="w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search customer, phone, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Phase 6: Financial Institution Filter Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] whitespace-nowrap">🏦 Lending Partner:</span>
              <button
                onClick={() => setBankFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${bankFilter === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
              >
                All Partners
              </button>
              {partners.map(p => (
                <button
                  key={p.id}
                  onClick={() => setBankFilter(p.name)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${bankFilter === p.name ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                >
                  {p.name}
                </button>
              ))}
              <button
                onClick={() => setBankFilter('UNASSIGNED')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${bankFilter === 'UNASSIGNED' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
              >
                Unassigned
              </button>
            </div>

            {/* Leads Workflow Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 uppercase text-[11px] text-slate-400 border-b border-slate-800 font-bold">
                    <tr>
                      <th className="px-4 py-3.5">Lead ID</th>
                      <th className="px-4 py-3.5">Customer & City</th>
                      <th className="px-4 py-3.5">Loan Scheme & Amount</th>
                      <th className="px-4 py-3.5">Income</th>
                      <th className="px-4 py-3.5">Current Workflow Stage</th>
                      <th className="px-4 py-3.5">Financial Institution & Bank Stage</th>
                      <th className="px-4 py-3.5">Quick Stage Action</th>
                      <th className="px-4 py-3.5 text-right">Outreach & Institution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-indigo-400 font-bold">{lead.id}</td>
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white text-sm">{lead.customerName}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">📞 {lead.phone} • 📍 {lead.city}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white text-sm">{formatCurrency(lead.requestedAmount)}</div>
                          <div className="text-[11px] text-sky-400">{lead.productName}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div>{lead.employmentType}</div>
                          <div className="text-emerald-400 font-bold">{formatCurrency(lead.monthlyIncome)}/m</div>
                        </td>

                        {/* Current Status Dropdown */}
                        <td className="px-4 py-3.5">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                            className={`border rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none cursor-pointer ${getStageBadgeStyle(lead.status)}`}
                          >
                            <option value="NEW_ENQUIRY">1. New Enquiry</option>
                            <option value="CONTACTED">2. Contacted</option>
                            <option value="FOLLOW_UP">3. Follow-up</option>
                            <option value="PROCESSING">4. Processing</option>
                            <option value="COMPLETED_CLOSED">5. Completed / Closed</option>
                            <option value="REJECTED">Closed - Rejected</option>
                          </select>
                        </td>

                        {/* Phase 6 – Financial Institution & Bank Loan Process */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${lead.assignedBank && lead.assignedBank !== 'Not Assigned Yet'
                              ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                              🏦 {lead.assignedBank || 'Not Assigned Yet'}
                            </span>
                          </div>
                          {lead.bankProcessStage && lead.bankProcessStage !== 'NOT_ROUTED' && (
                            <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                              <span>{lead.bankProcessStage}</span>
                              {lead.bankApplicationNo && <span className="font-mono text-slate-400">({lead.bankApplicationNo})</span>}
                            </div>
                          )}
                          <button
                            onClick={() => handleOpenBankRoutingModal(lead)}
                            className="mt-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 underline cursor-pointer inline-flex items-center gap-1"
                          >
                            ⚙️ Route / Update Bank ➔
                          </button>
                        </td>

                        {/* Quick 1-click stage progression */}
                        <td className="px-4 py-3.5">
                          {['NEW_ENQUIRY', 'NEW'].includes(lead.status) && (
                            <button
                              onClick={() => handleUpdateStatus(lead.id, 'CONTACTED')}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[11px] cursor-pointer"
                            >
                              Mark Contacted ➔
                            </button>
                          )}
                          {lead.status === 'CONTACTED' && (
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setFollowUpNewStatus('FOLLOW_UP');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-[11px] cursor-pointer"
                            >
                              Log Follow-up ➔
                            </button>
                          )}
                          {lead.status === 'FOLLOW_UP' && (
                            <button
                              onClick={() => handleOpenBankRoutingModal(lead)}
                              className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-[11px] cursor-pointer"
                            >
                              Route to Bank ➔
                            </button>
                          )}
                          {['PROCESSING', 'DOCUMENT_COLLECTION'].includes(lead.status) && (
                            <button
                              onClick={() => handleUpdateStatus(lead.id, 'COMPLETED_CLOSED')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] cursor-pointer"
                            >
                              Complete / Disburse ✔
                            </button>
                          )}
                          {['COMPLETED_CLOSED', 'CONVERTED_DISBURSED'].includes(lead.status) && (
                            <span className="text-[11px] font-bold text-emerald-400">
                              🎉 Disbursed
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <a
                            href={`tel:${lead.phone}`}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs inline-flex items-center gap-1"
                            title="Call customer via phone"
                          >
                            📞
                          </a>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Dear%20${encodeURIComponent(lead.customerName)},%20Greetings%20from%20VGS%20Finance.%20Your%20loan%20enquiry%20(${lead.id})%20for%20${encodeURIComponent(lead.productName)}%20is%20currently%20under%20review.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-300 border border-green-500/30 font-bold text-xs inline-flex items-center gap-1"
                            title="Chat with borrower on WhatsApp"
                          >
                            💬
                          </a>
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setFollowUpNewStatus(lead.status);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 font-bold text-xs cursor-pointer"
                          >
                            📝 Follow-up ({lead.followUps?.length || 0})
                          </button>
                          <button
                            onClick={() => handleOpenBankRoutingModal(lead)}
                            className="px-2.5 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/40 text-sky-300 border border-sky-500/30 font-bold text-xs cursor-pointer"
                            title="Route to Bank / NBFC"
                          >
                            🏦 Bank
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Stage Reports & Funnel Analysis */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs uppercase text-slate-400 font-bold">Total Enquiries</div>
                <div className="text-3xl font-black text-white mt-1">{reports?.metrics?.totalLeads || 0}</div>
                <div className="text-xs text-sky-400 mt-1">Total Leads In Database</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs uppercase text-slate-400 font-bold">Completed / Closed</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">
                  {reports?.metrics?.stageCounts?.COMPLETED_CLOSED || 0}
                </div>
                <div className="text-xs text-slate-500 mt-1">Conversion: {reports?.metrics?.conversionRate || '0%'}</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs uppercase text-slate-400 font-bold">Pipeline Requested</div>
                <div className="text-2xl font-black text-amber-400 mt-1">
                  {formatCurrency(reports?.metrics?.totalRequestedVolume)}
                </div>
                <div className="text-xs text-slate-500 mt-1">Across all loan applications</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="text-xs uppercase text-slate-400 font-bold">Disbursed Capital</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {formatCurrency(reports?.metrics?.totalDisbursedVolume)}
                </div>
                <div className="text-xs text-emerald-400 mt-1">Completed Loans Volume</div>
              </div>
            </div>

            {/* Funnel Stage Visualization */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Phase 4 Funnel Conversion Analysis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {phase4Stages.map((st) => {
                  const count = reports?.metrics?.stageCounts?.[st.key] || 0;
                  const total = reports?.metrics?.totalLeads || 1;
                  const pct = Math.round((count / total) * 100);

                  return (
                    <div key={st.key} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                      <div className="text-2xl">{st.icon}</div>
                      <div className="text-xs font-bold text-white">{st.label.split('. ')[1]}</div>
                      <div className="text-xl font-black text-emerald-400">{count}</div>
                      <div className="text-[11px] text-slate-500">{pct}% of pipeline</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Products */}
        {activeAdminTab === 'products' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">Loan Product Portfolio Management</h2>
                <p className="text-xs text-slate-400">Configure interest rates, tenure limits, and loan criteria</p>
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white cursor-pointer shadow-md"
              >
                + Add New Loan Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-base">{p.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-black">
                      {p.interestRate}% p.a.
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{p.tagline}</p>
                  <div className="pt-2 border-t border-slate-800 text-xs space-y-1 text-slate-300">
                    <div>Limit: <span className="font-bold text-white">{formatCurrency(p.minAmount)} - {formatCurrency(p.maxAmount)}</span></div>
                    <div>Tenure: <span className="text-sky-400 font-bold">{p.minTenure} - {p.maxTenure} Months</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Partners */}
        {activeAdminTab === 'partners' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">Partner / Bank / NBFC Information Management</h2>
                <p className="text-xs text-slate-400">Manage participating financial institutions</p>
              </div>
              <button
                onClick={() => setShowAddPartner(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white cursor-pointer shadow-md"
              >
                + Add Partner Bank / NBFC
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((pt) => (
                <div key={pt.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white">
                        {pt.logoText}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{pt.name}</h4>
                        <span className="text-[11px] text-slate-400">{pt.type}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDeletePartner(pt.id)} className="text-xs text-rose-400 hover:text-rose-300">
                      🗑️
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800 text-slate-300">
                    <div>Max LTV: <span className="font-bold text-emerald-400">{pt.maxLtv}</span></div>
                    <div>Approval Rate: <span className="font-bold text-sky-400">{pt.approvalRate}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Customer Profiles & Accounts (Customer Tables) */}
        {activeAdminTab === 'customers' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>👤</span> Customer Profiles & KYC Management
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    Database Layer: Customer Tables
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Borrower profile directory, CIBIL credit scores, KYC status, and linked enquiries</p>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                Total Borrowers: {customers.length}
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 uppercase text-[11px] text-slate-400 border-b border-slate-800 font-bold">
                    <tr>
                      <th className="px-4 py-3.5">Customer ID</th>
                      <th className="px-4 py-3.5">Borrower Name & Location</th>
                      <th className="px-4 py-3.5">Employment & Income</th>
                      <th className="px-4 py-3.5">CIBIL Score</th>
                      <th className="px-4 py-3.5">KYC Verification</th>
                      <th className="px-4 py-3.5">Loan Applications</th>
                      <th className="px-4 py-3.5 text-right">Direct Outreach</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {customers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-indigo-400 font-bold">{cust.id}</td>
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white text-sm">{cust.fullName}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">📞 {cust.phone} • 📍 {cust.city}</div>
                          {cust.email && <div className="text-[10px] text-slate-500">✉️ {cust.email}</div>}
                        </td>
                        <td className="px-4 py-3.5">
                          <div>{cust.employmentType}</div>
                          <div className="text-emerald-400 font-bold">{formatCurrency(cust.monthlyIncome)}/m</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${cust.cibilScore >= 750 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                              cust.cibilScore >= 700 ? 'bg-sky-500/10 text-sky-400 border-sky-500/30' :
                                'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            }`}>
                            {cust.cibilScore} Score
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${cust.kycStatus === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                              'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            }`}>
                            {cust.kycStatus === 'VERIFIED' ? '✔ KYC Verified' : '⏳ Pending KYC'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white">{cust.totalLoansEnquired || 1} Application(s)</div>
                          <div className="text-[11px] text-emerald-400 font-semibold">{formatCurrency(cust.totalAmountEnquired)}</div>
                        </td>
                        <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <a
                            href={`tel:${cust.phone}`}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs inline-flex items-center gap-1"
                            title="Call customer"
                          >
                            📞
                          </a>
                          <a
                            href={`https://wa.me/${cust.phone.replace(/\D/g, '')}?text=Dear%20${encodeURIComponent(cust.fullName)},%20Greetings%20from%20VGS%20Finance.%20How%20can%20we%20assist%20you%20with%20your%20loan%20requirements%20today?`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-300 border border-green-500/30 font-bold text-xs inline-flex items-center gap-1"
                            title="WhatsApp customer"
                          >
                            💬
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: ADMIN TABLES - STAFF & ROLES MANAGEMENT
           ========================================================================= */}
        {activeAdminTab === 'admins' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  🛡️ Administrative Staff & Roles Management
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    admin_users Table
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage executive loan officers, credit underwriting managers, role-based access control (RBAC), and authentication credentials.
                </p>
              </div>
              <button
                onClick={() => setShowAddAdmin(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                + Add Administrative Officer
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-800/80 uppercase text-[11px] text-slate-400 border-b border-slate-800 font-bold">
                    <tr>
                      <th className="px-4 py-3.5">Staff ID</th>
                      <th className="px-4 py-3.5">Officer Name & Contact</th>
                      <th className="px-4 py-3.5">Username</th>
                      <th className="px-4 py-3.5">Assigned Role</th>
                      <th className="px-4 py-3.5">Assigned Permissions</th>
                      <th className="px-4 py-3.5">Account Status</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {adminUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-indigo-400 font-bold">{u.id}</td>
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white text-sm">{u.fullName}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">✉️ {u.email} {u.phone && `• 📞 ${u.phone}`}</div>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-300">{u.username}</td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${u.role === 'SUPER_ADMIN' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                              u.role === 'CREDIT_MANAGER' ? 'bg-sky-500/10 text-sky-400 border-sky-500/30' :
                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {(u.permissions || ['ALL']).map((p, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${u.isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            }`}>
                            {u.isActive ? '✔ Active' : '✕ Suspended'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => handleToggleAdminStatus(u.id, u.isActive)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                          >
                            {u.isActive ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 7: WEBSITE CONTENT TABLES - CMS MANAGEMENT
           ========================================================================= */}
        {activeAdminTab === 'cms' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  📝 Website Content & Corporate Disclosures Management
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    website_content Table
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dynamic administrative control over corporate profile, contact desks, statutory disclaimers, and service settings.
                </p>
              </div>
              {cmsSaveStatus && (
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold animate-pulse">
                  {cmsSaveStatus}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Company Profile */}
              {webContent.company_profile && (
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      🏛️ Corporate Profile & Details
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">key: company_profile</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block font-semibold mb-1">Company Registered Name</label>
                      <input
                        type="text"
                        defaultValue={webContent.company_profile.content?.companyName}
                        onChange={(e) => {
                          webContent.company_profile.content.companyName = e.target.value;
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block font-semibold mb-1">Corporate Tagline</label>
                      <input
                        type="text"
                        defaultValue={webContent.company_profile.content?.tagline}
                        onChange={(e) => {
                          webContent.company_profile.content.tagline = e.target.value;
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block font-semibold mb-1">CIN Number</label>
                        <input
                          type="text"
                          defaultValue={webContent.company_profile.content?.cin}
                          onChange={(e) => {
                            webContent.company_profile.content.cin = e.target.value;
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block font-semibold mb-1">GST Registration</label>
                        <input
                          type="text"
                          defaultValue={webContent.company_profile.content?.gstNumber}
                          onChange={(e) => {
                            webContent.company_profile.content.gstNumber = e.target.value;
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-400 block font-semibold mb-1">Headquarters Address</label>
                      <textarea
                        rows={2}
                        defaultValue={webContent.company_profile.content?.headquarters}
                        onChange={(e) => {
                          webContent.company_profile.content.headquarters = e.target.value;
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSaveWebContent('company_profile', webContent.company_profile.content)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md cursor-pointer"
                  >
                    💾 Save Corporate Profile
                  </button>
                </div>
              )}

              {/* Card 2: Contact Desk */}
              {webContent.contact_desk && (
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      📞 Customer Contact & Advisory Desk
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">key: contact_desk</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block font-semibold mb-1">Hotline / Direct Number</label>
                        <input
                          type="text"
                          defaultValue={webContent.contact_desk.content?.hotline}
                          onChange={(e) => {
                            webContent.contact_desk.content.hotline = e.target.value;
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block font-semibold mb-1">WhatsApp Advisory Desk</label>
                        <input
                          type="text"
                          defaultValue={webContent.contact_desk.content?.whatsappDesk}
                          onChange={(e) => {
                            webContent.contact_desk.content.whatsappDesk = e.target.value;
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block font-semibold mb-1">Customer Support Email</label>
                        <input
                          type="email"
                          defaultValue={webContent.contact_desk.content?.supportEmail}
                          onChange={(e) => {
                            webContent.contact_desk.content.supportEmail = e.target.value;
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block font-semibold mb-1">Grievance / Nodal Email</label>
                        <input
                          type="email"
                          defaultValue={webContent.contact_desk.content?.grievanceEmail}
                          onChange={(e) => {
                            webContent.contact_desk.content.grievanceEmail = e.target.value;
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-400 block font-semibold mb-1">Operating Working Hours</label>
                      <input
                        type="text"
                        defaultValue={webContent.contact_desk.content?.workingHours}
                        onChange={(e) => {
                          webContent.contact_desk.content.workingHours = e.target.value;
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleSaveWebContent('contact_desk', webContent.contact_desk.content)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md cursor-pointer"
                  >
                    💾 Save Contact Desk Info
                  </button>
                </div>
              )}

              {/* Card 3: Regulatory & Indicative Calculations Disclaimer */}
              {webContent.regulatory_disclaimer && (
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl lg:col-span-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      ⚖️ Statutory Regulatory & Indicative Calculations Disclaimer
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">key: regulatory_disclaimer</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block font-semibold mb-1">Mandatory Financial Disclaimer Text</label>
                      <textarea
                        rows={3}
                        defaultValue={webContent.regulatory_disclaimer.content?.disclaimerText}
                        onChange={(e) => {
                          webContent.regulatory_disclaimer.content.disclaimerText = e.target.value;
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block font-semibold mb-1">Lending Facilitator (DSA) Policy Note</label>
                        <textarea
                          rows={2}
                          defaultValue={webContent.regulatory_disclaimer.content?.rbiComplianceNote}
                          onChange={(e) => {
                            webContent.regulatory_disclaimer.content.rbiComplianceNote = e.target.value;
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                        ></textarea>
                      </div>
                      <div>
                        <label className="text-slate-400 block font-semibold mb-1">Data Privacy Statement (DPDP Act)</label>
                        <textarea
                          rows={2}
                          defaultValue={webContent.regulatory_disclaimer.content?.dataPrivacyStatement}
                          onChange={(e) => {
                            webContent.regulatory_disclaimer.content.dataPrivacyStatement = e.target.value;
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSaveWebContent('regulatory_disclaimer', webContent.regulatory_disclaimer.content)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md cursor-pointer"
                  >
                    💾 Save Statutory Disclaimers
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 8: CLOUD / EXTERNAL SERVICES & INTEGRATIONS HUB
           ========================================================================= */}
        {activeAdminTab === 'cloud' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                ☁️ Cloud Infrastructure & External Services Registry
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                  Step 5 Integration Layer
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Overview of VPS Hosting, Nginx Reverse Proxy, OTP / SMS Providers, WhatsApp Business API, SMTP Business Email, and Third-Party Financial Bureau APIs.
              </p>
            </div>

            {/* Cloud Architecture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* 1. VPS / Hosting Server */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xl">🖥️</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ONLINE (Port 5000)
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">VPS / Hosting Server</h3>
                <p className="text-xs text-slate-400">
                  Node.js Express runtime with PM2 cluster support (`ecosystem.config.js`) and Docker container configuration.
                </p>
                <div className="text-[11px] font-mono text-slate-300 bg-slate-800/80 p-2.5 rounded-xl space-y-1">
                  <div>OS: Linux Ubuntu 24.04 LTS / Win</div>
                  <div>Process: PM2 Cluster Engine</div>
                  <div>DB: Multi-Dialect (SQLite / MySQL)</div>
                </div>
              </div>

              {/* 2. Nginx Reverse Proxy */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xl">🛡️</span>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px] font-bold">
                    CONFIGURED
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">Nginx Reverse Proxy</h3>
                <p className="text-xs text-slate-400">
                  Production reverse proxy file (`deploy/nginx.conf`) handling SSL, rate limiting, and SPA routing.
                </p>
                <div className="text-[11px] font-mono text-slate-300 bg-slate-800/80 p-2.5 rounded-xl space-y-1">
                  <div>SSL: Let's Encrypt / Certbot</div>
                  <div>Rate Limit: 30r/m API, 5r/m Leads</div>
                  <div>Headers: HSTS, CSP, X-Frame</div>
                </div>
              </div>

              {/* 3. OTP / SMS Provider */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xl">📱</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ACTIVE GATEWAY
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">OTP / SMS Provider</h3>
                <p className="text-xs text-slate-400">
                  Multi-provider adapter supporting Fast2SMS, MSG91, Twilio, and console simulation for phone verification.
                </p>
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    value={otpTestPhone}
                    onChange={(e) => setOtpTestPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    placeholder="Enter Phone Number"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleTestOtpSend}
                      className="w-1/2 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[11px] font-bold text-white cursor-pointer"
                    >
                      Send OTP
                    </button>
                    <button
                      onClick={handleTestOtpVerify}
                      className="w-1/2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[11px] font-bold text-white cursor-pointer"
                    >
                      Verify OTP
                    </button>
                  </div>
                  {otpSentData && (
                    <div className="text-[10px] bg-slate-800 p-2 rounded-lg text-slate-300">
                      OTP Sent: <span className="text-amber-400 font-bold">{otpSentData.demoOtp || 'Delivered'}</span>
                    </div>
                  )}
                  {otpVerifyResult && (
                    <div className={`text-[10px] p-2 rounded-lg ${otpVerifyResult.success ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                      {otpVerifyResult.message}
                    </div>
                  )}
                </div>
              </div>

              {/* 4. WhatsApp Business API */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xl">💬</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 text-[10px] font-bold">
                    CLOUD API + WA.ME
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">WhatsApp Business API</h3>
                <p className="text-xs text-slate-400">
                  Meta WhatsApp Cloud API v19.0 with transactional templates and 1-click fallback URL generation.
                </p>
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    value={waTestPhone}
                    onChange={(e) => setWaTestPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                  <button
                    onClick={handleTestWhatsApp}
                    className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-500 text-[11px] font-bold text-white cursor-pointer flex items-center justify-center gap-1"
                  >
                    💬 Dispatch WhatsApp Template
                  </button>
                  {waTestResult && (
                    <div className="text-[10px] bg-slate-800 p-2 rounded-lg text-slate-300 space-y-1">
                      <div>Channel: {waTestResult.channel}</div>
                      <a href={waTestResult.directWaUrl} target="_blank" rel="noreferrer" className="text-emerald-400 underline block font-bold">
                        Open WhatsApp Direct Chat ➔
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. SMTP / Business Email */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xl">✉️</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold">
                    SMTP GATEWAY
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">SMTP / Business Email</h3>
                <p className="text-xs text-slate-400">
                  Transactional HTML email dispatcher for borrower loan receipts, sanction letters, and admin alerts.
                </p>
                <div className="space-y-2 pt-1">
                  <input
                    type="email"
                    value={emailTestAddress}
                    onChange={(e) => setEmailTestAddress(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                  <select
                    value={emailTestType}
                    onChange={(e) => setEmailTestType(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="ENQUIRY_ACKNOWLEDGEMENT">Enquiry Acknowledgement</option>
                    <option value="SANCTION_APPROVED">Sanction Letter Approved</option>
                    <option value="ADMIN_LEAD_ALERT">Admin Lead Alert</option>
                  </select>
                  <button
                    onClick={handleTestEmail}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[11px] font-bold text-white cursor-pointer"
                  >
                    ✉️ Dispatch Branded Email
                  </button>
                  {emailTestResult && (
                    <div className="text-[10px] bg-slate-800 p-2 rounded-lg text-emerald-300">
                      Dispatched! ID: {emailTestResult.messageId}
                    </div>
                  )}
                </div>
              </div>

              {/* 6. Third-Party Financial APIs */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xl">🏦</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-bold">
                    BUREAU & KYC READY
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">Third-Party Financial APIs</h3>
                <p className="text-xs text-slate-400">
                  Credit bureau integration (CIBIL/Experian), NSDL PAN card verification, and NPCI penny drop bank account checking.
                </p>
                <div className="space-y-2 pt-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cibilTestPan}
                      onChange={(e) => setCibilTestPan(e.target.value)}
                      placeholder="PAN Number"
                      className="w-2/3 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                    <button
                      onClick={handleTestCibil}
                      className="w-1/3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-[11px] font-bold text-white cursor-pointer"
                    >
                      CIBIL Check
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={panTestNumber}
                      onChange={(e) => setPanTestNumber(e.target.value)}
                      placeholder="Verify PAN"
                      className="w-2/3 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                    <button
                      onClick={handleTestPan}
                      className="w-1/3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-[11px] font-bold text-white cursor-pointer"
                    >
                      Verify PAN
                    </button>
                  </div>
                  {cibilTestResult && (
                    <div className="text-[10px] bg-slate-800 p-2 rounded-lg text-slate-300">
                      Score: <span className="text-emerald-400 font-bold">{cibilTestResult.cibilScore}</span> ({cibilTestResult.riskBand}) • Approval: {cibilTestResult.approvalProbability}
                    </div>
                  )}
                  {panTestResult && (
                    <div className="text-[10px] bg-slate-800 p-2 rounded-lg text-sky-300">
                      PAN Status: {panTestResult.status} ({panTestResult.holderCategory})
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          MODAL: ADD NEW ADMINISTRATIVE OFFICER
         ========================================================================= */}
      {showAddAdmin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">🛡️ Add Administrative Officer</h3>
              <button
                onClick={() => setShowAddAdmin(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Varma"
                  value={newAdminForm.fullName}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, fullName: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block font-semibold mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. officer2"
                    value={newAdminForm.username}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, username: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block font-semibold mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newAdminForm.password}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ramesh.varma@vgsfinance.com"
                  value={newAdminForm.email}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98480 XXXXX"
                    value={newAdminForm.phone}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block font-semibold mb-1">Role</label>
                  <select
                    value={newAdminForm.role}
                    onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                  >
                    <option value="LOAN_OFFICER">Loan Officer</option>
                    <option value="CREDIT_MANAGER">Credit Manager</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddAdmin(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg"
                >
                  Register Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 4 FOLLOW-UP & STATUS MAINTENANCE MODAL
         ========================================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">

            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStageBadgeStyle(selectedLead.status)}`}>
                  Current Stage: {formatStageLabel(selectedLead.status)}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedLead.customerName}</h3>
                <p className="text-xs text-slate-400">ID: {selectedLead.id} • Mobile: {selectedLead.phone}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Outreach Buttons & Bank Routing Trigger */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-wrap gap-2 items-center justify-between text-xs">
              <span className="font-bold text-emerald-300">Contact Borrower:</span>
              <div className="flex gap-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  📞 Call: {selectedLead.phone}
                </a>
                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold"
                  >
                    ✉️ Email
                  </a>
                )}
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=Dear%20${encodeURIComponent(selectedLead.customerName)},%20Greetings%20from%20VGS%20Finance.%20Your%20loan%20enquiry%20(${selectedLead.id})%20for%20${encodeURIComponent(selectedLead.productName)}%20is%20currently%20under%20review.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold inline-flex items-center gap-1"
                >
                  💬 WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    handleOpenBankRoutingModal(selectedLead);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
                >
                  🏦 Route / Manage Bank
                </button>
              </div>
            </div>

            {/* Phase 6: 6-Stage Customer Contact Workflow Stepper */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Phase 6 Workflow Journey:</span>
                <span className="text-emerald-400">
                  {selectedLead.assignedBank && selectedLead.assignedBank !== 'Not Assigned Yet'
                    ? `Routed to ${selectedLead.assignedBank} (${selectedLead.bankProcessStage || 'SUBMITTED'})`
                    : 'Awaiting Bank Routing'}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1 text-center text-[10px] font-bold">
                <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  1. Customer
                </div>
                <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  2. Product
                </div>
                <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  3. Enquiry
                </div>
                <div className={`p-1.5 rounded ${['CONTACTED', 'FOLLOW_UP', 'PROCESSING', 'COMPLETED_CLOSED'].includes(selectedLead.status)
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}>
                  4. Admin
                </div>
                <div className={`p-1.5 rounded ${['FOLLOW_UP', 'PROCESSING', 'COMPLETED_CLOSED'].includes(selectedLead.status)
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}>
                  5. Follow-up
                </div>
                <div className={`p-1.5 rounded ${['PROCESSING', 'COMPLETED_CLOSED'].includes(selectedLead.status) || (selectedLead.bankProcessStage && selectedLead.bankProcessStage !== 'NOT_ROUTED')
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}>
                  6. Institution
                </div>
              </div>
            </div>

            {/* Follow-up remarks history */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Follow-up History & Logged Remarks:
              </div>
              {selectedLead.followUps?.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No previous follow-up remarks recorded.</p>
              ) : (
                selectedLead.followUps.map((fu, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1">
                    <div className="flex justify-between text-slate-400 text-[10px]">
                      <span>Date: {fu.date}</span>
                      {fu.nextDate && <span className="text-amber-400">Next Action: {fu.nextDate}</span>}
                    </div>
                    <p className="text-slate-200">{fu.notes}</p>
                  </div>
                ))
              )}
            </div>

            {/* Form to Maintain Follow-up Information and Status */}
            <form onSubmit={handleAddFollowUp} className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Add Interaction / Call Remarks *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Summarize interaction with customer (e.g. Document verification completed, ready for sanction)..."
                  value={followUpNotes}
                  onChange={(e) => setFollowUpNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Next Follow-up Date</label>
                  <input
                    type="date"
                    value={followUpNextDate}
                    onChange={(e) => setFollowUpNextDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Transition Workflow Stage</label>
                  <select
                    value={followUpNewStatus}
                    onChange={(e) => setFollowUpNewStatus(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-bold"
                  >
                    <option value="NEW_ENQUIRY">1. New Enquiry</option>
                    <option value="CONTACTED">2. Contacted</option>
                    <option value="FOLLOW_UP">3. Follow-up</option>
                    <option value="PROCESSING">4. Processing</option>
                    <option value="COMPLETED_CLOSED">5. Completed / Closed</option>
                    <option value="REJECTED">Closed - Rejected</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md cursor-pointer mt-2"
              >
                + Save Follow-up & Maintain Status
              </button>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 6: FINANCIAL INSTITUTION ROUTING & LOAN PROCESSING MODAL
         ========================================================================= */}
      {showBankRoutingModal && bankRoutingLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-fadeIn">

            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <span>Phase 6 Workflow</span>
                  <span>•</span>
                  <span>Financial Institution Routing Desk</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Route to Lending Bank / NBFC
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Lead: <span className="font-mono text-indigo-400 font-bold">{bankRoutingLead.id}</span> • Customer: <span className="text-white font-bold">{bankRoutingLead.customerName}</span> (📞 {bankRoutingLead.phone})
                </p>
              </div>
              <button
                onClick={() => {
                  setShowBankRoutingModal(false);
                  setBankRoutingLead(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Borrower Snapshot Card */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Loan Scheme</span>
                <span className="font-bold text-sky-400">{bankRoutingLead.productName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Requested Amount</span>
                <span className="font-bold text-emerald-400">{formatCurrency(bankRoutingLead.requestedAmount)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Monthly Income</span>
                <span className="font-bold text-white">{formatCurrency(bankRoutingLead.monthlyIncome)}/m</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Current Pipeline Stage</span>
                <span className="font-bold text-amber-400">{bankRoutingLead.status}</span>
              </div>
            </div>

            {/* Institution Routing Form */}
            <form onSubmit={handleSaveBankRouting} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* 1. Select Partner Bank / NBFC */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Financial Institution / Bank *
                  </label>
                  <select
                    value={bankRoutingForm.assignedBank}
                    onChange={(e) => {
                      const selBankName = e.target.value;
                      const matched = partners.find(p => p.name === selBankName);
                      const partnerCode = matched?.code || 'BNK';
                      setBankRoutingForm({
                        ...bankRoutingForm,
                        assignedBank: selBankName,
                        partnerBankId: matched?.id || null,
                        bankApplicationNo: `${partnerCode}-${bankRoutingLead.id.replace('LD-', '')}-${Date.now().toString().slice(-4)}`
                      });
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-bold"
                  >
                    {partners.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.type} - Max LTV: {p.maxLtv})
                      </option>
                    ))}
                    <option value="HDFC Bank">HDFC Bank (Private Bank)</option>
                    <option value="State Bank of India">State Bank of India (Public Sector)</option>
                    <option value="ICICI Bank">ICICI Bank (Private Bank)</option>
                    <option value="Bajaj Finserv">Bajaj Finserv (NBFC)</option>
                    <option value="Tata Capital">Tata Capital (NBFC)</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank (Private Bank)</option>
                  </select>
                </div>

                {/* 2. Partner Bank Application Reference */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bank Application Reference Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={bankRoutingForm.bankApplicationNo}
                    onChange={(e) => setBankRoutingForm({ ...bankRoutingForm, bankApplicationNo: e.target.value })}
                    placeholder="e.g. HDFC-PL-2026-9041"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* 3. Bank Process Stage */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Applicable Bank Loan Process Stage *
                  </label>
                  <select
                    value={bankRoutingForm.bankProcessStage}
                    onChange={(e) => setBankRoutingForm({ ...bankRoutingForm, bankProcessStage: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-bold"
                  >
                    <option value="SUBMITTED_TO_BANK">1. Lodged with Financial Institution (Submitted)</option>
                    <option value="DOC_VERIFICATION">2. Document Verification & Credit Underwriting</option>
                    <option value="SANCTION_APPROVED">3. Sanction Letter Approved by Institution</option>
                    <option value="DISBURSED">4. Disbursed to Borrower Bank Account ✔</option>
                    <option value="REJECTED">5. Terminated / Rejected by Bank</option>
                  </select>
                </div>

                {/* 4. Sync Lead Pipeline Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Update Lead Pipeline Status
                  </label>
                  <select
                    value={bankRoutingForm.updateStatus}
                    onChange={(e) => setBankRoutingForm({ ...bankRoutingForm, updateStatus: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-bold"
                  >
                    <option value="PROCESSING">Keep in Processing (Stage 4)</option>
                    <option value="COMPLETED_CLOSED">Completed / Closed (Stage 5 - Disbursed)</option>
                    <option value="FOLLOW_UP">Follow-up Required (Stage 3)</option>
                    <option value="REJECTED">Closed - Rejected</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* 5. Sanctioned Amount */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sanctioned / Approved Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={bankRoutingForm.sanctionedAmount}
                    onChange={(e) => setBankRoutingForm({ ...bankRoutingForm, sanctionedAmount: e.target.value })}
                    placeholder="e.g. 500000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* 6. Sanctioned Interest Rate */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Approved Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={bankRoutingForm.sanctionedRate}
                    onChange={(e) => setBankRoutingForm({ ...bankRoutingForm, sanctionedRate: e.target.value })}
                    placeholder="e.g. 10.75"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

              </div>

              {/* 7. Underwriting / Bank Remarks */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bank Underwriting & Processing Remarks
                </label>
                <textarea
                  rows={2}
                  value={bankRoutingForm.bankRemarks}
                  onChange={(e) => setBankRoutingForm({ ...bankRoutingForm, bankRemarks: e.target.value })}
                  placeholder="Enter notes from the bank loan manager, sanction terms, conditions precedent, or disbursement details..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                ></textarea>
              </div>

              {/* Statutory Indicative Notice */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2">
                <span className="text-xs mt-0.5">⚠️</span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
                </p>
              </div>

              <div className="flex gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowBankRoutingModal(false)}
                  className="w-1/3 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  ✔ Confirm Routing to {bankRoutingForm.assignedBank}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
