/*
  # Create new contacts table with additional fields

  1. New Table Structure
    - `contacts`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `niveau_diplome` (text)
      - `diplome_reconnu` (boolean)
      - `experience_travail` (text)
      - `connaissance_canada` (boolean)
      - `deja_venu_canada` (boolean)
      - `langue_parlee` (text)
      - `id_paiement` (text)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on contacts table
    - Add policy for inserting new contacts
*/

-- Drop existing contacts table if it exists
DROP TABLE IF EXISTS contacts;

-- Create new contacts table with updated structure
CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  niveau_diplome text NOT NULL,
  diplome_reconnu boolean NOT NULL,
  experience_travail text NOT NULL,
  connaissance_canada boolean NOT NULL,
  deja_venu_canada boolean NOT NULL,
  langue_parlee text NOT NULL,
  id_paiement text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);