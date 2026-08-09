package com.ug.campus.datastructures;

import com.ug.campus.model.LocationNode;
import com.ug.campus.model.PriorityLevel;
import com.ug.campus.model.ServiceCategory;
import com.ug.campus.model.ServiceRequest;

import java.util.NoSuchElementException;

/**
 * CustomQueueTest.java
 * 
 * PURPOSE:
 * Unit test and verification suite for CustomQueue data structure.
 * 
 * VERIFIES:
 * 1. Enqueueing items (FIFO order)
 * 2. Dequeueing items in submission timestamp order
 * 3. Peeking at the head item without removal
 * 4. Checking queue emptiness with isEmpty()
 * 5. Tracking size correctly across enqueue and dequeue operations
 * 6. Handling boundary cases such as dequeueing from an empty queue
 */
public class CustomQueueTest {

    // Main method to run all CustomQueue tests and report verification results
    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("   CUSTOM QUEUE (FIFO) UNIT TEST SUITE");
        System.out.println("=================================================\n");

        // Execute standard FIFO queue operations test suite
        testQueueOperations();

        // Execute empty queue boundary exception test suite
        testEmptyQueueExceptions();

        System.out.println("\nAll CustomQueue tests passed successfully!");
    }

    // Tests standard FIFO queue operations: enqueue, dequeue, peek, isEmpty, size
    public static void testQueueOperations() {
        // Instantiate a new FIFO CustomQueue for ServiceRequest objects
        CustomQueue<ServiceRequest> queue = new CustomQueue<>();

        // Verify initial state of newly created queue
        System.out.println("Testing initial empty queue state...");
        if (!queue.isEmpty() || queue.size() != 0) {
            throw new AssertionError("Queue should initially be empty with size 0");
        }

        // Create sample routine service requests representing submission order
        LocationNode lib = new LocationNode("LOC-02", "Balme Library", "Central Zone", "Library", 5.6540, -0.1878);
        LocationNode cs = new LocationNode("LOC-04", "Computer Science Dept", "Science Zone", "Department", 5.6552, -0.1840);

        ServiceRequest req1 = new ServiceRequest("REQ-101", "student1@st.ug.edu.gh", lib,
                ServiceCategory.SANITATION, PriorityLevel.LOW, "Routine bin emptying", 1);
        ServiceRequest req2 = new ServiceRequest("REQ-102", "staff1@ug.edu.gh", cs,
                ServiceCategory.FACILITY, PriorityLevel.MEDIUM, "Door hinge lubrication", 1);

        // Test enqueue operation for the first request
        System.out.println("Testing enqueue operation...");
        queue.enqueue(req1);

        // Check state after first enqueue
        if (queue.isEmpty() || queue.size() != 1 || queue.peek() != req1) {
            throw new AssertionError("Queue state incorrect after enqueueing req1");
        }

        // Test enqueue operation for the second request
        queue.enqueue(req2);

        // Check state after second enqueue
        if (queue.size() != 2 || queue.peek() != req1) {
            throw new AssertionError("Queue state incorrect after enqueueing req2");
        }

        // Test dequeue operation ensuring First-In-First-Out (FIFO) ordering
        System.out.println("Testing dequeue operation (FIFO order)...");
        ServiceRequest dequeued1 = queue.dequeue();

        // Verify first dequeued item matches req1
        if (dequeued1 != req1 || queue.size() != 1 || queue.peek() != req2) {
            throw new AssertionError("First dequeued item must be req1 and head must shift to req2");
        }

        // Dequeue second request
        ServiceRequest dequeued2 = queue.dequeue();

        // Verify second dequeued item matches req2 and queue becomes empty
        if (dequeued2 != req2 || !queue.isEmpty() || queue.size() != 0) {
            throw new AssertionError("Second dequeued item must be req2 and queue should now be empty");
        }

        System.out.println("-> FIFO queue operations (enqueue, dequeue, peek, isEmpty, size) passed successfully.");
    }

    // Tests exception handling when invoking dequeue or peek on an empty queue
    public static void testEmptyQueueExceptions() {
        // Instantiate empty CustomQueue instance
        CustomQueue<String> queue = new CustomQueue<>();

        // Verify exception throwing on empty queue dequeue
        boolean caughtDequeue = false;
        try {
            queue.dequeue();
        } catch (NoSuchElementException e) {
            caughtDequeue = true;
        }
        if (!caughtDequeue) {
            throw new AssertionError("Dequeue on empty queue must throw NoSuchElementException");
        }

        // Verify exception throwing on empty queue peek
        boolean caughtPeek = false;
        try {
            queue.peek();
        } catch (NoSuchElementException e) {
            caughtPeek = true;
        }
        if (!caughtPeek) {
            throw new AssertionError("Peek on empty queue must throw NoSuchElementException");
        }

        System.out.println("-> Empty queue exception handling tests passed successfully.");
    }
}
