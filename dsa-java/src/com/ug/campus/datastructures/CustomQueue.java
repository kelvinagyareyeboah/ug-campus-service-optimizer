package com.ug.campus.datastructures;

import java.util.NoSuchElementException;

/**
 * CustomQueue.java
 * 
 * PURPOSE:
 * Implements a FIFO (First-In, First-Out) Queue data structure using a singly linked list.
 * 
 * USE CASE IN UG SYSTEM:
 * Handles routine (non-emergency) service requests based strictly on submission time.
 * First request submitted is processed first (FIFO order).
 * 
 * @param <T> the type of elements stored in the queue
 */
public class CustomQueue<T> {

    // Internal helper node class representing each node in the queue's singly linked list
    private static class Node<T> {
        T data;
        Node<T> next;

        // Constructor to initialize a node with data and null next pointer
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }

    // Pointer to the head (front) node of the queue where elements are dequeued
    private Node<T> head;

    // Pointer to the tail (rear) node of the queue where new elements are enqueued
    private Node<T> tail;

    // Stores the total number of elements currently present in the queue
    private int size;

    // Initializes an empty CustomQueue with null pointers and zero size
    public CustomQueue() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Adds a new item to the back (tail) of the queue in O(1) time complexity
    public void enqueue(T item) {
        // Create a new node containing the specified item
        Node<T> node = new Node<>(item);

        // If the queue is not empty, attach the new node after the current tail
        if (tail != null) {
            tail.next = node;
        }

        // Move the tail reference to point to the newly added node
        tail = node;

        // If the queue was empty, set head to point to the new node as well
        if (head == null) {
            head = tail;
        }

        // Increment the size of the queue
        size++;
    }

    // Removes and returns the item at the front (head) of the queue in O(1) time complexity
    public T dequeue() {
        // Check if the queue is empty before removing an element
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }

        // Retrieve data from the front node
        T data = head.data;

        // Advance head reference to the next node in the queue
        head = head.next;

        // If the queue becomes empty after removal, reset tail pointer to null
        if (head == null) {
            tail = null;
        }

        // Decrement the size of the queue
        size--;

        // Return the dequeued item
        return data;
    }

    // Returns the item at the front (head) of the queue without removing it in O(1) time complexity
    public T peek() {
        // Check if the queue is empty before peeking
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }

        // Return the data stored at the head node
        return head.data;
    }

    // Checks whether the queue contains zero elements in O(1) time complexity
    public boolean isEmpty() {
        // Return true if head is null, indicating an empty queue
        return head == null;
    }

    // Returns the total count of elements currently stored in the queue in O(1) time complexity
    public int size() {
        // Return the current size counter
        return size;
    }
}

