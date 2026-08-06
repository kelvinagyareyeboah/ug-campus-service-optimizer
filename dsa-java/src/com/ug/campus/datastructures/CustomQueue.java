package com.ug.campus.datastructures;

import java.util.NoSuchElementException;

/**
 * CustomQueue.java
 * 
 * PURPOSE:
 * Implements a FIFO (First-In, First-Out) Queue data structure.
 * 
 * USE CASE IN UG SYSTEM:
 * Handles routine (non-emergency) service requests based strictly on submission time.
 * First request submitted is processed first.
 */
public class CustomQueue<T> {
    private static class Node<T> {
        T data;
        Node<T> next;
        Node(T data) { this.data = data; }
    }

    private Node<T> head;
    private Node<T> tail;
    private int size;

    public void enqueue(T item) {
        Node<T> node = new Node<>(item);
        if (tail != null) {
            tail.next = node;
        }
        tail = node;
        if (head == null) {
            head = tail;
        }
        size++;
    }

    public T dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        T data = head.data;
        head = head.next;
        if (head == null) {
            tail = null;
        }
        size--;
        return data;
    }

    public T peek() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        return head.data;
    }

    public boolean isEmpty() {
        return head == null;
    }

    public int size() {
        return size;
    }
}
