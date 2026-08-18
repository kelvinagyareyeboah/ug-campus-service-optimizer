package com.ug.campus.datastructures;

public class CustomCircularQueue<T> {

    private final T[] data;
    private int front;
    private int rear;
    private int count;
    private final int capacity;

    @SuppressWarnings("unchecked")
    public CustomCircularQueue(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be greater than 0");
        }
        this.capacity = capacity;
        this.data = (T[]) new Object[capacity];
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }

    public boolean enqueue(T item) {
        if (isFull()) {
            throw new IllegalStateException("Queue is full!");
        }
        data[rear] = item;
        rear = (rear + 1) % capacity;
        count++;
        return true;
    }

    public T dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty!");
        }
        T item = data[front];
        data[front] = null;
        front = (front + 1) % capacity;
        count--;
        return item;
    }

    public T peek() {
        if (isEmpty()) {
            return null;
        }
        return data[front];
    }

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == capacity;
    }

    public int size() {
        return count;
    }

    public int getCapacity() {
        return capacity;
    }
}
