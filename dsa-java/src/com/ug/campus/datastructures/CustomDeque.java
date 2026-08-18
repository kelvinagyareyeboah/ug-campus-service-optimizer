package com.ug.campus.datastructures;

public class CustomDeque<T> {

    private static class Node<T> {
        T item;
        Node<T> prev;
        Node<T> next;

        Node(T item) {
            this.item = item;
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

    public void addFront(T item) {
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

    public void addRear(T item) {
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

    public T removeFront() {
        if (isEmpty()) {
            throw new IllegalStateException("Deque is empty!");
        }
        T item = head.item;
        head = head.next;
        if (head != null) {
            head.prev = null;
        } else {
            tail = null;
        }
        size--;
        return item;
    }

    public T removeRear() {
        if (isEmpty()) {
            throw new IllegalStateException("Deque is empty!");
        }
        T item = tail.item;
        tail = tail.prev;
        if (tail != null) {
            tail.next = null;
        } else {
            head = null;
        }
        size--;
        return item;
    }

    public T peekFront() {
        return isEmpty() ? null : head.item;
    }

    public T peekRear() {
        return isEmpty() ? null : tail.item;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }
}
