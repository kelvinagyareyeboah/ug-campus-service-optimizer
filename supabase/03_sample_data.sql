-- ============================================================
-- UG CAMPUS SERVICE OPTIMIZER — SAMPLE DATA
-- ============================================================
-- Run this THIRD (after 01 and 02)
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================
--
-- NOTE: Test users must be created through Supabase Auth first.
--       Go to Dashboard → Authentication → Users → Add User
--       Create these 3 users, then their profiles will be
--       auto-created by the trigger from 01_create_tables.sql.
--
--   1. student@test.com  (password: test1234)
--   2. maintenance@test.com (password: test1234)
--   3. admin@test.com (password: test1234)
--
-- After creating users, update their roles below.
-- ============================================================


-- ==================
-- 1. SERVICE CATEGORIES
-- ==================
-- These are the 7 core service types the system manages.

INSERT INTO service_categories (name, category_type, description, icon) VALUES
  ('Electrical Services',          'electrical',        'Power outages, faulty wiring, electrical installations, lighting issues',     '⚡'),
  ('Plumbing & Water Services',    'plumbing_water',    'Leaking pipes, blocked drains, water supply issues, toilet repairs',          '🚿'),
  ('Building & Facility Maintenance', 'building_facility', 'Broken doors/windows, painting, roof repairs, structural issues',         '🏗️'),
  ('ICT & Equipment Support',      'ict_equipment',     'Network issues, projector problems, computer repairs, lab equipment',         '💻'),
  ('Waste & Sanitation Services',  'waste_sanitation',  'Waste collection, bin replacement, deep cleaning, pest control',             '🗑️'),
  ('Grounds & Outdoor Maintenance','grounds_outdoor',   'Landscaping, road repairs, drainage, outdoor lighting, fencing',             '🌳'),
  ('Emergency Maintenance',        'emergency',         'Urgent repairs, flooding, fire damage, gas leaks, security breaches',        '🚨');


-- ==================
-- 2. UPDATE TEST USER ROLES
-- ==================
-- After creating users via Auth dashboard, run these to set roles.
-- Replace the emails if you used different ones.

-- Make the maintenance user a maintenance team member
UPDATE profiles
SET role = 'maintenance', full_name = 'Kwame Mensah', department = 'Maintenance Unit'
WHERE email = 'maintenance@test.com';

-- Make the admin user an admin
UPDATE profiles
SET role = 'admin', full_name = 'Ama Owusu', department = 'Estate Management'
WHERE email = 'admin@test.com';

-- Update the student user's info
UPDATE profiles
SET full_name = 'Kofi Asante', department = 'Computer Science'
WHERE email = 'student@test.com';


-- ==================
-- 3. SAMPLE SERVICE REQUESTS
-- ==================
-- These use the test student's profile.
-- They will only work after you create the test users above.

-- We need the student's ID and category IDs, so we use subqueries.

INSERT INTO service_requests (requester_id, category_id, title, description, location, priority, status)
SELECT
  p.id,
  c.id,
  'Broken light in lecture hall',
  'The ceiling light in Room 101 of the N-Block has been flickering for 2 days and finally went off. It affects evening lectures.',
  'N-Block, Room 101',
  'high',
  'pending'
FROM profiles p, service_categories c
WHERE p.email = 'student@test.com' AND c.category_type = 'electrical';

INSERT INTO service_requests (requester_id, category_id, title, description, location, priority, status)
SELECT
  p.id,
  c.id,
  'Leaking pipe in washroom',
  'The pipe under the sink in the ground floor washroom is leaking badly. Water is pooling on the floor.',
  'JQB Building, Ground Floor Washroom',
  'high',
  'assigned'
FROM profiles p, service_categories c
WHERE p.email = 'student@test.com' AND c.category_type = 'plumbing_water';

INSERT INTO service_requests (requester_id, category_id, title, description, location, priority, status)
SELECT
  p.id,
  c.id,
  'Wi-Fi not working in CS Lab',
  'The Wi-Fi access point in the Computer Science lab has been down since Monday. Students cannot access online resources.',
  'Department of Computer Science, Lab 2',
  'medium',
  'in_progress'
FROM profiles p, service_categories c
WHERE p.email = 'student@test.com' AND c.category_type = 'ict_equipment';

INSERT INTO service_requests (requester_id, category_id, title, description, location, priority, status)
SELECT
  p.id,
  c.id,
  'Overflowing bins near cafeteria',
  'The waste bins near the main cafeteria have not been collected in 3 days. The area smells bad.',
  'Main Cafeteria Area',
  'medium',
  'pending'
FROM profiles p, service_categories c
WHERE p.email = 'student@test.com' AND c.category_type = 'waste_sanitation';

INSERT INTO service_requests (requester_id, category_id, title, description, location, priority, status)
SELECT
  p.id,
  c.id,
  'Broken window in Balme Library',
  'A window on the 2nd floor of Balme Library is cracked and letting in rain. Books nearby are getting wet.',
  'Balme Library, 2nd Floor, East Wing',
  'emergency',
  'assigned'
FROM profiles p, service_categories c
WHERE p.email = 'student@test.com' AND c.category_type = 'building_facility';


-- ==================
-- 4. SAMPLE ASSIGNMENTS
-- ==================
-- Assign some requests to the maintenance user.

-- Assign the leaking pipe request
INSERT INTO assignments (request_id, assigned_to, assigned_by, notes)
SELECT
  sr.id,
  (SELECT id FROM profiles WHERE email = 'maintenance@test.com'),
  (SELECT id FROM profiles WHERE email = 'admin@test.com'),
  'Please fix the leaking pipe ASAP. Take tools for PVC pipe repair.'
FROM service_requests sr
WHERE sr.title = 'Leaking pipe in washroom';

-- Assign the broken window request
INSERT INTO assignments (request_id, assigned_to, assigned_by, notes)
SELECT
  sr.id,
  (SELECT id FROM profiles WHERE email = 'maintenance@test.com'),
  (SELECT id FROM profiles WHERE email = 'admin@test.com'),
  'Emergency: Rain is damaging library books. Temporary fix first, then full replacement.'
FROM service_requests sr
WHERE sr.title = 'Broken window in Balme Library';


-- ============================================================
-- DONE! Your database is now populated with test data.
-- ============================================================
--
-- SUMMARY OF TEST DATA:
-- ✅ 7 service categories
-- ✅ 3 test users (student, maintenance, admin)
-- ✅ 5 service requests (various statuses and priorities)
-- ✅ 2 assignments (maintenance user assigned to 2 requests)
--
-- You can now test the app!
-- ============================================================
