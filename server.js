const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/contact', async (req, res) => {
  try {
    const { fname, lname, email, company, service, budget, timeline, subject, message } = req.body;

    if (!fname || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'fname, email, subject, and message are required' });
    }

    const fullName = `${fname}${lname ? ' ' + lname : ''}`;

    const now = new Date();
    const dateTimeStr = now.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) + ' at ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });

    const fields = [
      { icon: '👤', label: 'Name', value: fullName },
      { icon: '📧', label: 'Email', value: email, isEmail: true },
      ...(company ? [{ icon: '🏢', label: 'Company', value: company }] : []),
      ...(service ? [{ icon: '💻', label: 'Service Needed', value: service }] : []),
      ...(budget ? [{ icon: '💰', label: 'Budget', value: budget }] : []),
      ...(timeline ? [{ icon: '⏳', label: 'Timeline', value: timeline }] : []),
      { icon: '📝', label: 'Subject', value: subject },
    ];

    const fieldsHtml = fields.map(f => `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:12px;margin-bottom:10px;" class="field-card">
                <tr>
                  <td style="padding:16px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="top" style="font-size:18px;padding-right:12px;width:24px;line-height:1.4;font-family:'Segoe UI','Inter',Arial,sans-serif;">${f.icon}</td>
                        <td>
                          <p style="margin:0 0 2px;font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="field-label">${f.label}</p>
                          ${f.isEmail ? `<p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="field-value"><a href="mailto:${f.value}" style="color:#3b82f6;text-decoration:none;">${f.value}</a></p>` : `<p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="field-value">${f.value}</p>`}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
    `).join('');

    const portfolioUrl = process.env.PORTFOLIO_URL || 'https://hajiz.dev';
    const msgHtml = message.replace(/\n/g, '<br>');

    const emailBody = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>New Portfolio Inquiry</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style>
    table { border-collapse: collapse; }
    td { font-family: 'Segoe UI', Arial, sans-serif; }
  </style>
  <![endif]-->
  <style>
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: #0f172a !important; }
      .email-card { background-color: #1e293b !important; }
      .email-header { background-color: #020617 !important; }
      .field-card { background-color: #0f172a !important; }
      .msg-box { background-color: #0f172a !important; }
      .email-body-td, h1, .field-value, .header-sub, .footer-text { color: #e2e8f0 !important; }
      .field-label { color: #64748b !important; }
      .email-hr { border-color: #334155 !important; }
      .btn-secondary-td { border-color: #334155 !important; }
      .btn-secondary-a { color: #e2e8f0 !important; }
    }
    @media only screen and (max-width: 520px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .email-pad { padding-left: 20px !important; padding-right: 20px !important; }
      .header-pad { padding-left: 20px !important; padding-right: 20px !important; }
      .header-date { display: block !important; margin-top: 6px !important; font-size: 12px !important; }
      .btn-wrap { display: block !important; width: 100% !important; }
      .btn-table { width: 100% !important; margin-bottom: 10px !important; }
      .btn-table a { width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI','Inter',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
  <!--[if mso]>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;"><tr><td align="center">
  <![endif]-->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;" class="email-bg">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <!--[if mso]>
        <table role="presentation" width="650" cellpadding="0" cellspacing="0"><tr><td>
        <![endif]-->
        <div class="email-container" style="max-width:650px;margin:0 auto;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.08);" class="email-card">
            <!-- Header -->
            <tr>
              <td style="background-color:#111827;padding:28px 36px;" class="email-header header-pad">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color:#ffffff;font-size:18px;font-weight:700;font-family:'Segoe UI','Inter',Arial,sans-serif;">🏗️ Hajiz Portfolio</td>
                    <td align="right" style="color:#94a3b8;font-size:13px;font-weight:400;white-space:nowrap;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="header-date">${dateTimeStr}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:40px 36px 8px;" class="email-pad">
                <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0f172a;font-family:'Segoe UI','Inter',Arial,sans-serif;">💼 New Portfolio Inquiry</h1>
                <p style="margin:0 0 32px;font-size:15px;color:#64748b;line-height:1.6;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="header-sub">Someone has submitted your contact form. Here are the details:</p>
                ${fieldsHtml}
                <!-- Message -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:16px;margin-bottom:10px;" class="msg-box">
                  <tr>
                    <td style="padding:20px 24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td valign="top" style="font-size:18px;padding-right:12px;width:24px;line-height:1.4;font-family:'Segoe UI','Inter',Arial,sans-serif;">💬</td>
                          <td>
                            <p style="margin:0 0 8px;font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="field-label">Message</p>
                            <p style="margin:0;font-size:15px;color:#0f172a;line-height:1.7;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="field-value">${msgHtml}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- Actions -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:36px 0 0;">
                  <tr>
                    <td style="padding-right:8px;" align="center" class="btn-wrap">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-block;" class="btn-table">
                        <tr>
                          <td align="center" style="background-color:#3b82f6;border-radius:12px;mso-padding-alt:14px 32px;">
                            <a href="mailto:${email}?subject=${encodeURIComponent('Re: ' + subject)}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;font-family:'Segoe UI','Inter',Arial,sans-serif;border-radius:12px;mso-line-height-rule:exactly;line-height:22px;">🔵 Reply to Client</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="padding-left:8px;" align="center" class="btn-wrap">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-block;" class="btn-table">
                        <tr>
                          <td align="center" style="background-color:transparent;border:2px solid #e2e8f0;border-radius:12px;mso-padding-alt:12px 30px;" class="btn-secondary-td">
                            <a href="${portfolioUrl}" style="display:inline-block;padding:12px 30px;font-size:15px;font-weight:600;color:#0f172a;text-decoration:none;font-family:'Segoe UI','Inter',Arial,sans-serif;border-radius:12px;mso-line-height-rule:exactly;line-height:22px;" class="btn-secondary-a">⚪ View Portfolio</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:32px 36px 36px;" class="email-pad">
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 20px;" class="email-hr">
                <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;line-height:1.5;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="footer-text">This email was automatically generated from your Portfolio Contact Form.</p>
                <p style="margin:0;font-size:12px;color:#94a3b8;font-family:'Segoe UI','Inter',Arial,sans-serif;" class="footer-text">&copy; 2026 Hajiz Portfolio. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </div>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
  <!--[if mso]>
  </td></tr></table>
  <![endif]-->
</body>
</html>`;

    const apiKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.RECIPIENT_EMAIL;

    if (!apiKey || !recipientEmail) {
      console.error('Missing BREVO_API_KEY or RECIPIENT_EMAIL environment variables');
      return res.status(500).json({ success: false, error: 'Contact form is not configured. Please try again later.' });
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Portfolio', email: recipientEmail },
        to: [{ email: recipientEmail, name: process.env.RECIPIENT_NAME || 'Hajiz Ali' }],
        subject: `Portfolio Contact from ${fullName}: ${subject}`,
        htmlContent: emailBody,
        replyTo: { name: fullName, email: email },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo API error:', data);
      return res.status(500).json({ success: false, error: data.message || 'Failed to send email' });
    }

    console.log('Brevo API success:', data);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
