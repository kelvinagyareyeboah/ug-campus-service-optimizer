package com.ug.campus.model;

/**
 * ServiceRequest.java
 * 
 * PURPOSE:
 * Core data entity for campus service requests submitted by students/staff.
 * Stored in Supabase in production; used across Queue, Priority Queue, Hash Table,
 * BST, and Dynamic Programming scheduler.
 */
public class ServiceRequest implements Comparable<ServiceRequest> {
    private String id;
    private String userEmail;
    private LocationNode location;
    private ServiceCategory category;
    private PriorityLevel priority;
    private String description;
    private long timestampSubmitted;
    private int estimatedHours; // required duration in hours (for DP Knapsack)
    private RequestStatus status;

    public ServiceRequest(String id, String userEmail, LocationNode location, ServiceCategory category,
                          PriorityLevel priority, String description, int estimatedHours) {
        this.id = id;
        this.userEmail = userEmail;
        this.location = location;
        this.category = category;
        this.priority = priority;
        this.description = description;
        this.timestampSubmitted = System.currentTimeMillis();
        this.estimatedHours = estimatedHours;
        this.status = RequestStatus.PENDING;
    }

    public String getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public LocationNode getLocation() { return location; }
    public ServiceCategory getCategory() { return category; }
    public PriorityLevel getPriority() { return priority; }
    public String getDescription() { return description; }
    public long getTimestampSubmitted() { return timestampSubmitted; }
    public int getEstimatedHours() { return estimatedHours; }
    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }

    @Override
    public int compareTo(ServiceRequest other) {
        // High priority weight first; if equal, older timestamp first (FIFO tie-breaker)
        int pCompare = Integer.compare(this.priority.getWeight(), other.priority.getWeight());
        if (pCompare != 0) return pCompare;
        return Long.compare(other.timestampSubmitted, this.timestampSubmitted);
    }

    @Override
    public String toString() {
        return "[" + id + "] " + priority.getLabel() + " - " + category.getDisplayName() + " @ " + location.getName() + " (" + status.getLabel() + ")";
    }
}
