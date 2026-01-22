// Vercel Serverless Function für Resend E-Mail
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, confirmLink } = req.body;

  if (!to || !confirmLink) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = 're_A6fcesYK_EfBFQb5qKSZUXbgZwYouCJ6r';

  const emailHTML = `
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
                © 2025 S&I.
              </p>
            </td>
          </tr>
          
          <!-- Unsubscribe Note -->
          <tr>
            <td align="center" style="padding-top: 40px;">
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; line-height: 1.6; color: #CCCCCC;">
                Du hast dich nicht angemeldet?<br>
                Ignoriere diese E-Mail einfach.
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

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'S&I. Wedding <onboarding@resend.dev>',
        to: [to],
        subject: 'Bitte bestätige deine Anmeldung – S&I.',
        html: emailHTML,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, error: data });
    }
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
