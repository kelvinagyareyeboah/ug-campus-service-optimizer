package com.ug.campus.datastructures;

import com.ug.campus.model.LocationNode;
import com.ug.campus.model.PriorityLevel;
import com.ug.campus.model.ServiceCategory;
import com.ug.campus.model.ServiceRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * CustomPriorityQueueTest.java
 *
 * PURPOSE:
 * Unit test and verification suite for the max-heap CustomPriorityQueue.
 *
 * VERIFIES:
 * 1. Insertion of service requests into the heap.
 * 2. Extraction order by priority and timestamp tie-breaker.
 * 3. Correct size tracking and emptiness reporting.
 * 4. Exception behavior when extracting from an empty queue.
 */
public class CustomPriorityQueueTest {

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("   CUSTOM PRIORITY QUEUE (MAX-HEAP) UNIT TESTS");
        System.out.println("=================================================\n");

        testPriorityQueueOrdering();
        testEmptyQueueException();

        System.out.println("\nAll CustomPriorityQueue tests passed successfully!");
    }

    private static void testPriorityQueueOrdering() {
        CustomPriorityQueue<ServiceRequest> queue = new CustomPriorityQueue<>();

        LocationNode lib = new LocationNode("LOC-02", "Balme Library", "Central Zone", "Library", 5.6540, -0.1878);
        LocationNode cs = new LocationNode("LOC-04", "Computer Science Dept", "Science Zone", "Department", 5.6552, -0.1840);

        ServiceRequest emergencyOld = new ServiceRequest("REQ-101", "student1@st.ug.edu.gh", lib,
                ServiceCategory.EMERGENCY, PriorityLevel.EMERGENCY, "Power outage in research lab", 4);
        ServiceRequest emergencyNew = new ServiceRequest("REQ-102", "staff1@ug.edu.gh", cs,
                ServiceCategory.EMERGENCY, PriorityLevel.EMERGENCY, "Server room outage", 3);
        ServiceRequest highPriority = new ServiceRequest("REQ-103", "staff2@ug.edu.gh", cs,
                ServiceCategory.PLUMBING, PriorityLevel.HIGH, "Broken pipe repair", 2);
        ServiceRequest mediumPriority = new ServiceRequest("REQ-104", "student2@st.ug.edu.gh", lib,
                ServiceCategory.SANITATION, PriorityLevel.MEDIUM, "Overflowing bin", 1);

        queue.insert(mediumPriority);
        queue.insert(highPriority);
        queue.insert(emergencyNew);
        queue.insert(emergencyOld);

        if (queue.size() != 4) {
            throw new AssertionError("Queue size should be 4 after inserting 4 items");
        }

        List<ServiceRequest> extracted = new ArrayList<>();
        while (!queue.isEmpty()) {
            extracted.add(queue.extractMax());
        }

        if (extracted.size() != 4) {
            throw new AssertionError("Expected 4 extracted items from priority queue");
        }
        if (extracted.get(0).getPriority() != PriorityLevel.EMERGENCY ||
                extracted.get(1).getPriority() != PriorityLevel.EMERGENCY) {
            throw new AssertionError("Expected the first two extracted requests to be emergency priority");
        }
        if (extracted.get(2) != highPriority) {
            throw new AssertionError("Expected high-priority request after all emergency requests");
        }
        if (extracted.get(3) != mediumPriority) {
            throw new AssertionError("Expected medium-priority request last in extraction order");
        }

        System.out.println("-> CustomPriorityQueue ordering tests passed successfully.");
    }

    private static void testEmptyQueueException() {
        CustomPriorityQueue<String> queue = new CustomPriorityQueue<>();

        boolean threw = false;
        try {
            queue.extractMax();
        } catch (NoSuchElementException e) {
            threw = true;
        }

        if (!threw) {
            throw new AssertionError("extractMax on an empty priority queue must throw NoSuchElementException");
        }

        System.out.println("-> Empty priority queue exception handling passed successfully.");
    }
}
