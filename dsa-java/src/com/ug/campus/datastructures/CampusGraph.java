package com.ug.campus.datastructures;

import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * CampusGraph.java
 * 
 * PURPOSE:
 * Represents the University of Ghana campus layout as an undirected weighted Graph.
 * 
 * STRUCTURE:
 * - Nodes: Campus buildings / locations (Balme Library, JQB, Halls, Gates, Hospitals, etc.)
 * - Edges: Roads connecting locations with distance, travel time, and condition weights.
 * 
 * USE CASE IN UG SYSTEM:
 * Primary graph data structure fed into BFS, DFS, Dijkstra, Prim, and Kruskal algorithms.
 */
public class CampusGraph {
    private Map<String, LocationNode> nodes;
    private Map<String, List<RoadEdge>> adjacencyList;
    private List<RoadEdge> allEdges;

    public CampusGraph() {
        nodes = new HashMap<>();
        adjacencyList = new HashMap<>();
        allEdges = new ArrayList<>();
    }

    public void addLocation(LocationNode location) {
        nodes.put(location.getId(), location);
        adjacencyList.putIfAbsent(location.getId(), new ArrayList<>());
    }

    public void addRoad(LocationNode src, LocationNode dest, double distance, double travelTime, double weight) {
        addLocation(src);
        addLocation(dest);

        RoadEdge edge1 = new RoadEdge(src, dest, distance, travelTime, weight);
        RoadEdge edge2 = new RoadEdge(dest, src, distance, travelTime, weight);

        adjacencyList.get(src.getId()).add(edge1);
        adjacencyList.get(dest.getId()).add(edge2);
        allEdges.add(edge1);
    }

    public LocationNode getLocation(String id) {
        return nodes.get(id);
    }

    public List<LocationNode> getAllLocations() {
        return new ArrayList<>(nodes.values());
    }

    public List<RoadEdge> getAdjacentEdges(String locationId) {
        return adjacencyList.getOrDefault(locationId, new ArrayList<>());
    }

    public List<RoadEdge> getAllEdges() {
        return allEdges;
    }

    public int getNodeCount() {
        return nodes.size();
    }

    public int getEdgeCount() {
        return allEdges.size();
    }
}
