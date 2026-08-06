package com.ug.campus.algorithms;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.*;

/**
 * DijkstraShortestPath.java
 * 
 * PURPOSE:
 * Implements Dijkstra's Shortest Path Algorithm using a Priority Queue.
 * 
 * USE CASE IN UG SYSTEM:
 * Calculates the fastest / shortest navigation route from a maintenance team's current position
 * to a reported campus service location (e.g. from Main Gate to Balme Library).
 */
public class DijkstraShortestPath {

    public static class PathResult {
        public List<LocationNode> path;
        public double totalDistance;
        public double totalTravelTime;

        public PathResult(List<LocationNode> path, double totalDistance, double totalTravelTime) {
            this.path = path;
            this.totalDistance = totalDistance;
            this.totalTravelTime = totalTravelTime;
        }
    }

    private static class NodeDistance implements Comparable<NodeDistance> {
        String nodeId;
        double distance;

        NodeDistance(String nodeId, double distance) {
            this.nodeId = nodeId;
            this.distance = distance;
        }

        @Override
        public int compareTo(NodeDistance o) {
            return Double.compare(this.distance, o.distance);
        }
    }

    public static PathResult findShortestPath(CampusGraph graph, String sourceId, String destId) {
        Map<String, Double> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        PriorityQueue<NodeDistance> pq = new PriorityQueue<>();

        for (LocationNode node : graph.getAllLocations()) {
            distances.put(node.getId(), Double.MAX_VALUE);
        }

        distances.put(sourceId, 0.0);
        pq.add(new NodeDistance(sourceId, 0.0));

        while (!pq.isEmpty()) {
            NodeDistance current = pq.poll();
            String u = current.nodeId;

            if (u.equals(destId)) break;

            if (current.distance > distances.get(u)) continue;

            for (RoadEdge edge : graph.getAdjacentEdges(u)) {
                String v = edge.getDestination().getId();
                double weight = edge.getWeight(); // using weighted cost (distance + condition)

                if (distances.get(u) + weight < distances.get(v)) {
                    distances.put(v, distances.get(u) + weight);
                    previous.put(v, u);
                    pq.add(new NodeDistance(v, distances.get(v)));
                }
            }
        }

        // Reconstruct path
        List<LocationNode> path = new LinkedList<>();
        String curr = destId;
        if (previous.get(curr) == null && !curr.equals(sourceId)) {
            return new PathResult(path, Double.MAX_VALUE, Double.MAX_VALUE); // unreachable
        }

        double totalDist = 0;
        double totalTime = 0;

        while (curr != null) {
            path.add(0, graph.getLocation(curr));
            String prevId = previous.get(curr);
            if (prevId != null) {
                for (RoadEdge e : graph.getAdjacentEdges(prevId)) {
                    if (e.getDestination().getId().equals(curr)) {
                        totalDist += e.getDistance();
                        totalTime += e.getTravelTime();
                        break;
                    }
                }
            }
            curr = prevId;
        }

        return new PathResult(path, totalDist, totalTime);
    }
}
