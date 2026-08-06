package com.ug.campus.algorithms;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.*;

/**
 * PrimMST.java
 * 
 * PURPOSE:
 * Implements Prim's Minimum Spanning Tree (MST) algorithm.
 * 
 * USE CASE IN UG SYSTEM:
 * Finds the minimum cost connection network for campus infrastructure management
 * (e.g. optimal fiber optic cabling, pipe network layout across UG buildings).
 */
public class PrimMST {

    public static List<RoadEdge> getMinimumSpanningTree(CampusGraph graph) {
        List<RoadEdge> mst = new ArrayList<>();
        List<LocationNode> locations = graph.getAllLocations();
        if (locations.isEmpty()) return mst;

        Set<String> inMST = new HashSet<>();
        PriorityQueue<RoadEdge> pq = new PriorityQueue<>(Comparator.comparingDouble(RoadEdge::getWeight));

        // Start from first location
        LocationNode start = locations.get(0);
        inMST.add(start.getId());
        pq.addAll(graph.getAdjacentEdges(start.getId()));

        while (!pq.isEmpty() && inMST.size() < locations.size()) {
            RoadEdge minEdge = pq.poll();
            String destId = minEdge.getDestination().getId();

            if (inMST.contains(destId)) continue;

            inMST.add(destId);
            mst.add(minEdge);

            for (RoadEdge edge : graph.getAdjacentEdges(destId)) {
                if (!inMST.contains(edge.getDestination().getId())) {
                    pq.add(edge);
                }
            }
        }

        return mst;
    }
}
