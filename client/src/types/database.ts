/**
 * Database Types — TypeScript interfaces for every table
 *
 * These types match the SQL schema exactly.
 * They give you autocomplete and type checking when working with Supabase.
 *
 * Usage:
 *   import type { Profile, ServiceRequest } from '@/types/database';
 */

// ==================
// ENUM TYPES
// ==================

export type UserRole = "student_staff" | "maintenance" | "admin";

export type RequestStatus =
  | "pending"
  | "assigned"
  | "in_progress"
  | "completed"
  | "cancelled";

export type PriorityLevel = "low" | "medium" | "high" | "emergency";

export type ServiceCategoryType =
  | "electrical"
  | "plumbing_water"
  | "building_facility"
  | "ict_equipment"
  | "waste_sanitation"
  | "grounds_outdoor"
  | "emergency";

// ==================
// TABLE ROW TYPES
// ==================

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone: string;
  department: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  category_type: ServiceCategoryType;
  description: string;
  icon: string;
  is_active: boolean;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  requester_id: string;
  category_id: string;
  title: string;
  description: string;
  location: string;
  priority: PriorityLevel;
  status: RequestStatus;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  request_id: string;
  assigned_to: string;
  assigned_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface RequestStatusLog {
  id: string;
  request_id: string;
  changed_by: string;
  old_status: RequestStatus | null;
  new_status: RequestStatus;
  notes: string;
  created_at: string;
}

// ==================
// INSERT TYPES (for creating new rows)
// ==================
// Only include fields the user provides (not auto-generated ones)

export interface ServiceRequestInsert {
  category_id: string;
  title: string;
  description: string;
  location: string;
  priority: PriorityLevel;
  image_url?: string;
}

export interface AssignmentInsert {
  request_id: string;
  assigned_to: string;
  notes?: string;
}

// ==================
// JOINED TYPES (for queries with related data)
// ==================
// When you fetch a request with its category and requester info

export interface ServiceRequestWithDetails extends ServiceRequest {
  profiles: Pick<Profile, "full_name" | "email" | "department">;
  service_categories: Pick<ServiceCategory, "name" | "icon" | "category_type">;
}

export interface AssignmentWithDetails extends Assignment {
  profiles: Pick<Profile, "full_name" | "email">;
  service_requests: Pick<ServiceRequest, "title" | "status" | "priority">;
}

// ==================
// SUPABASE DATABASE TYPE
// ==================
// This is the master type that the Supabase client uses.
// It maps table names to their row/insert/update types.

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      service_categories: {
        Row: ServiceCategory;
        Insert: Omit<ServiceCategory, "id" | "created_at">;
        Update: Partial<Omit<ServiceCategory, "id" | "created_at">>;
      };
      service_requests: {
        Row: ServiceRequest;
        Insert: Omit<ServiceRequest, "id" | "created_at" | "updated_at" | "status"> & {
          status?: RequestStatus;
        };
        Update: Partial<Omit<ServiceRequest, "id" | "created_at" | "requester_id">>;
      };
      assignments: {
        Row: Assignment;
        Insert: Omit<Assignment, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Assignment, "id" | "created_at">>;
      };
      request_status_log: {
        Row: RequestStatusLog;
        Insert: Omit<RequestStatusLog, "id" | "created_at">;
        Update: never;
      };
    };
    Functions: {
      get_user_role: {
        Args: Record<string, never>;
        Returns: UserRole;
      };
    };
    Enums: {
      user_role: UserRole;
      request_status: RequestStatus;
      priority_level: PriorityLevel;
      service_category_type: ServiceCategoryType;
    };
  };
}
