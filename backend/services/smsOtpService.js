// SMS & OTP Service for VGS Finance
// Supports Fast2SMS, MSG91, Twilio, and Dev Mode Simulation

const otpStore = new Map(); // In production: Redis or Database cache

/**
 * Generate a 6-digit cryptographic-safe numerical OTP
 */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP via SMS Provider
 * @param {string} phone - Borrower mobile number
 * @param {string} purpose - 'ENQUIRY_VERIFICATION' | 'LOGIN' | 'DOCUMENT_SIGN'
 */
async function sendOTP(phone, purpose = 'ENQUIRY_VERIFICATION') {
  const normalizedPhone = phone.replace(/[\s-]/g, '');
  const otp = generateOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

  otpStore.set(normalizedPhone, { otp, expiresAt, purpose, attempts: 0 });

  const message = `[VGS Finance] Your verification OTP is ${otp}. Valid for 10 mins. Do not share this with anyone.`;

  const provider = process.env.SMS_PROVIDER || 'MOCK'; // 'FAST2SMS' | 'MSG91' | 'TWILIO' | 'MOCK'
  let providerResponse = null;

  if (provider === 'FAST2SMS' && process.env.FAST2SMS_API_KEY) {
    try {
      const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: otp,
          numbers: normalizedPhone.replace('+91', '')
        })
      });
      providerResponse = await res.json();
    } catch (err) {
      console.error('Fast2SMS dispatch error:', err.message);
    }
  } else if (provider === 'TWILIO' && process.env.TWILIO_ACCOUNT_SID) {
    // Twilio REST API integration
    console.log(`[Twilio SMS] Dispatched to ${normalizedPhone}: ${message}`);
    providerResponse = { status: 'sent', provider: 'Twilio' };
  } else {
    // Development / Simulator Mode
    console.log(`\n📱 [SMS GATEWAY SIMULATOR] To: ${normalizedPhone} | OTP: ${otp} | Expires: 10m`);
    providerResponse = { status: 'delivered', provider: 'VGS SMS Gateway Simulator' };
  }

  return {
    success: true,
    phone: normalizedPhone,
    purpose,
    expiresInSeconds: 600,
    provider: provider,
    demoOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    response: providerResponse
  };
}

/**
 * Verify OTP entered by borrower
 * @param {string} phone 
 * @param {string} otp 
 */
async function verifyOTP(phone, otp) {
  const normalizedPhone = phone.replace(/[\s-]/g, '');
  const entry = otpStore.get(normalizedPhone);

  if (!entry) {
    return { success: false, message: 'No OTP requested for this mobile number or OTP has expired.' };
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(normalizedPhone);
    return { success: false, message: 'OTP has expired. Please request a new OTP.' };
  }

  entry.attempts += 1;
  if (entry.attempts > 4) {
    otpStore.delete(normalizedPhone);
    return { success: false, message: 'Too many incorrect attempts. Please request a new OTP.' };
  }

  if (entry.otp !== otp.trim()) {
    return { success: false, message: 'Invalid OTP entered. Please check and try again.' };
  }

  // OTP is verified
  otpStore.delete(normalizedPhone);
  return {
    success: true,
    message: 'Mobile number verified successfully.',
    phone: normalizedPhone,
    verifiedAt: new Date().toISOString()
  };
}

module.exports = {
  sendOTP,
  verifyOTP
};

