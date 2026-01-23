# S&I. Weddings — Coming Soon

Premium Coming Soon Seite im Contemporary Design.

## Features

- **Hero**: Split-Layout mit animierten geometrischen Elementen
- **Countdown**: "TIME IS TICKING" mit horizontalem Layout → 01.10.2026
- **USPs**: 10 nummerierte Feature-Karten mit Hover-Animationen
- **About**: "WE ARE SARAH & IVER" mit Werte-Karten
- **Waitlist**: Großer CTA mit Supabase-Integration
- **Footer**: Social Links (Instagram, Pinterest) + Impressum Modal

## Installation

```bash
npm install
npm start
```

## Supabase Setup

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  theme_preference VARCHAR(50) DEFAULT 'contemporary',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT WITH CHECK (true);
```

## Environment Variables

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

## Vercel Deployment

1. Push zu GitHub
2. Vercel → Import Repository
3. Environment Variables hinzufügen
4. Deploy

### Custom Domain (siwedding.de)

In Vercel: Settings → Domains → siwedding.de hinzufügen

Bei Strato DNS:
- A Record: @ → 76.76.21.21
- CNAME: www → cname.vercel-dns.com

## Design

- **Font**: Space Grotesk
- **Colors**: 
  - Primary: #0D0D0D (Schwarz)
  - Accent: #FF6B6B (Coral)
  - Accent 2: #4ECDC4 (Teal)
  - Accent 3: #FFE66D (Gelb)

## Social Links

- Instagram: @sarah.iver.wedding
- Pinterest: S&I.

---
© 2026 S&I. Weddings
