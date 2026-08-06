package com.ug.campus.algorithms;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.*;

/**
 * BFSExplorer.java
 * 
 * PURPOSE:
 * Implements Breadth-First Search (BFS) graph traversal.
 * 
 * USE CASE IN UG SYSTEM:
 * Discovers and explores nearby campus facilities layer by layer within a specified hop distance.
 * Example: Find all campus locations reachable within 2 road connections from JQB.
 */
public class BFSExplorer {

    public static List<LocationNode> findLocationsWithinHops(CampusGraph graph, String startLocationId, int maxHops) {
        List<LocationNode> result = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Queue<LocationNode> queue = new LinkedList<>();

        LocationNode startNode = graph.getLocation(startLocationId);
        if (startNode == null) return result;

        Map<String, Integer> hopDistance = new HashMap<>();

        queue.add(startNode);
        visited.add(startNode.getId());
        hopDistance.put(startNode.getId(), 0);

        while (!queue.isEmpty()) {
            LocationNode current = queue.poll();
            int currentHop = hopDistance.get(current.getId());

            if (currentHop > 0 && currentHop <= maxHops) {
                result.add(current);
            }

            if (currentHop < maxHops) {
                for (RoadEdge edge : graph.getAdjacentEdges(current.getId())) {
                    LocationNode neighbor = edge.getDestination();
                    if (!visited.contains(neighbor.getId())) {
                        visited.add(neighbor.getId());
                        hopDistance.put(neighbor.getId(), currentHop + 1);
                        queue.add(neighbor);
                    }
                }
            }
        }

        return result;
    }
}
