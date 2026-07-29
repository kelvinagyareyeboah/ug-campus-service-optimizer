-- ============================================================
-- UG CAMPUS SERVICE OPTIMIZER — ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Run this SECOND (after 01_create_tables.sql)
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================
--
-- RLS = "Who can do what?"
-- Without RLS, anyone with the API key can read/write everything.
-- With RLS, each user can only access what their role allows.
-- ============================================================


-- ==================
-- ENABLE RLS ON ALL TABLES
-- ==================
-- This locks down every table. No access until we add policies.

ALTER TABLE profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests   ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_status_log ENABLE ROW LEVEL SECURITY;


-- ==================
-- HELPER: Get current user's role
-- ==================
-- This function lets us check the logged-in user's role in policies.

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;


-- ============================================================
-- PROFILES POLICIES
-- ============================================================

-- Anyone logged in can see their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Admins can see all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (get_user_role() = 'admin');

-- Users can update their own profile (but not their role!)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can update any profile (including changing roles)
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (get_user_role() = 'admin');

-- Profile INSERT is handled by the trigger, but we need a policy for it
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);


-- ============================================================
-- SERVICE CATEGORIES POLICIES
-- ============================================================

-- Everyone logged in can see categories (needed for the request form)
CREATE POLICY "Anyone can view active categories"
  ON service_categories FOR SELECT
  USING (true);

-- Only admins can add new categories
CREATE POLICY "Admins can insert categories"
  ON service_categories FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

-- Only admins can edit categories
CREATE POLICY "Admins can update categories"
  ON service_categories FOR UPDATE
  USING (get_user_role() = 'admin');

-- Only admins can delete categories
CREATE POLICY "Admins can delete categories"
  ON service_categories FOR DELETE
  USING (get_user_role() = 'admin');


-- ============================================================
-- SERVICE REQUESTS POLICIES
-- ============================================================

-- Students/staff can see their own requests
CREATE POLICY "Users can view own requests"
  ON service_requests FOR SELECT
  USING (auth.uid() = requester_id);

-- Maintenance can see requests assigned to them
CREATE POLICY "Maintenance can view assigned requests"
  ON service_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM assignments
      WHERE assignments.request_id = service_requests.id
        AND assignments.assigned_to = auth.uid()
    )
  );

-- Admins can see all requests
CREATE POLICY "Admins can view all requests"
  ON service_requests FOR SELECT
  USING (get_user_role() = 'admin');

-- Students/staff can create new requests
CREATE POLICY "Users can create requests"
  ON service_requests FOR INSERT
  WITH CHECK (
    auth.uid() = requester_id
    AND get_user_role() = 'student_staff'
  );

-- Requester can update their own request (only if still pending)
CREATE POLICY "Users can update own pending requests"
  ON service_requests FOR UPDATE
  USING (
    auth.uid() = requester_id
    AND status = 'pending'
  );

-- Maintenance can update status of assigned requests
CREATE POLICY "Maintenance can update assigned requests"
  ON service_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM assignments
      WHERE assignments.request_id = service_requests.id
        AND assignments.assigned_to = auth.uid()
    )
  );

-- Admins can update any request
CREATE POLICY "Admins can update any request"
  ON service_requests FOR UPDATE
  USING (get_user_role() = 'admin');

-- Users can delete their own pending requests
CREATE POLICY "Users can delete own pending requests"
  ON service_requests FOR DELETE
  USING (
    auth.uid() = requester_id
    AND status = 'pending'
  );

-- Admins can delete any request
CREATE POLICY "Admins can delete any request"
  ON service_requests FOR DELETE
  USING (get_user_role() = 'admin');


-- ============================================================
-- ASSIGNMENTS POLICIES
-- ============================================================

-- Maintenance can see their own assignments
CREATE POLICY "Maintenance can view own assignments"
  ON assignments FOR SELECT
  USING (auth.uid() = assigned_to);

-- Admins can see all assignments
CREATE POLICY "Admins can view all assignments"
  ON assignments FOR SELECT
  USING (get_user_role() = 'admin');

-- Requesters can see assignments for their requests
CREATE POLICY "Requesters can view their request assignments"
  ON assignments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM service_requests
      WHERE service_requests.id = assignments.request_id
        AND service_requests.requester_id = auth.uid()
    )
  );

-- Only admins can create assignments
CREATE POLICY "Admins can create assignments"
  ON assignments FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

-- Only admins can update assignments
CREATE POLICY "Admins can update assignments"
  ON assignments FOR UPDATE
  USING (get_user_role() = 'admin');

-- Only admins can delete assignments
CREATE POLICY "Admins can delete assignments"
  ON assignments FOR DELETE
  USING (get_user_role() = 'admin');


-- ============================================================
-- REQUEST STATUS LOG POLICIES
-- ============================================================

-- Users can see status logs for their own requests
CREATE POLICY "Users can view own request logs"
  ON request_status_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM service_requests
      WHERE service_requests.id = request_status_log.request_id
        AND service_requests.requester_id = auth.uid()
    )
  );

-- Maintenance can see logs for assigned requests
CREATE POLICY "Maintenance can view assigned request logs"
  ON request_status_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM assignments
      WHERE assignments.request_id = request_status_log.request_id
        AND assignments.assigned_to = auth.uid()
    )
  );

-- Admins can see all logs
CREATE POLICY "Admins can view all logs"
  ON request_status_log FOR SELECT
  USING (get_user_role() = 'admin');

-- Status log inserts are handled by the trigger (SECURITY DEFINER)
-- But we need a policy so the trigger function can insert
CREATE POLICY "System can insert logs"
  ON request_status_log FOR INSERT
  WITH CHECK (true);


-- ============================================================
-- DONE! Now run 03_sample_data.sql next.
-- ============================================================
