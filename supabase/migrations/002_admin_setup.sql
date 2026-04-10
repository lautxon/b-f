-- Barro & Fuego: Admin Setup
-- Run this in Supabase SQL Editor AFTER the first migration
-- Creates storage bucket and sets up admin user

-- ============================================
-- 1. CREATE STORAGE BUCKET
-- ============================================

-- Create the 'catalogo' bucket for obra images
INSERT INTO storage.buckets (id, name, public)
VALUES ('catalogo', 'catalogo', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. STORAGE POLICIES
-- ============================================

-- Allow public read access to catalogo bucket
DROP POLICY IF EXISTS "catalogo public read" ON storage.objects;
CREATE POLICY "catalogo public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'catalogo');

-- Allow authenticated users to upload
DROP POLICY IF EXISTS "catalogo authenticated upload" ON storage.objects;
CREATE POLICY "catalogo authenticated upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'catalogo' AND auth.role() = 'authenticated');

-- Allow authenticated users to update/delete their uploads
DROP POLICY IF EXISTS "catalogo authenticated update" ON storage.objects;
CREATE POLICY "catalogo authenticated update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'catalogo' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "catalogo authenticated delete" ON storage.objects;
CREATE POLICY "catalogo authenticated delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'catalogo' AND auth.role() = 'authenticated');

-- ============================================
-- 3. RLS POLICIES FOR WRITES (authenticated users)
-- ============================================

-- Allow authenticated users to INSERT obras
DROP POLICY IF EXISTS "obras authenticated insert" ON obras;
CREATE POLICY "obras authenticated insert"
  ON obras FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to UPDATE obras
DROP POLICY IF EXISTS "obras authenticated update" ON obras;
CREATE POLICY "obras authenticated update"
  ON obras FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to DELETE obras
DROP POLICY IF EXISTS "obras authenticated delete" ON obras;
CREATE POLICY "obras authenticated delete"
  ON obras FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- 4. CREATE ADMIN USER
-- ============================================

-- This creates a user via Supabase Auth. 
-- IMPORTANT: You must also create this user in the Supabase Dashboard
-- under Authentication > Users > Add user
-- Email: admin@barroyfuego.com
-- Password: (set manually in dashboard or use Supabase CLI)

-- The user will automatically get auth access after creation.

-- ============================================
-- 5. VERIFY
-- ============================================

SELECT id, name, public FROM storage.buckets;
