package com.ug.campus.datastructures;

public class CustomCircularQueueTest {

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("   CUSTOM CIRCULAR QUEUE TEST SUITE");
        System.out.println("=================================================\n");

        testBasicOperations();
        testCircularBehaviour();
        testFullQueue();
        testEmptyQueue();
        testPeek();

        System.out.println("\nAll CustomCircularQueue tests passed successfully!");
    }

    public static void testBasicOperations() {
        CustomCircularQueue<String> queue = new CustomCircularQueue<>(3);

        System.out.println("Testing basic enqueue and dequeue operations...");

        if (!queue.isEmpty()) {
            throw new AssertionError("Queue should initially be empty");
        }

        queue.enqueue("A");
        queue.enqueue("B");
        queue.enqueue("C");

        if (!queue.isFull()) {
            throw new AssertionError("Queue should be full");
        }

        if (!queue.dequeue().equals("A")) {
            throw new AssertionError("First dequeued item should be A");
        }

        if (!queue.dequeue().equals("B")) {
            throw new AssertionError("Second dequeued item should be B");
        }

        if (!queue.dequeue().equals("C")) {
            throw new AssertionError("Third dequeued item should be C");
        }

        if (!queue.isEmpty()) {
            throw new AssertionError("Queue should be empty after removing all items");
        }

        System.out.println("-> Basic operations passed.");
    }

    public static void testCircularBehaviour() {
        CustomCircularQueue<String> queue = new CustomCircularQueue<>(3);

        System.out.println("Testing circular queue behaviour...");

        queue.enqueue("A");
        queue.enqueue("B");
        queue.enqueue("C");

        queue.dequeue();

        queue.enqueue("D");

        if (!queue.dequeue().equals("B")) {
            throw new AssertionError("Expected B after circular wrap-around");
        }

        if (!queue.dequeue().equals("C")) {
            throw new AssertionError("Expected C after circular wrap-around");
        }

        if (!queue.dequeue().equals("D")) {
            throw new AssertionError("Expected D after circular wrap-around");
        }

        System.out.println("-> Circular behaviour passed.");
    }

    public static void testFullQueue() {
        CustomCircularQueue<String> queue = new CustomCircularQueue<>(2);

        System.out.println("Testing full queue exception...");

        queue.enqueue("A");
        queue.enqueue("B");

        boolean exceptionCaught = false;

        try {
            queue.enqueue("C");
        } catch (IllegalStateException e) {
            exceptionCaught = true;
        }

        if (!exceptionCaught) {
            throw new AssertionError("Enqueue on full queue should throw an exception");
        }

        System.out.println("-> Full queue exception test passed.");
    }

    public static void testEmptyQueue() {
        CustomCircularQueue<String> queue = new CustomCircularQueue<>(2);

        System.out.println("Testing empty queue exceptions...");

        boolean dequeueException = false;

        try {
            queue.dequeue();
        } catch (IllegalStateException e) {
            dequeueException = true;
        }

        if (!dequeueException) {
            throw new AssertionError("Dequeue on empty queue should throw an exception");
        }

        boolean peekException = false;

        try {
            queue.peek();
        } catch (IllegalStateException e) {
            peekException = true;
        }

        if (!peekException) {
            throw new AssertionError("Peek on empty queue should throw an exception");
        }

        System.out.println("-> Empty queue exception tests passed.");
    }

    public static void testPeek() {
        CustomCircularQueue<String> queue = new CustomCircularQueue<>(3);

        System.out.println("Testing peek operation...");

        queue.enqueue("A");

        if (!queue.peek().equals("A")) {
            throw new AssertionError("Peek should return A");
        }

        if (queue.isEmpty()) {
            throw new AssertionError("Peek should not remove the item");
        }

        if (!queue.peek().equals("A")) {
            throw new AssertionError("Peek should still return A");
        }

        System.out.println("-> Peek test passed.");
    }
}