/**
 * useServiceRequests Hook — CRUD operations for service requests
 *
 * Handles fetching, creating, updating, and deleting service requests.
 * Automatically applies role-based filtering via Supabase RLS.
 *
 * Usage:
 *   const { requests, loading, createRequest, updateStatus } = useServiceRequests();
 */

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type {
  ServiceRequestInsert,
  ServiceRequestWithDetails,
  RequestStatus,
  ServiceCategory,
} from "../types/database";

export function useServiceRequests() {
  const [requests, setRequests] = useState<ServiceRequestWithDetails[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==================
  // FETCH ALL REQUESTS (with category + requester info)
  // ==================
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("service_requests")
      .select(
        `
        *,
        profiles!requester_id (full_name, email, department),
        service_categories (name, icon, category_type)
      `
      )
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      console.error("Error fetching requests:", fetchError);
    } else {
      setRequests((data as ServiceRequestWithDetails[]) || []);
    }

    setLoading(false);
  }, []);

  // ==================
  // FETCH CATEGORIES (for the request form dropdown)
  // ==================
  const fetchCategories = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from("service_categories")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (fetchError) {
      console.error("Error fetching categories:", fetchError);
    } else {
      setCategories((data as ServiceCategory[]) || []);
    }
  }, []);

  // ==================
  // CREATE A NEW REQUEST
  // ==================
  async function createRequest(request: ServiceRequestInsert) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "You must be logged in to create a request" };
    }

    const { error: insertError } = await supabase
      .from("service_requests")
      .insert({
        requester_id: user.id,
        category_id: request.category_id,
        title: request.title,
        description: request.description,
        location: request.location,
        priority: request.priority,
        image_url: request.image_url || "",
      });

    if (insertError) {
      return { error: insertError.message };
    }

    // Refresh the list after creating
    await fetchRequests();
    return { error: null };
  }

  // ==================
  // UPDATE REQUEST STATUS
  // ==================
  async function updateStatus(requestId: string, newStatus: RequestStatus) {
    const { error: updateError } = await supabase
      .from("service_requests")
      .update({ status: newStatus })
      .eq("id", requestId);

    if (updateError) {
      return { error: updateError.message };
    }

    // Refresh the list
    await fetchRequests();
    return { error: null };
  }

  // ==================
  // UPDATE REQUEST DETAILS
  // ==================
  async function updateRequest(
    requestId: string,
    updates: Record<string, unknown>
  ) {
    const { error: updateError } = await supabase
      .from("service_requests")
      .update(updates)
      .eq("id", requestId);

    if (updateError) {
      return { error: updateError.message };
    }

    await fetchRequests();
    return { error: null };
  }

  // ==================
  // DELETE A REQUEST
  // ==================
  async function deleteRequest(requestId: string) {
    const { error: deleteError } = await supabase
      .from("service_requests")
      .delete()
      .eq("id", requestId);

    if (deleteError) {
      return { error: deleteError.message };
    }

    await fetchRequests();
    return { error: null };
  }

  // ==================
  // FETCH ON MOUNT
  // ==================
  useEffect(() => {
    fetchRequests();
    fetchCategories();
  }, [fetchRequests, fetchCategories]);

  return {
    // Data
    requests,
    categories,
    loading,
    error,

    // Actions
    createRequest,
    updateStatus,
    updateRequest,
    deleteRequest,
    refreshRequests: fetchRequests,
  };
}
