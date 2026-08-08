package com.ug.campus.algorithms;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * DFSConnectivity.java
 *
 * PURPOSE:
 * Implements Depth-First Search (DFS) graph traversal on the UG Campus Graph.
 *
 * USE CASE IN UG SYSTEM:
 * - Verifies connectivity between distant campus zones, ensuring maintenance vehicles
 *   can reach a problem site and detecting isolated/disconnected road sections.
 * - Detects road-network cycles (e.g. alternative routes forming loops) so the team
 *   knows which portions of the campus road map are closed loops rather than dead ends.
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

    /**
     * Detects whether the campus road network contains any cycle (closed loop).
     *
     * CYCLES IN THE UG SYSTEM:
     * A cycle means roads loop back on themselves (e.g. Balme -> CS Dept -> Stadium ->
     * Commonwealth -> Balme). Knowing cycles exist helps plan reroute options for
     * maintenance vehicles when one section of a loop is blocked.
     *
     * ALGORITHM:
     * Standard undirected-graph cycle detection: DFS with a parent pointer. In an
     * undirected graph, any previously-seen neighbor that is NOT the incoming parent
     * proves the existence of a back edge -> a cycle exists.
     *
     * @param graph the {@link CampusGraph} to inspect
     * @return {@code true} if at least one cycle exists in the road network
     */
    public static boolean hasCycle(CampusGraph graph) {
        // Fresh visited set per call -> no stale state between calls.
        Set<String> visited = new HashSet<>();

        // The graph could be disconnected, so every zone must be tried as a DFS root.
        // Parent is null for a root: with no parent there is nothing to exclude.
        for (LocationNode node : graph.getAllLocations()) {
            if (!visited.contains(node.getId())) {
                if (hasCycle(graph, node.getId(), null, visited)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Recursive undirected cycle-detection helper.
     *
     * @param graph     the campus graph
     * @param currentId the location currently being examined
     * @param parentId  the location we came FROM ({@code null} for DFS roots);
     *                  in an undirected graph the reverse edge back to the parent is
     *                  NOT a cycle, so it must be explicitly skipped
     * @param visited   zones already explored in this traversal (shared across the
     *                  whole search so each zone is examined exactly once)
     * @return {@code true} if a cycle was found reachable from {@code currentId}
     */
    private static boolean hasCycle(CampusGraph graph, String currentId, String parentId, Set<String> visited) {
        visited.add(currentId);

        for (RoadEdge edge : graph.getAdjacentEdges(currentId)) {
            String neighborId = edge.getDestination().getId();

            // SKIP the edge that leads back to where we just came from:
            // A->B and B->A is just the same undirected road taken twice, NOT a loop.
            if (neighborId.equals(parentId)) {
                continue;
            }

            // A neighbor that is already visited (and is not the parent) means we found
            // a back edge -> the road network contains a cycle.
            if (visited.contains(neighborId)) {
                return true;
            }

            // Recurse deeper; if the subtree reports a cycle, propagate it upward.
            if (hasCycle(graph, neighborId, currentId, visited)) {
                return true;
            }
        }
        return false;
    }
}