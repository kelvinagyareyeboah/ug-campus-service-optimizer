package com.ug.campus.model;

/**
 * RequestStatus.java
 * 
 * PURPOSE:
 * Tracks the lifecycle status of a service request in the system.
 * Workflow: PENDING -> ASSIGNED -> IN_PROGRESS -> COMPLETED
 */
public enum RequestStatus {
    PENDING("Pending"),
    ASSIGNED("Assigned"),
    IN_PROGRESS("In Progress"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");

    private final String label;

    RequestStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
