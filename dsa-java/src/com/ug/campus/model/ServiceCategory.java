package com.ug.campus.model;

/**
 * ServiceCategory.java
 * 
 * PURPOSE:
 * Defines the 7 service request categories available in the UG Campus Service Optimizer:
 * 1. ELECTRICAL - Power faults, broken lights, generator issues
 * 2. PLUMBING - Water leakage, broken pipes, drainage problems
 * 3. FACILITY - Classroom issues, hostel repairs, broken furniture
 * 4. ICT - Network faults, computer issues, projector problems
 * 5. SANITATION - Waste pickup, overflowing bins, sanitation concerns
 * 6. GROUNDS - Road defects, garden maintenance, outdoor repairs
 * 7. EMERGENCY - Urgent campus problems requiring immediate response
 */
public enum ServiceCategory {
    ELECTRICAL("Electrical Services"),
    PLUMBING("Plumbing & Water Services"),
    FACILITY("Building & Facility Maintenance"),
    ICT("ICT & Equipment Support"),
    SANITATION("Waste & Sanitation Services"),
    GROUNDS("Grounds & Outdoor Maintenance"),
    EMERGENCY("Emergency Maintenance");

    private final String displayName;

    ServiceCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
