package com.ug.campus.datastructures;

/**
 * CustomLinkedList.java
 * 
 * PURPOSE:
 * Implements a dynamic Doubly-Linked List.
 * 
 * USE CASE IN UG SYSTEM:
 * Manages dynamic collections of requests, teams, or status logs without fixed-size array limits.
 */
public class CustomLinkedList<T> {
    public static class Node<T> {
        public T data;
        public Node<T> next;
        public Node<T> prev;

        public Node(T data) {
            this.data = data;
        }
    }

    private Node<T> head;
    private Node<T> tail;
    private int size;

    public void addLast(T item) {
        Node<T> node = new Node<>(item);
        if (tail == null) {
            head = tail = node;
        } else {
            tail.next = node;
            node.prev = tail;
            tail = node;
        }
        size++;
    }

    public void addFirst(T item) {
        Node<T> node = new Node<>(item);
        if (head == null) {
            head = tail = node;
        } else {
            node.next = head;
            head.prev = node;
            head = node;
        }
        size++;
    }

    public boolean remove(T item) {
        Node<T> curr = head;
        while (curr != null) {
            if (curr.data.equals(item)) {
                if (curr.prev != null) curr.prev.next = curr.next;
                else head = curr.next;
                if (curr.next != null) curr.next.prev = curr.prev;
                else tail = curr.prev;
                size--;
                return true;
            }
            curr = curr.next;
        }
        return false;
    }

    public Node<T> getHead() { return head; }
    public Node<T> getTail() { return tail; }
    public int size() { return size; }
    public boolean isEmpty() { return size == 0; }
}
