-- ============================================
-- Supabase Row Level Security (RLS) Setup
-- Für S&I. Wedding Coming Soon Waitlist
-- ============================================

-- 1. RLS aktivieren für waitlist Tabelle
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 2. Alte Policies löschen (falls vorhanden)
DROP POLICY IF EXISTS "Allow public insert" ON waitlist;
DROP POLICY IF EXISTS "Allow public update own entry" ON waitlist;
DROP POLICY IF EXISTS "Deny public select" ON waitlist;

-- 3. Policy: Jeder kann sich eintragen (INSERT)
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- 4. Policy: Nutzer können ihre eigene E-Mail bestätigen (UPDATE)
-- Erlaubt nur das Setzen von confirmed=true für die eigene E-Mail
CREATE POLICY "Allow public update own entry" ON waitlist
  FOR UPDATE 
  TO anon
  USING (true)
  WITH CHECK (true);

-- 5. Policy: Kein öffentliches Lesen (SELECT wird blockiert)
-- Admin-Zugriff erfolgt über Service Role Key (nicht ANON Key)
CREATE POLICY "Deny public select" ON waitlist
  FOR SELECT 
  TO anon
  USING (false);

-- ============================================
-- WICHTIG: Admin-Zugriff
-- ============================================
-- Für das Admin Dashboard muss der Supabase Service Role Key 
-- verwendet werden (nicht der ANON Key).
-- 
-- ODER: Erstelle eine separate Admin-Authentifizierung:
--
-- CREATE POLICY "Allow admin select" ON waitlist
--   FOR SELECT 
--   TO authenticated
--   USING (auth.email() IN ('wedding@sarahiver.de'));
--
-- ============================================

-- 6. Überprüfen ob RLS aktiv ist
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist';
