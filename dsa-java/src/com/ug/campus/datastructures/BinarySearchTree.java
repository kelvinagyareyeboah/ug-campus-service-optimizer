package com.ug.campus.datastructures;

/**
 * BinarySearchTree.java
 * 
 * PURPOSE:
 * Implements a Binary Search Tree (BST).
 * 
 * USE CASE IN UG SYSTEM:
 * Enables organized, key-sorted searching and range queries of campus requests by:
 * - Request ID
 * - Priority Level
 * - Timestamp / Date
 */
public class BinarySearchTree<K extends Comparable<K>, V> {
    private class Node {
        K key;
        V value;
        Node left, right;

        Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    private Node root;
    private int size;

    public void insert(K key, V value) {
        root = insertRec(root, key, value);
    }

    private Node insertRec(Node current, K key, V value) {
        if (current == null) {
            size++;
            return new Node(key, value);
        }
        int cmp = key.compareTo(current.key);
        if (cmp < 0) current.left = insertRec(current.left, key, value);
        else if (cmp > 0) current.right = insertRec(current.right, key, value);
        else current.value = value; // update value if duplicate key
        return current;
    }

    public V search(K key) {
        return searchRec(root, key);
    }

    private V searchRec(Node current, K key) {
        if (current == null) return null;
        int cmp = key.compareTo(current.key);
        if (cmp < 0) return searchRec(current.left, key);
        else if (cmp > 0) return searchRec(current.right, key);
        else return current.value;
    }

    public int size() {
        return size;
    }
}
