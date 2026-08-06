package com.ug.campus.model;

/**
 * LocationNode.java
 * 
 * PURPOSE:
 * Represents a physical location / building on the University of Ghana campus.
 * Acts as a Graph Node in the Campus Graph structure (minimum 50 campus locations).
 */
public class LocationNode {
    private String id;
    private String name;
    private String area;
    private String type; // e.g. "Library", "Hostel", "Department", "Gate", "Hospital"
    private double latitude;
    private double longitude;

    public LocationNode(String id, String name, String area, String type, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.type = type;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getArea() { return area; }
    public String getType() { return type; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }

    @Override
    public String toString() {
        return name + " (" + area + ")";
    }
}
