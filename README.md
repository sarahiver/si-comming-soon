# S&I. Weddings - Coming Soon Page

Premium Coming Soon Seite mit 6 verschiedenen Themes.

## Themes

| Theme | Stil |
|-------|------|
| **Editorial** | Minimalistisch, Magazine |
| **Gold** | Luxuriös, Gold Shimmer |
| **Botanical** | Natürlich, Kreise |
| **Contemporary** | Bold, Playful |
| **Luxe** | Raffiniert, Grid |
| **Neon** | Cyberpunk, Glow |

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
  theme_preference VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT WITH CHECK (true);
```

## Vercel Deployment

1. Push zu GitHub
2. Vercel Import
3. Environment Variables:
   - REACT_APP_SUPABASE_URL
   - REACT_APP_SUPABASE_ANON_KEY

© 2026 S&I. Weddings
