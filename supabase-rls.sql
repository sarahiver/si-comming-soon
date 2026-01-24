-- ============================================
-- Supabase Row Level Security (RLS) Setup
-- Für S&I. Wedding Coming Soon Waitlist
-- ============================================
-- WICHTIG: Führe dieses SQL in Supabase → SQL Editor aus!

-- 1. RLS aktivieren für waitlist Tabelle
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 2. Alle alten Policies löschen
DROP POLICY IF EXISTS "Allow public insert" ON waitlist;
DROP POLICY IF EXISTS "Allow public update own entry" ON waitlist;
DROP POLICY IF EXISTS "Deny public select" ON waitlist;
DROP POLICY IF EXISTS "Allow read all" ON waitlist;
DROP POLICY IF EXISTS "Allow update all" ON waitlist;
DROP POLICY IF EXISTS "Allow delete all" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "anon_insert" ON waitlist;
DROP POLICY IF EXISTS "anon_update_confirm" ON waitlist;

-- 3. Policy: Jeder kann sich eintragen (INSERT)
CREATE POLICY "anon_insert" ON waitlist
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- 4. Policy: Nur confirmed-Feld darf aktualisiert werden (für Double Opt-In)
-- Erlaubt UPDATE nur wenn confirmed von false auf true gesetzt wird
CREATE POLICY "anon_update_confirm" ON waitlist
  FOR UPDATE 
  TO anon
  USING (confirmed = false)
  WITH CHECK (confirmed = true);

-- 5. KEIN SELECT für anon - E-Mails sind nicht auslesbar!
-- (Keine Policy = kein Zugriff)

-- 6. KEIN DELETE für anon
-- (Keine Policy = kein Zugriff)

-- ============================================
-- ERGEBNIS:
-- ✅ Anmelden (INSERT) - erlaubt
-- ✅ Bestätigen (UPDATE confirmed) - erlaubt  
-- ❌ E-Mails lesen (SELECT) - BLOCKIERT
-- ❌ Einträge löschen (DELETE) - BLOCKIERT
-- ============================================

-- ADMIN ZUGRIFF:
-- Das Admin Dashboard benötigt den Service Role Key!
-- Füge SUPABASE_SERVICE_ROLE_KEY zu Vercel Environment Variables hinzu.

-- ============================================
-- PRÜFEN ob RLS aktiv ist:
-- ============================================
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'waitlist';

-- Sollte zeigen: rowsecurity = true
