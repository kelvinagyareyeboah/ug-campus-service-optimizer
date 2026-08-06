package com.ug.campus.datastructures;

import java.util.Arrays;
import java.util.NoSuchElementException;

/**
 * CustomPriorityQueue.java
 * 
 * PURPOSE:
 * Implements a Max-Binary Heap Priority Queue.
 * 
 * USE CASE IN UG SYSTEM:
 * Priority Preemption for emergency campus issues (e.g. power outage, major pipe burst).
 * Higher priority items are dequeued ahead of lower priority items, regardless of arrival order.
 */
public class CustomPriorityQueue<T extends Comparable<T>> {
    private T[] heap;
    private int size;
    private static final int DEFAULT_CAPACITY = 16;

    @SuppressWarnings("unchecked")
    public CustomPriorityQueue() {
        heap = (T[]) new Comparable[DEFAULT_CAPACITY];
        size = 0;
    }

    public void insert(T item) {
        if (size == heap.length) {
            heap = Arrays.copyOf(heap, heap.length * 2);
        }
        heap[size] = item;
        swim(size);
        size++;
    }

    public T extractMax() {
        if (isEmpty()) {
            throw new NoSuchElementException("Priority Queue is empty");
        }
        T max = heap[0];
        heap[0] = heap[size - 1];
        heap[size - 1] = null;
        size--;
        sink(0);
        return max;
    }

    public T peek() {
        if (isEmpty()) {
            throw new NoSuchElementException("Priority Queue is empty");
        }
        return heap[0];
    }

    private void swim(int k) {
        while (k > 0 && less((k - 1) / 2, k)) {
            swap((k - 1) / 2, k);
            k = (k - 1) / 2;
        }
    }

    private void sink(int k) {
        while (2 * k + 1 < size) {
            int j = 2 * k + 1;
            if (j + 1 < size && less(j, j + 1)) j++;
            if (!less(k, j)) break;
            swap(k, j);
            k = j;
        }
    }

    private boolean less(int i, int j) {
        return heap[i].compareTo(heap[j]) < 0;
    }

    private void swap(int i, int j) {
        T temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }
}
