package com.ug.campus.model;

/**
 * RoadEdge.java
 * 
 * PURPOSE:
 * Represents a road connection between two campus locations in the UG Graph.
 * Contains distance (meters), travel time (minutes), and road condition weight.
 * Acts as a Graph Edge for Dijkstra, Prim, and Kruskal algorithms.
 */
public class RoadEdge {
    private LocationNode source;
    private LocationNode destination;
    private double distance;     // in meters
    private double travelTime;   // in minutes
    private double weight;       // weighted cost combining distance & road conditions

    public RoadEdge(LocationNode source, LocationNode destination, double distance, double travelTime, double weight) {
        this.source = source;
        this.destination = destination;
        this.distance = distance;
        this.travelTime = travelTime;
        this.weight = weight;
    }

    public LocationNode getSource() { return source; }
    public LocationNode getDestination() { return destination; }
    public double getDistance() { return distance; }
    public double getTravelTime() { return travelTime; }
    public double getWeight() { return weight; }

    @Override
    public String toString() {
        return source.getName() + " -> " + destination.getName() + " [" + distance + "m, " + travelTime + " mins]";
    }
}
