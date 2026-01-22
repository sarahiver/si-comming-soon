import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const addToWaitlist = async (email, themePreference = 'contemporary') => {
  if (!supabase) {
    console.warn('Supabase not configured - simulating success');
    return { success: true, data: { email } };
  }

  try {
    const { data: existing } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return { success: false, error: 'Diese E-Mail ist bereits auf der Warteliste.' };
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email: email.toLowerCase(),
        theme_preference: themePreference,
        source: 'coming-soon-page',
        created_at: new Date().toISOString(),
      }])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Waitlist error:', error);
    return { success: false, error: error.message };
  }
};

export const getWaitlist = async () => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return { success: false, data: [], error: 'Supabase nicht konfiguriert' };
  }

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get waitlist error:', error);
    return { success: false, data: [], error: error.message };
  }
};

export const updateWaitlistEntry = async (id, updates) => {
  if (!supabase) {
    return { success: false, error: 'Supabase nicht konfiguriert' };
  }

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: error.message };
  }
};

export const deleteWaitlistEntry = async (id) => {
  if (!supabase) {
    return { success: false, error: 'Supabase nicht konfiguriert' };
  }

  try {
    const { error } = await supabase
      .from('waitlist')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: error.message };
  }
};

/*
  SUPABASE SQL:
  
  CREATE TABLE waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    theme_preference VARCHAR(50) DEFAULT 'contemporary',
    source VARCHAR(100) DEFAULT 'coming-soon-page',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contacted BOOLEAN DEFAULT FALSE,
    notes TEXT
  );

  ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
  
  -- Allow anonymous inserts
  CREATE POLICY "Allow anonymous inserts" ON waitlist
    FOR INSERT WITH CHECK (true);
    
  -- Allow reading for authenticated users (admin)
  CREATE POLICY "Allow read for service role" ON waitlist
    FOR SELECT USING (true);
    
  -- Allow update for service role
  CREATE POLICY "Allow update for service role" ON waitlist
    FOR UPDATE USING (true);
    
  -- Allow delete for service role  
  CREATE POLICY "Allow delete for service role" ON waitlist
    FOR DELETE USING (true);
*/
