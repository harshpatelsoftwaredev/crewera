const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.log('⚠️  Email service not configured:', error.message);
  } else {
    console.log('✅ Email service ready');
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    console.log('📧 Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    return { success: false, error: error.message };
  }
};

// ── Email Templates ──────────────────────────────────────────

const emailTemplates = {
  verification: (name, token) => ({
    subject: 'Verify Your Email — Crewera Reality',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f8f9fa;border-radius:10px">
        <div style="background:#0d2a5c;padding:20px;border-radius:10px 10px 0 0;text-align:center">
          <h1 style="color:#fff;margin:0">Crewera Reality</h1>
        </div>
        <div style="background:#fff;padding:30px;border-radius:0 0 10px 10px">
          <h2 style="color:#0d2a5c">Welcome, ${name}!</h2>
          <p>Please verify your email address by clicking the button below:</p>
          <div style="text-align:center;margin:30px 0">
            <a href="${process.env.CLIENT_URL}/verify-email?token=${token}" 
               style="background:#e53935;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">
              Verify Email
            </a>
          </div>
          <p style="color:#666;font-size:12px">Or copy this link: ${process.env.API_URL}/api/auth/verify-email?token=${token}</p>
          <p style="color:#666;font-size:12px">This link expires in 24 hours.</p>
        </div>
      </div>`,
  }),

  resetPassword: (name, token) => ({
    subject: 'Reset Your Password — Crewera Reality',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f8f9fa;border-radius:10px">
        <div style="background:#0d2a5c;padding:20px;border-radius:10px 10px 0 0;text-align:center">
          <h1 style="color:#fff;margin:0">Crewera Reality</h1>
        </div>
        <div style="background:#fff;padding:30px;border-radius:0 0 10px 10px">
          <h2 style="color:#0d2a5c">Password Reset Request</h2>
          <p>Hi ${name}, we received a request to reset your password.</p>
          <div style="text-align:center;margin:30px 0">
            <a href="${process.env.CLIENT_URL}/reset-password?token=${token}" 
               style="background:#e53935;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">
              Reset Password
            </a>
          </div>
          <p style="color:#666;font-size:12px">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        </div>
      </div>`,
  }),

  requestApproved: (name, projectName) => ({
    subject: 'Property Request Approved! — Crewera Reality',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f8f9fa;border-radius:10px">
        <div style="background:#0d2a5c;padding:20px;border-radius:10px 10px 0 0;text-align:center">
          <h1 style="color:#fff;margin:0">Crewera Reality</h1>
        </div>
        <div style="background:#fff;padding:30px;border-radius:0 0 10px 10px">
          <h2 style="color:#2e7d32">🎉 Great News, ${name}!</h2>
          <p>Your property request for <strong>${projectName}</strong> has been <span style="color:#2e7d32;font-weight:bold">APPROVED</span>.</p>
          <p>Please complete the full property details to proceed with listing.</p>
          <div style="text-align:center;margin:30px 0">
            <a href="${process.env.CLIENT_URL}/property-requests" 
               style="background:#2e7d32;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">
              Complete Details
            </a>
          </div>
        </div>
      </div>`,
  }),

  requestRejected: (name, projectName, reason) => ({
    subject: 'Property Request Update — Crewera Reality',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f8f9fa;border-radius:10px">
        <div style="background:#0d2a5c;padding:20px;border-radius:10px 10px 0 0;text-align:center">
          <h1 style="color:#fff;margin:0">Crewera Reality</h1>
        </div>
        <div style="background:#fff;padding:30px;border-radius:0 0 10px 10px">
          <h2 style="color:#e53935">Request Update</h2>
          <p>Hi ${name}, your property request for <strong>${projectName}</strong> was not approved at this time.</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>You can modify and resubmit your request.</p>
        </div>
      </div>`,
  }),

  inquiryReceived: (propertyName, senderName, senderEmail, message) => ({
    subject: `New Inquiry for ${propertyName} — Crewera Reality`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f8f9fa;border-radius:10px">
        <div style="background:#0d2a5c;padding:20px;border-radius:10px 10px 0 0;text-align:center">
          <h1 style="color:#fff;margin:0">New Inquiry</h1>
        </div>
        <div style="background:#fff;padding:30px;border-radius:0 0 10px 10px">
          <p><strong>Property:</strong> ${propertyName}</p>
          <p><strong>From:</strong> ${senderName} (${senderEmail})</p>
          <p><strong>Message:</strong></p>
          <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin:10px 0">${message}</div>
        </div>
      </div>`,
  }),

  notification: (name, title, body) => ({
    subject: `${title} — Crewera Reality`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f8f9fa;border-radius:10px">
        <div style="background:#0d2a5c;padding:20px;border-radius:10px 10px 0 0;text-align:center">
          <h1 style="color:#fff;margin:0">Crewera Reality</h1>
        </div>
        <div style="background:#fff;padding:30px;border-radius:0 0 10px 10px">
          <h2 style="color:#0d2a5c">${title}</h2>
          <p>Hi ${name},</p>
          <p>${body}</p>
        </div>
      </div>`,
  }),
};

module.exports = { sendEmail, emailTemplates };
