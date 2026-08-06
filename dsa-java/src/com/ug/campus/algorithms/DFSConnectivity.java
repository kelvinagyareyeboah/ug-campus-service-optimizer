package com.ug.campus.algorithms;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.*;

/**
 * DFSConnectivity.java
 * 
 * PURPOSE:
 * Implements Depth-First Search (DFS) graph traversal.
 * 
 * USE CASE IN UG SYSTEM:
 * Verifies connectivity between distant campus zones, ensuring that maintenance vehicles
 * can reach a problem site and detecting isolated/disconnected road sections.
 */
public class DFSConnectivity {

    public static boolean isConnected(CampusGraph graph, String startId, String targetId) {
        Set<String> visited = new HashSet<>();
        return dfs(graph, startId, targetId, visited);
    }

    private static boolean dfs(CampusGraph graph, String currentId, String targetId, Set<String> visited) {
        if (currentId.equals(targetId)) return true;

        visited.add(currentId);

        for (RoadEdge edge : graph.getAdjacentEdges(currentId)) {
            String neighborId = edge.getDestination().getId();
            if (!visited.contains(neighborId)) {
                if (dfs(graph, neighborId, targetId, visited)) {
                    return true;
                }
            }
        }

        return false;
    }
}
