package com.ug.campus.model;

/**
 * PriorityLevel.java
 * 
 * PURPOSE:
 * Defines urgency levels for service requests.
 * Used by the Priority Queue (Heap) and Greedy Scheduler to determine handling order.
 * Higher weight = higher priority for emergency preemption.
 */
public enum PriorityLevel {
    LOW(1, "Low Priority"),
    MEDIUM(2, "Medium Priority"),
    HIGH(3, "High Priority"),
    EMERGENCY(4, "Emergency Priority");

    private final int weight;
    private final String label;

    PriorityLevel(int weight, String label) {
        this.weight = weight;
        this.label = label;
    }

    public int getWeight() {
        return weight;
    }

    public String getLabel() {
        return label;
    }
}
