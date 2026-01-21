import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Waitlist will not work.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Waitlist functions
export const addToWaitlist = async (email, themePreference = 'luxe') => {
  if (!supabase) {
    console.error('Supabase not configured');
    return { success: false, error: 'Database not configured' };
  }

  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return { success: false, error: 'Diese E-Mail ist bereits auf der Warteliste.' };
    }

    // Insert new entry
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          theme_preference: themePreference,
          source: 'coming-soon-page',
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Waitlist error:', error);
    return { success: false, error: error.message };
  }
};

/*
  SUPABASE TABLE SETUP:
  
  Run this SQL in your Supabase SQL Editor:
  
  CREATE TABLE waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    theme_preference VARCHAR(50) DEFAULT 'luxe',
    source VARCHAR(100) DEFAULT 'coming-soon-page',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contacted BOOLEAN DEFAULT FALSE,
    notes TEXT
  );

  -- Enable Row Level Security
  ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

  -- Policy for anonymous inserts (public can add themselves)
  CREATE POLICY "Allow anonymous inserts" ON waitlist
    FOR INSERT WITH CHECK (true);

  -- Policy for reading (only authenticated users/admins)
  CREATE POLICY "Allow authenticated reads" ON waitlist
    FOR SELECT USING (auth.role() = 'authenticated');
*/
