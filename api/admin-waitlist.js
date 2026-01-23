// Vercel Serverless Function für Admin Waitlist Zugriff
// Verwendet Supabase Service Role Key für RLS-Bypass

export default async function handler(req, res) {
  // CORS für Admin
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Admin-Authentifizierung prüfen
  const { adminEmail, adminPassword, action, entryId, updates } = req.body;
  
  // Server-side credentials (NICHT mit REACT_APP_ prefix!)
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin credentials not configured' });
  }
  
  if (adminEmail !== ADMIN_EMAIL || adminPassword !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Supabase mit Service Role Key (bypassed RLS)
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!SUPABASE_SERVICE_KEY) {
    // Fallback auf ANON Key wenn Service Key nicht gesetzt
    // WARNUNG: Das ist weniger sicher!
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set, using ANON key');
  }
  
  const supabaseKey = SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

  try {
    const headers = {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };

    // GET - Alle Waitlist Einträge
    if (action === 'getAll') {
      // Optional: nur bestätigte oder alle
      const confirmedOnly = req.body.confirmedOnly !== false; // Default: true
      let url = `${SUPABASE_URL}/rest/v1/waitlist?select=*&order=created_at.desc`;
      if (confirmedOnly) {
        url += '&confirmed=eq.true';
      }
      
      const response = await fetch(url, { headers });
      const data = await response.json();
      return res.status(200).json({ success: true, data });
    }

    // UPDATE - Eintrag aktualisieren
    if (action === 'update' && entryId && updates) {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/waitlist?id=eq.${entryId}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify(updates)
        }
      );
      const data = await response.json();
      return res.status(200).json({ success: true, data });
    }

    // DELETE - Eintrag löschen
    if (action === 'delete' && entryId) {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/waitlist?id=eq.${entryId}`,
        {
          method: 'DELETE',
          headers
        }
      );
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'Invalid action' });

  } catch (error) {
    console.error('Admin API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
