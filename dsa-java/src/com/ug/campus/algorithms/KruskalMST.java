package com.ug.campus.algorithms;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.RoadEdge;

import java.util.*;

/**
 * KruskalMST.java
 * 
 * PURPOSE:
 * Implements Kruskal's Minimum Spanning Tree algorithm using a Disjoint-Set (Union-Find) structure.
 * 
 * USE CASE IN UG SYSTEM:
 * Alternative minimum spanning network strategy for campus-wide road repairs or service coverage network planning.
 */
public class KruskalMST {

    private static class DisjointSet {
        private Map<String, String> parent = new HashMap<>();

        public void makeSet(String id) {
            parent.put(id, id);
        }

        public String find(String id) {
            if (parent.get(id).equals(id)) return id;
            String root = find(parent.get(id));
            parent.put(id, root); // path compression
            return root;
        }

        public boolean union(String id1, String id2) {
            String root1 = find(id1);
            String root2 = find(id2);
            if (root1.equals(root2)) return false;
            parent.put(root1, root2);
            return true;
        }
    }

    public static List<RoadEdge> getMinimumSpanningTree(CampusGraph graph) {
        List<RoadEdge> mst = new ArrayList<>();
        DisjointSet ds = new DisjointSet();

        for (LocationNode node : graph.getAllLocations()) {
            ds.makeSet(node.getId());
        }

        List<RoadEdge> edges = new ArrayList<>(graph.getAllEdges());
        edges.sort(Comparator.comparingDouble(RoadEdge::getWeight));

        for (RoadEdge edge : edges) {
            if (ds.union(edge.getSource().getId(), edge.getDestination().getId())) {
                mst.add(edge);
            }
        }

        return mst;
    }
}
