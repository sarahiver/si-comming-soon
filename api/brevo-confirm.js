// Vercel Serverless Function - Brevo Confirm
// Bestätigt Kontakt in Brevo (Double Opt-In)

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
    // 1. Kontakt holen um aktuellen Status zu prüfen
    const getResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(emailLower)}`, {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!getResponse.ok) {
      if (getResponse.status === 404) {
        return res.status(404).json({ 
          success: false, 
          error: 'E-Mail nicht gefunden' 
        });
      }
      throw new Error('Kontakt konnte nicht geladen werden');
    }

    const contact = await getResponse.json();
    
    // Bereits bestätigt?
    if (contact.attributes?.WAITLIST_STATUS === 'confirmed') {
      return res.status(200).json({ 
        success: true, 
        alreadyConfirmed: true 
      });
    }

    // 2. Kontakt als bestätigt markieren
    const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(emailLower)}`, {
      method: 'PUT',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attributes: {
          WAITLIST_STATUS: 'confirmed',
          CONFIRMED_DATE: new Date().toISOString().split('T')[0],
        },
      }),
    });

    if (updateResponse.ok || updateResponse.status === 204) {
      return res.status(200).json({ 
        success: true, 
        alreadyConfirmed: false 
      });
    } else {
      const error = await updateResponse.json();
      console.error('Brevo update error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Bestätigung fehlgeschlagen' 
      });
    }
  } catch (error) {
    console.error('Brevo confirm error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Ein Fehler ist aufgetreten' 
    });
  }
}
