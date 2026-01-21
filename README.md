# S&I. Weddings - Coming Soon Page

Eine Premium Coming Soon Seite mit 6 verschiedenen Themes und Supabase Waitlist-Integration.

## 🚀 Quick Start

```bash
npm install
npm start
```

## 📦 Tech Stack

- **React** (create-react-app)
- **styled-components** - CSS-in-JS Styling
- **Supabase** - Waitlist Datenbank
- **Cloudinary** - Bildoptimierung (optional)

## 🎨 Themes

| Theme | Stil |
|-------|------|
| **Neon** | Cyberpunk mit Neon-Effekten |
| **Luxe** | Eleganter Gold-Shimmer |
| **Botanical** | Organisch & Natürlich |
| **Editorial** | Magazin-Layout |
| **Contemporary** | Modern & Clean |
| **Gold** | Opulent & Königlich |

## ⚙️ Umgebungsvariablen

Erstelle eine `.env` Datei (siehe `.env.example`):

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## 🗄️ Supabase Setup

1. Erstelle ein Supabase Projekt auf [supabase.com](https://supabase.com)
2. Führe dieses SQL im SQL Editor aus:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  theme_preference VARCHAR(50) DEFAULT 'luxe',
  source VARCHAR(100) DEFAULT 'coming-soon-page',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- Row Level Security aktivieren
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy für anonyme Inserts
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT WITH CHECK (true);
```

3. Kopiere URL und Anon Key aus Project Settings → API

## 🚢 Deployment (Vercel)

1. Push zu GitHub
2. Vercel → "Add New Project" → Repo auswählen
3. Environment Variables hinzufügen:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
4. Deploy!

## 📁 Projektstruktur

```
src/
├── components/
│   ├── AboutSection.js
│   ├── Countdowns.js      # Alle 6 Countdown-Varianten
│   ├── HeroSection.js
│   ├── ServicesSection.js
│   ├── ThemeSwitcher.js
│   └── WaitlistForm.js
├── config/
│   ├── cloudinary.js
│   └── supabase.js
├── hooks/
│   └── useCountdown.js
├── themes/
│   └── themeDefinitions.js
├── App.js
└── index.js
```

## 📝 Lizenz

© 2026 S&I. Weddings
