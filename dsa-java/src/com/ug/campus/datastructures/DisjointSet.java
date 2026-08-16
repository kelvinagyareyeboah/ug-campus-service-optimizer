package com.ug.campus.datastructures;

import java.util.HashMap;
import java.util.Map;

/**
 * DisjointSet.java
 * 
 * Assigned Member: Person 14
 * Purpose: Standalone Disjoint-Set (Union-Find) with path compression and rank optimization.
 */
public class DisjointSet {
    private final Map<String, String> parent = new HashMap<>();
    private final Map<String, Integer> rank = new HashMap<>();

    public void makeSet(String id) {
        parent.put(id, id);
        rank.put(id, 0);
    }

    public String find(String id) {
        if (parent.get(id).equals(id)) {
            return id;
        }

        parent.put(id, find(parent.get(id)));
        return parent.get(id);
    }

    public boolean union(String id1, String id2) {
        String root1 = find(id1);
        String root2 = find(id2);

        if (root1.equals(root2)) {
            return false;
        }

        int rank1 = rank.get(root1);
        int rank2 = rank.get(root2);

        if (rank1 < rank2) {
            parent.put(root1, root2);
        } else if (rank1 > rank2) {
            parent.put(root2, root1);
        } else {
            parent.put(root2, root1);
            rank.put(root1, rank1 + 1);
        }

        return true;
    }
}
