package com.ug.campus.datastructures;

import java.util.Iterator;
import java.util.NoSuchElementException;

/**
 * CustomDeque.java
 * 
 * PURPOSE:
 * Implements a generic Double-Ended Queue (Deque) data structure using an internal Doubly Linked List.
 * Allows insertion, deletion, and inspection of elements from both ends (front and rear) in O(1) time.
 * 
 * USE CASE IN UG SYSTEM:
 * - Standard request queuing: Routine service requests are appended at the rear via addRear(T item).
 * - Supervisor emergency jump-ins: High-priority supervisor interventions or emergency escalations
 *   can be inserted at the front via addFront(T item) to preempt standard processing.
 * - Flexible dispatch & audit: Supports both FIFO (addRear/removeFront) and LIFO/rollback operations (addFront/removeFront, removeRear).
 * 
 * TIME COMPLEXITY:
 * - addFront(T item):    O(1)
 * - addRear(T item):     O(1)
 * - removeFront():       O(1)
 * - removeRear():        O(1)
 * - peekFront():         O(1)
 * - peekRear():          O(1)
 * - isEmpty():           O(1)
 * - size():              O(1)
 * - clear():             O(1)
 * 
 * @param <T> the type of elements stored in the deque
 */
public class CustomDeque<T> implements Iterable<T> {

    // Internal helper node representing an element in the doubly linked list
    private static class Node<T> {
        T data;
        Node<T> prev;
        Node<T> next;

        Node(T data) {
            this.data = data;
            this.prev = null;
            this.next = null;
        }
    }

    // Pointer to the head (front) node of the deque
    private Node<T> head;

    // Pointer to the tail (rear) node of the deque
    private Node<T> tail;

    // Stores the total number of elements currently present in the deque
    private int size;

    /**
     * Constructs an empty CustomDeque with null head/tail pointers and size 0.
     */
    public CustomDeque() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Inserts an element at the front (head) of the deque in O(1) time.
     * Used for supervisor emergency jump-ins and urgent service preemption.
     * 
     * @param item the element to add at the front
     * @throws IllegalArgumentException if item is null
     */
    public void addFront(T item) {
        if (item == null) {
            throw new IllegalArgumentException("Item cannot be null");
        }

        Node<T> newNode = new Node<>(item);

        if (isEmpty()) {
            head = tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }

        size++;
    }

    /**
     * Inserts an element at the rear (tail) of the deque in O(1) time.
     * Used for standard request queueing in order of submission.
     * 
     * @param item the element to add at the rear
     * @throws IllegalArgumentException if item is null
     */
    public void addRear(T item) {
        if (item == null) {
            throw new IllegalArgumentException("Item cannot be null");
        }

        Node<T> newNode = new Node<>(item);

        if (isEmpty()) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
        }

        size++;
    }

    /**
     * Removes and returns the element at the front (head) of the deque in O(1) time.
     * 
     * @return the element removed from the front
     * @throws NoSuchElementException if the deque is empty
     */
    public T removeFront() {
        if (isEmpty()) {
            throw new NoSuchElementException("Deque is empty: cannot remove from front");
        }

        T data = head.data;
        head = head.next;

        if (head == null) {
            tail = null;
        } else {
            head.prev = null;
        }

        size--;
        return data;
    }

    /**
     * Removes and returns the element at the rear (tail) of the deque in O(1) time.
     * 
     * @return the element removed from the rear
     * @throws NoSuchElementException if the deque is empty
     */
    public T removeRear() {
        if (isEmpty()) {
            throw new NoSuchElementException("Deque is empty: cannot remove from rear");
        }

        T data = tail.data;
        tail = tail.prev;

        if (tail == null) {
            head = null;
        } else {
            tail.next = null;
        }

        size--;
        return data;
    }

    /**
     * Retrieves, but does not remove, the element at the front (head) of the deque in O(1) time.
     * 
     * @return the front element
     * @throws NoSuchElementException if the deque is empty
     */
    public T peekFront() {
        if (isEmpty()) {
            throw new NoSuchElementException("Deque is empty: cannot peek front");
        }
        return head.data;
    }

    /**
     * Retrieves, but does not remove, the element at the rear (tail) of the deque in O(1) time.
     * 
     * @return the rear element
     * @throws NoSuchElementException if the deque is empty
     */
    public T peekRear() {
        if (isEmpty()) {
            throw new NoSuchElementException("Deque is empty: cannot peek rear");
        }
        return tail.data;
    }

    /**
     * Checks whether the deque contains zero elements in O(1) time.
     * 
     * @return true if the deque is empty, false otherwise
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Returns the total count of elements currently stored in the deque in O(1) time.
     * 
     * @return the number of elements in the deque
     */
    public int size() {
        return size;
    }

    /**
     * Clears all elements from the deque, resetting it to an empty state in O(1) time.
     */
    public void clear() {
        head = null;
        tail = null;
        size = 0;
    }

    /**
     * Returns an iterator over elements in this deque in proper sequence from front to rear.
     * 
     * @return an Iterator over the elements in front-to-rear order
     */
    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            private Node<T> current = head;

            @Override
            public boolean hasNext() {
                return current != null;
            }

            @Override
            public T next() {
                if (!hasNext()) {
                    throw new NoSuchElementException("No more elements in deque iterator");
                }
                T data = current.data;
                current = current.next;
                return data;
            }
        };
    }

    /**
     * Returns a string representation of the elements in the deque from front to rear.
     * 
     * @return formatted string representation of the deque
     */
    @Override
    public String toString() {
        if (isEmpty()) {
            return "[]";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        Node<T> current = head;
        while (current != null) {
            sb.append(current.data);
            if (current.next != null) {
                sb.append(", ");
            }
            current = current.next;
        }
        sb.append("]");
        return sb.toString();
    }
}
