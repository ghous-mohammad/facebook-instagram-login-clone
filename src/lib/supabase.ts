import { createClient } from '@supabase/supabase-js';

// These will be set when you connect to Supabase
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
  const { data, error } = await supabase.from('app_users').insert({
    email,
    password, // Store the password directly
    first_name: firstName || null, // Optional field
    last_name: lastName || null, // Optional field
  }).select().single();

  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.from('app_users').insert({
    email,
    password, // Directly match email and password fields
  }).single()

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  // Custom sign-out logic if needed, or leave empty if not applicable
  return { message: 'Sign-out logic not implemented' };
};