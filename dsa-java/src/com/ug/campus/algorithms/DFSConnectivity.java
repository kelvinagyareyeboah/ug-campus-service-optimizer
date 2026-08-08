package com.ug.campus.algorithms;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.HashSet;
import java.util.Set;

/**
 * DFSConnectivity.java
 *
 * PURPOSE:
 * Implements Depth-First Search (DFS) graph traversal on the UG Campus Graph.
 *
 * USE CASE IN UG SYSTEM:
 * Verifies connectivity between distant campus zones, ensuring maintenance vehicles
 * can reach a problem site and detecting isolated/disconnected road sections.
 */
public class DFSConnectivity {

    /**
     * Checks whether a path exists between two campus locations using recursive DFS.
     *
     * HOW IT WORKS:
     * 1. A fresh {@code visited} set is created per query (state isolation / cleanup).
     * 2. DFS recursion explores as deep as possible down each road before backtracking.
     * 3. If the target location ID is ever reached, {@code true} is returned immediately.
     *
     * @param graph    the UG Campus Graph (undirected, weighted road network)
     * @param startId  source location ID, e.g. "LOC-01" (Main Gate)
     * @param targetId destination location ID, e.g. "LOC-07" (University Hospital)
     * @return {@code true} if a road path connects start to target, {@code false} otherwise
     */
    public static boolean isConnected(CampusGraph graph, String startId, String targetId) {
        // Fresh visited set per query => automatic cleanup between calls.
        Set<String> visited = new HashSet<>();
        return dfs(graph, startId, targetId, visited);
    }

    /**
     * Core recursive DFS helper that searches for {@code targetId}.
     *
     * @param graph     the campus graph being explored
     * @param currentId location currently being explored
     * @param targetId  destination we are hunting for
     * @param visited   locations already explored in THIS traversal only
     * @return {@code true} if {@code targetId} is reachable from {@code currentId}
     */
    private static boolean dfs(CampusGraph graph, String currentId, String targetId, Set<String> visited) {
        // BASE CASE 1: reached the destination zone ->
        // connectivity between the two zones is confirmed.
        if (currentId.equals(targetId)) {
            return true;
        }

        // Mark the current location as visited BEFORE descending into its roads,
        // preventing the search from re-entering the same zone forever.
        visited.add(currentId);

        // RECURSIVE STEP: explore every road leaving the current location (depth-first).
        for (RoadEdge edge : graph.getAdjacentEdges(currentId)) {
            String neighborId = edge.getDestination().getId();

            // Only descend into zones we have not already seen in this traversal;
            // the visited set is what stops infinite recursion on cyclic roads.
            if (!visited.contains(neighborId)) {
                if (dfs(graph, neighborId, targetId, visited)) {
                    return true; // found the target deeper down this branch
                }
            }
        }

        // Exhausted every reachable road without finding the target -> NOT connected.
        return false;
    }
}