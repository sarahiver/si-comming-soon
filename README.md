# S&I. Wedding - Coming Soon

Premium Wedding Website Service - Coming Soon Page

## Features

- ✅ 6 Theme-Previews (Video, Editorial, Contemporary, Botanical, Luxe, Gold)
- ✅ Waitlist mit Double Opt-In (Brevo)
- ✅ Bot-Schutz (Honeypot + Timing)
- ✅ Responsive Design
- ✅ Vercel Analytics

## Tech Stack

- React 19
- Styled Components
- Brevo (E-Mail + Kontakte)
- Vercel Hosting

## Setup

### 1. Environment Variable (Vercel)

```
BREVO_API_KEY=xkeysib-your-api-key
```

### 2. Brevo Setup

1. Account erstellen auf brevo.com
2. Domain verifizieren (DNS Records)
3. Kontakt-Attribute erstellen:
   - `WAITLIST_STATUS` (Text)
   - `THEME_PREFERENCE` (Text)
   - `SIGNUP_DATE` (Date)
   - `CONFIRMED_DATE` (Date)
   - `CONFIRM_TOKEN` (Text)

### 3. Deploy

```bash
npm install
npm run build
vercel --prod
```

## Kontakt-Verwaltung

Alle Waitlist-Kontakte werden in Brevo verwaltet:
- Dashboard: app.brevo.com → Kontakte
- Filter nach `WAITLIST_STATUS = confirmed` für bestätigte Kontakte
- Launch-Mail direkt über Brevo Kampagnen senden

## Struktur

```
coming-soon/
├── api/
│   ├── brevo-signup.js    # Waitlist Anmeldung
│   └── brevo-confirm.js   # Double Opt-In Bestätigung
├── src/
│   ├── components/
│   │   ├── HeroSection.js
│   │   ├── WaitlistSection.js
│   │   ├── ConfirmPage.js
│   │   └── ...
│   ├── context/
│   │   └── ThemeContext.js
│   └── App.js
└── public/
```

© 2026 S&I. Wedding Websites
