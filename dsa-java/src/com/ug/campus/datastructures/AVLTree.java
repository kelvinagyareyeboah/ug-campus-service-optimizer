package com.ug.campus.datastructures;

/**
 * AVLTree.java
 * 
 * PURPOSE:
 * Implements a Self-Balancing Binary Search Tree (AVL Tree).
 * 
 * USE CASE IN UG SYSTEM:
 * Maintains strict O(log n) search performance when dataset scales dynamically,
 * preventing BST degeneration (skewness) as thousands of requests accumulate.
 */
public class AVLTree<K extends Comparable<K>, V> {
    private class Node {
        K key;
        V value;
        int height;
        Node left, right;

        Node(K key, V value) {
            this.key = key;
            this.value = value;
            this.height = 1;
        }
    }

    private Node root;

    private int height(Node n) {
        return n == null ? 0 : n.height;
    }

    private int getBalance(Node n) {
        return n == null ? 0 : height(n.left) - height(n.right);
    }

    private Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    private Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    public void insert(K key, V value) {
        root = insertRec(root, key, value);
    }

    private Node insertRec(Node node, K key, V value) {
        if (node == null) return new Node(key, value);

        int cmp = key.compareTo(node.key);
        if (cmp < 0) node.left = insertRec(node.left, key, value);
        else if (cmp > 0) node.right = insertRec(node.right, key, value);
        else { node.value = value; return node; }

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);

        // Left Left Case
        if (balance > 1 && key.compareTo(node.left.key) < 0) return rightRotate(node);
        // Right Right Case
        if (balance < -1 && key.compareTo(node.right.key) > 0) return leftRotate(node);
        // Left Right Case
        if (balance > 1 && key.compareTo(node.left.key) > 0) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        // Right Left Case
        if (balance < -1 && key.compareTo(node.right.key) < 0) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }

        return node;
    }

    public V search(K key) {
        Node curr = root;
        while (curr != null) {
            int cmp = key.compareTo(curr.key);
            if (cmp < 0) curr = curr.left;
            else if (cmp > 0) curr = curr.right;
            else return curr.value;
        }
        return null;
    }
}
