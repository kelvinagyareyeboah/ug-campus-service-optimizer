package com.ug.campus.algorithms;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DFSConnectivity {

    public static boolean isConnected(CampusGraph graph, String startId, String targetId) {
        Set<String> visited = new HashSet<>();
        return dfs(graph, startId, targetId, visited);
    }

    private static boolean dfs(CampusGraph graph, String currentId, String targetId, Set<String> visited) {
        if (currentId.equals(targetId)) {
            return true;
        }

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

    public static boolean hasCycle(CampusGraph graph) {
        Set<String> visited = new HashSet<>();
        for (LocationNode node : graph.getAllLocations()) {
            if (!visited.contains(node.getId())) {
                if (hasCycle(graph, node.getId(), null, visited)) {
                    return true;
                }
            }
        }
        return false;
    }

    private static boolean hasCycle(CampusGraph graph, String currentId, String parentId, Set<String> visited) {
        visited.add(currentId);

        for (RoadEdge edge : graph.getAdjacentEdges(currentId)) {
            String neighborId = edge.getDestination().getId();

            if (neighborId.equals(parentId)) {
                continue;
            }

            if (visited.contains(neighborId)) {
                return true;
            }

            if (hasCycle(graph, neighborId, currentId, visited)) {
                return true;
            }
        }
        return false;
    }

    public static List<String> collectTraversal(CampusGraph graph, String startId) {
        Set<String> visited = new HashSet<>();
        List<String> discoveryOrder = new ArrayList<>();
        collectTraversal(graph, startId, visited, discoveryOrder);
        return discoveryOrder;
    }

    private static void collectTraversal(CampusGraph graph, String currentId,
                                         Set<String> visited, List<String> discoveryOrder) {
        visited.add(currentId);
        discoveryOrder.add(currentId);

        for (RoadEdge edge : graph.getAdjacentEdges(currentId)) {
            String neighborId = edge.getDestination().getId();
            if (!visited.contains(neighborId)) {
                collectTraversal(graph, neighborId, visited, discoveryOrder);
            }
        }
    }
}