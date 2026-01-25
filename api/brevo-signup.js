// Vercel Serverless Function - Brevo Waitlist Signup
// Erstellt Kontakt + sendet Double Opt-In E-Mail

export default async function handler(req, res) {
  // CORS
  const allowedOrigins = [
    'https://siwedding.de',
    'https://www.siwedding.de',
    'https://si-comming-soon.vercel.app',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, themePreference } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Gültige E-Mail erforderlich' });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY not configured');
    return res.status(500).json({ error: 'E-Mail Service nicht konfiguriert' });
  }

  const emailLower = email.toLowerCase();
  const confirmToken = Buffer.from(`${emailLower}:${Date.now()}`).toString('base64');
  const confirmLink = `https://siwedding.de/confirm?token=${encodeURIComponent(confirmToken)}&email=${encodeURIComponent(emailLower)}`;
  const unsubscribeLink = `https://siwedding.de/unsubscribe?email=${encodeURIComponent(emailLower)}`;

  try {
    // 1. Prüfen ob Kontakt bereits existiert
    const checkResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(emailLower)}`, {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (checkResponse.ok) {
      // Kontakt existiert bereits
      const existingContact = await checkResponse.json();
      const status = existingContact.attributes?.WAITLIST_STATUS;
      
      if (status === 'confirmed') {
        return res.status(400).json({ 
          error: 'Diese E-Mail-Adresse ist bereits auf der Warteliste.' 
        });
      } else if (status === 'pending') {
        // Noch nicht bestätigt - neue Opt-In Mail senden
        const emailHTML = generateOptInEmail(confirmLink, unsubscribeLink);
        
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': BREVO_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: 'S&I. Wedding', email: 'wedding@sarahiver.de' },
            replyTo: { email: 'wedding@sarahiver.de' },
            to: [{ email: emailLower }],
            subject: 'Bitte bestätige deine Anmeldung – S&I.',
            htmlContent: emailHTML,
          }),
        });
        
        return res.status(200).json({ 
          success: true, 
          message: 'Neue Bestätigungsmail gesendet' 
        });
      } else if (status === 'unsubscribed') {
        return res.status(400).json({ 
          error: 'Diese E-Mail-Adresse wurde abgemeldet. Bitte kontaktiere uns, wenn du dich erneut anmelden möchtest.' 
        });
      }
    }

    // 2. Neuen Kontakt in Brevo erstellen
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailLower,
        attributes: {
          WAITLIST_STATUS: 'pending',
          THEME_PREFERENCE: themePreference || 'video',
          SIGNUP_DATE: new Date().toISOString().split('T')[0],
          CONFIRM_TOKEN: confirmToken,
        },
      }),
    });

    if (!contactResponse.ok && contactResponse.status !== 201) {
      const error = await contactResponse.json();
      console.error('Brevo contact error:', error);
      return res.status(500).json({ error: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.' });
    }

    // 3. Double Opt-In E-Mail senden
    const emailHTML = generateOptInEmail(confirmLink, unsubscribeLink);
    
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'S&I. Wedding',
          email: 'wedding@sarahiver.de',
        },
        replyTo: {
          email: 'wedding@sarahiver.de',
        },
        to: [{ email: emailLower }],
        subject: 'Bitte bestätige deine Anmeldung – S&I.',
        htmlContent: emailHTML,
      }),
    });

    if (emailResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Bestätigungsmail gesendet' 
      });
    } else {
      const error = await emailResponse.json();
      console.error('Brevo email error:', error);
      return res.status(400).json({ 
        success: false, 
        error: 'E-Mail konnte nicht gesendet werden' 
      });
    }
  } catch (error) {
    console.error('Brevo API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Ein Fehler ist aufgetreten' 
    });
  }
}

// E-Mail Template
function generateOptInEmail(confirmLink, unsubscribeLink) {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #FFFFFF; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FFFFFF;">
    <tr>
      <td align="center" style="padding: 60px 20px;">
        <table role="presentation" width="550" cellspacing="0" cellpadding="0" border="0" style="max-width: 550px;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 50px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color: #000000; padding: 10px 18px;">
                    <span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: -1px; color: #FFFFFF;">S&I.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td align="center" style="padding-bottom: 50px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="width: 60px; height: 1px; background-color: #E5E5E5;"></td>
                  <td style="padding: 0 15px; font-size: 12px; color: #CCCCCC;">✦</td>
                  <td style="width: 60px; height: 1px; background-color: #E5E5E5;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Headline -->
          <tr>
            <td align="center" style="padding-bottom: 35px;">
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 32px; font-weight: 400; font-style: italic; color: #1A1A1A; line-height: 1.3;">
                Nur noch ein Schritt
              </h1>
            </td>
          </tr>
          
          <!-- Body Text -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 400; line-height: 1.8; color: #666666; max-width: 420px;">
                Vielen Dank für dein Interesse an S&I. Wedding Websites.
              </p>
            </td>
          </tr>
          
          <tr>
            <td align="center" style="padding-bottom: 40px;">
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 400; line-height: 1.8; color: #666666; max-width: 420px;">
                Um deine Anmeldung zur Warteliste abzuschließen, bestätige bitte deine E-Mail-Adresse.
              </p>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding-bottom: 45px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border: 1px solid #1A1A1A;">
                    <a href="${confirmLink}" target="_blank" style="display: inline-block; padding: 16px 45px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 2px; color: #1A1A1A; text-decoration: none; text-transform: uppercase;">
                      Bestätigen
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td align="center" style="padding-bottom: 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="width: 40px; height: 1px; background-color: #E5E5E5;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Rabatt Info -->
          <tr>
            <td align="center" style="padding-bottom: 45px;">
              <p style="margin: 0 0 8px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 2px; color: #999999; text-transform: uppercase;">
                Dein Vorteil
              </p>
              <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 18px; font-style: italic; color: #1A1A1A;">
                Exklusiver Rabatt zum Launch
              </p>
            </td>
          </tr>
          
          <!-- Fallback Link -->
          <tr>
            <td align="center" style="padding-bottom: 50px;">
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.7; color: #AAAAAA;">
                Falls der Button nicht funktioniert:<br>
                <a href="${confirmLink}" style="color: #999999; word-break: break-all;">${confirmLink}</a>
              </p>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td align="center" style="padding-bottom: 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="width: 60px; height: 1px; background-color: #E5E5E5;"></td>
                  <td style="padding: 0 15px; font-size: 12px; color: #CCCCCC;">✦</td>
                  <td style="width: 60px; height: 1px; background-color: #E5E5E5;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Signature -->
          <tr>
            <td align="center" style="padding-bottom: 8px;">
              <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-style: italic; color: #1A1A1A;">
                Sarah & Iver
              </p>
            </td>
          </tr>
          
          <tr>
            <td align="center" style="padding-bottom: 50px;">
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 2px; color: #AAAAAA; text-transform: uppercase;">
                Gründer von S&I.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center">
              <p style="margin: 0 0 10px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #CCCCCC;">
                <a href="mailto:wedding@sarahiver.de" style="color: #999999; text-decoration: none;">wedding@sarahiver.de</a>
              </p>
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #CCCCCC;">
                © 2026 S&I.
              </p>
            </td>
          </tr>
          
          <!-- Opt-Out Note -->
          <tr>
            <td align="center" style="padding-top: 40px;">
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; line-height: 1.6; color: #CCCCCC;">
                Du hast dich nicht angemeldet?<br>
                <a href="${unsubscribeLink}" style="color: #999999; text-decoration: underline;">Von der Warteliste entfernen</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
