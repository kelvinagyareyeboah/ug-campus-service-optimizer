package com.ug.campus.datastructures;

import java.util.NoSuchElementException;

/**
 * CustomDeque.java
 * 
 * PURPOSE:
 * Implements a generic Double-Ended Queue (Deque) data structure using a
 * dynamic
 * Doubly Linked List internal storage architecture.
 * 
 * USE CASE IN UG SYSTEM:
 * Allows insertion and removal at both ends.
 * - addFront: Used for supervisor emergency jump-ins at the head of the request
 * queue.
 * - addRear: Standard service request queuing at the tail.
 * - removeFront / removeRear: Efficient processing from either end
 */
public class CustomDeque<T> {

    private static class Node<T> {
        T data;
        Node<T> next;
        Node<T> prev;

        Node(T data) {
            this.data = data;
        }
    }

    private Node<T> head;
    private Node<T> tail;
    private int size;

    public CustomDeque() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Inserts an element at the front of the deque (head).
     * Used for supervisor emergency jump-ins.
     * 
     * @param item the item to insert
     */
    public void addFront(T item) {
        Node<T> node = new Node<>(item);
        if (isEmpty()) {
            head = tail = node;
        } else {
            node.next = head;
            head.prev = node;
            head = node;
        }
        size++;
    }

    /**
     * Inserts an element at the rear of the deque (tail).
     * Used for standard service request queueing.
     * 
     * @param item the item to insert
     */
    public void addRear(T item) {
        Node<T> node = new Node<>(item);
        if (isEmpty()) {
            head = tail = node;
        } else {
            tail.next = node;
            node.prev = tail;
            tail = node;
        }
        size++;
    }

    /**
     * Removes and returns the element at the front of the deque (head).
     * 
     * @return the front element
     * @throws NoSuchElementException if the deque is empty
     */
    public T removeFront() {
        if (isEmpty()) {
            throw new NoSuchElementException("Deque is empty");
        }
        T data = head.data;
        head = head.next;
        if (head != null) {
            head.prev = null;
        } else {
            tail = null;
        }
        size--;
        return data;
    }

    /**
     * Removes and returns the element at the rear of the deque (tail).
     * 
     * @return the rear element
     * @throws NoSuchElementException if the deque is empty
     */
    public T removeRear() {
        if (isEmpty()) {
            throw new NoSuchElementException("Deque is empty");
        }
        T data = tail.data;
        tail = tail.prev;
        if (tail != null) {
            tail.next = null;
        } else {
            head = null;
        }
        size--;
        return data;
    }

    /**
     * Retrieves, but does not remove, the element at the front of the deque (head).
     * 
     * @return the front element
     * @throws NoSuchElementException if the deque is empty
     */
    public T peekFront() {
        if (isEmpty()) {
            throw new NoSuchElementException("Deque is empty");
        }
        return head.data;
    }

    /**
     * Retrieves, but does not remove, the element at the rear of the deque (tail).
     * 
     * @return the rear element
     * @throws NoSuchElementException if the deque is empty
     */
    public T peekRear() {
        if (isEmpty()) {
            throw new NoSuchElementException("Deque is empty");
        }
        return tail.data;
    }

    /**
     * Checks if the deque contains no elements.
     * 
     * @return true if deque is empty, false otherwise
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Returns the number of elements in the deque.
     * 
     * @return current size of deque
     */
    public int size() {
        return size;
    }
}
