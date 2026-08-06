package com.ug.campus.datastructures;

import java.util.EmptyStackException;

/**
 * CustomStack.java
 * 
 * PURPOSE:
 * Implements a LIFO (Last-In, First-Out) Stack data structure.
 * 
 * USE CASE IN UG SYSTEM:
 * Request history log & audit trails (e.g., tracking recent actions: request created, team assigned,
 * status changed, with undo/rollback functionality).
 */
public class CustomStack<T> {
    private static class Node<T> {
        T data;
        Node<T> next;
        Node(T data, Node<T> next) {
            this.data = data;
            this.next = next;
        }
    }

    private Node<T> top;
    private int size;

    public void push(T item) {
        top = new Node<>(item, top);
        size++;
    }

    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        T data = top.data;
        top = top.next;
        size--;
        return data;
    }

    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return top.data;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public int size() {
        return size;
    }
}
