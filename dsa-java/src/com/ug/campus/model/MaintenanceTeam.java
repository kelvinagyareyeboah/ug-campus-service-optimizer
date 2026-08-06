package com.ug.campus.model;

/**
 * MaintenanceTeam.java
 * 
 * PURPOSE:
 * Represents a specialized campus maintenance team (e.g. Electrical Team, Sanitation Team).
 * Tracks assigned tasks, shift capacity, and current location node.
 */
public class MaintenanceTeam {
    private String id;
    private String name;
    private ServiceCategory specialization;
    private LocationNode currentLocation;
    private int maxWorkingHours; // shift capacity for DP scheduling

    public MaintenanceTeam(String id, String name, ServiceCategory specialization, LocationNode currentLocation, int maxWorkingHours) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.currentLocation = currentLocation;
        this.maxWorkingHours = maxWorkingHours;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public ServiceCategory getSpecialization() { return specialization; }
    public LocationNode getCurrentLocation() { return currentLocation; }
    public void setCurrentLocation(LocationNode currentLocation) { this.currentLocation = currentLocation; }
    public int getMaxWorkingHours() { return maxWorkingHours; }

    @Override
    public String toString() {
        return name + " (" + specialization.getDisplayName() + ") @ " + currentLocation.getName();
    }
}
