# Sicherheits-Setup für S&I. Wedding Coming Soon

## 🔐 Environment Variables in Vercel einrichten

Gehe zu: **Vercel → Projekt → Settings → Environment Variables**

### Erforderliche Variables:

| Variable | Öffentlich? | Wert |
|----------|-------------|------|
| `REACT_APP_SUPABASE_URL` | ✅ Ja (OK) | `https://wikxhpvikelfgzdgndlf.supabase.co` |
| `REACT_APP_SUPABASE_ANON_KEY` | ✅ Ja (OK) | `sb_publishable_...` |
| `RESEND_API_KEY` | ❌ Nein | `re_A6fc...` |
| `ADMIN_EMAIL` | ❌ Nein | `wedding@sarahiver.de` |
| `ADMIN_PASSWORD` | ❌ Nein | `Dein-Sicheres-Passwort` |

### ⚠️ WICHTIG:
- **REACT_APP_** Variables sind im Browser sichtbar!
- **Passwörter NIEMALS mit REACT_APP_ prefix!**
- Admin Login funktioniert über Server-side API

### Optional (für Supabase RLS):

| Variable | Wert |
|----------|------|
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role Key aus Supabase |
| `SUPABASE_URL` | Gleiche URL wie oben |

---

## 🛡️ Wie funktioniert der sichere Admin Login?

1. User gibt E-Mail + Passwort ein
2. Frontend sendet an `/api/admin-waitlist`
3. **Server prüft Passwort** (nicht im Browser!)
4. Bei Erfolg: Session wird erstellt

```
Browser → API Route → Passwort-Check → Antwort
         (Server-side, nicht sichtbar)
```

---

## 🛡️ Supabase RLS (Row Level Security)

Für maximale Sicherheit (E-Mails vor Auslesen schützen):

1. Gehe zu **Supabase → SQL Editor**
2. Führe das SQL aus `supabase-rls.sql` aus
3. Hole **Service Role Key** (Settings → API)
4. Füge als `SUPABASE_SERVICE_ROLE_KEY` in Vercel hinzu

---

## ✅ Sicherheits-Checkliste

- [x] **API Keys im Code** → Environment Variables
- [x] **Admin Passwort** → Server-side check (KEIN REACT_APP_!)
- [x] **CORS eingeschränkt** → Nur erlaubte Domains
- [x] **.env in .gitignore** → Secrets nicht in Git
- [x] **Admin-Login** → Passwortgeschützt via API
- [ ] **Supabase RLS** → Optional

---

## 🔑 Wo finde ich die Keys?

### Supabase:
- URL & ANON Key: **Settings → API**
- Service Role Key: **Settings → API → Service Role Key (secret)**

### Resend:
- API Key: **Resend Dashboard → API Keys**
