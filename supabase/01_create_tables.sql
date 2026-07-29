-- ============================================================
-- UG CAMPUS SERVICE OPTIMIZER — DATABASE SCHEMA
-- ============================================================
-- Run this FIRST in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================


-- ==================
-- 1. CUSTOM TYPES (ENUMS)
-- ==================
-- Enums restrict a column to specific allowed values.
-- Think of them like dropdowns — you can only pick from the list.

-- User roles: who are you?
CREATE TYPE user_role AS ENUM ('student_staff', 'maintenance', 'admin');

-- Request status: where is the request in its lifecycle?
CREATE TYPE request_status AS ENUM ('pending', 'assigned', 'in_progress', 'completed', 'cancelled');

-- Priority level: how urgent?
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'emergency');

-- Service category: what type of service?
CREATE TYPE service_category_type AS ENUM (
  'electrical',
  'plumbing_water',
  'building_facility',
  'ict_equipment',
  'waste_sanitation',
  'grounds_outdoor',
  'emergency'
);


-- ==================
-- 2. PROFILES TABLE
-- ==================
-- Every user who signs up gets a row here.
-- Linked to Supabase Auth via the user's UUID.

CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  full_name     TEXT NOT NULL DEFAULT '',
  role          user_role NOT NULL DEFAULT 'student_staff',
  phone         TEXT DEFAULT '',
  department    TEXT DEFAULT '',
  avatar_url    TEXT DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups by role (e.g., "find all maintenance staff")
CREATE INDEX idx_profiles_role ON profiles(role);


-- ==================
-- 3. SERVICE CATEGORIES TABLE
-- ==================
-- The 7 types of services the system manages.
-- Pre-populated with sample data in 03_sample_data.sql.

CREATE TABLE service_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL UNIQUE,
  category_type service_category_type NOT NULL UNIQUE,
  description   TEXT NOT NULL DEFAULT '',
  icon          TEXT DEFAULT '🔧',
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ==================
-- 4. SERVICE REQUESTS TABLE
-- ==================
-- The main table. Students/staff submit requests here.

CREATE TABLE service_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id     UUID NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL DEFAULT '',
  location        TEXT NOT NULL DEFAULT '',
  priority        priority_level NOT NULL DEFAULT 'medium',
  status          request_status NOT NULL DEFAULT 'pending',
  image_url       TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_requests_requester ON service_requests(requester_id);
CREATE INDEX idx_requests_status    ON service_requests(status);
CREATE INDEX idx_requests_category  ON service_requests(category_id);
CREATE INDEX idx_requests_priority  ON service_requests(priority);
CREATE INDEX idx_requests_created   ON service_requests(created_at DESC);


-- ==================
-- 5. ASSIGNMENTS TABLE
-- ==================
-- Links a service request to a maintenance team member.
-- Created by admins when they assign work.

CREATE TABLE assignments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id      UUID NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
  assigned_to     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_by     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notes           TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- One maintenance person per request (can be changed later)
  UNIQUE(request_id, assigned_to)
);

CREATE INDEX idx_assignments_request  ON assignments(request_id);
CREATE INDEX idx_assignments_assigned ON assignments(assigned_to);


-- ==================
-- 6. REQUEST STATUS LOG TABLE
-- ==================
-- Every time a request's status changes, a row is added here.
-- This creates an audit trail (history of changes).

CREATE TABLE request_status_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id      UUID NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
  changed_by      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  old_status      request_status,
  new_status      request_status NOT NULL,
  notes           TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_status_log_request ON request_status_log(request_id);
CREATE INDEX idx_status_log_created ON request_status_log(created_at DESC);


-- ==================
-- 7. AUTO-CREATE PROFILE ON SIGNUP
-- ==================
-- When someone signs up via Supabase Auth, this trigger
-- automatically creates their profile row.
-- No extra API call needed!

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student_staff')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach the trigger to Supabase's auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();


-- ==================
-- 8. AUTO-UPDATE "updated_at" TIMESTAMP
-- ==================
-- Whenever a row is updated, automatically set updated_at to now().

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables that have updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_requests_updated_at
  BEFORE UPDATE ON service_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_assignments_updated_at
  BEFORE UPDATE ON assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ==================
-- 9. AUTO-LOG STATUS CHANGES
-- ==================
-- When a service request's status changes, automatically
-- log it to the request_status_log table.

CREATE OR REPLACE FUNCTION log_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO request_status_log (request_id, changed_by, old_status, new_status)
    VALUES (NEW.id, auth.uid(), OLD.status, NEW.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_request_status_change
  AFTER UPDATE ON service_requests
  FOR EACH ROW
  EXECUTE FUNCTION log_status_change();


-- ============================================================
-- DONE! Now run 02_rls_policies.sql next.
-- ============================================================
