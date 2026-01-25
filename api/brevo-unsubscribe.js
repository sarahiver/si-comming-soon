// Vercel Serverless Function - Brevo Unsubscribe
// Entfernt Kontakt von der Waitlist

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

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-Mail erforderlich' });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    return res.status(500).json({ error: 'API nicht konfiguriert' });
  }

  const emailLower = email.toLowerCase();

  try {
    // Prüfen ob Kontakt existiert
    const checkResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(emailLower)}`, {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!checkResponse.ok) {
      if (checkResponse.status === 404) {
        return res.status(200).json({ 
          success: true, 
          message: 'E-Mail nicht in der Liste' 
        });
      }
      throw new Error('Kontakt konnte nicht geladen werden');
    }

    // Kontakt als abgemeldet markieren
    const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(emailLower)}`, {
      method: 'PUT',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attributes: {
          WAITLIST_STATUS: 'unsubscribed',
          UNSUBSCRIBE_DATE: new Date().toISOString().split('T')[0],
        },
        emailBlacklisted: true, // Blockiert zukünftige Marketing-Mails
      }),
    });

    if (updateResponse.ok || updateResponse.status === 204) {
      return res.status(200).json({ 
        success: true, 
        message: 'Erfolgreich abgemeldet' 
      });
    } else {
      const error = await updateResponse.json();
      console.error('Brevo unsubscribe error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Abmeldung fehlgeschlagen' 
      });
    }
  } catch (error) {
    console.error('Brevo unsubscribe error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Ein Fehler ist aufgetreten' 
    });
  }
}
