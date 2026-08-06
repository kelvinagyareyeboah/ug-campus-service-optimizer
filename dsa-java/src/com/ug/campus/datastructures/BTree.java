package com.ug.campus.datastructures;

/**
 * BTree.java
 * 
 * PURPOSE:
 * Implements a simplified Multi-way B-Tree structure.
 * 
 * USE CASE IN UG SYSTEM:
 * Demonstrates database-style disk indexing for large request volumes,
 * mimicking database indexes used in PostgreSQL / Supabase storage.
 */
public class BTree<K extends Comparable<K>, V> {
    private static final int M = 4; // B-Tree degree (max children per node = M)

    private static class Node {
        int m;
        Entry[] children = new Entry[M];
        Node(int k) { m = k; }
    }

    private static class Entry {
        Comparable key;
        Object val;
        Node next;
        Entry(Comparable key, Object val, Node next) {
            this.key = key;
            this.val = val;
            this.next = next;
        }
    }

    private Node root;

    public BTree() {
        root = new Node(0);
    }

    @SuppressWarnings("unchecked")
    public V search(K key) {
        return search(root, key, 0);
    }

    @SuppressWarnings("unchecked")
    private V search(Node x, K key, int ht) {
        Entry[] children = x.children;

        // External node (leaf)
        if (ht == 0) {
            for (int j = 0; j < x.m; j++) {
                if (eq(key, children[j].key)) return (V) children[j].val;
            }
        } else {
            for (int j = 0; j < x.m; j++) {
                if (j + 1 == x.m || less(key, children[j + 1].key))
                    return search(children[j].next, key, ht - 1);
            }
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private boolean eq(Comparable k1, Comparable k2) { return k1.compareTo(k2) == 0; }
    @SuppressWarnings("unchecked")
    private boolean less(Comparable k1, Comparable k2) { return k1.compareTo(k2) < 0; }
}
