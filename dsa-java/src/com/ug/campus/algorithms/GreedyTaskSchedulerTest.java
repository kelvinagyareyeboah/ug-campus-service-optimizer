package com.ug.campus.algorithms;

import com.ug.campus.model.LocationNode;
import com.ug.campus.model.PriorityLevel;
import com.ug.campus.model.ServiceCategory;
import com.ug.campus.model.ServiceRequest;

import java.util.ArrayList;
import java.util.List;

/**
 * GreedyTaskSchedulerTest.java
 * 
 * PURPOSE:
 * Unit test and verification suite for GreedyTaskScheduler algorithm.
 * 
 * VERIFIES:
 * 1. Sorting requests greedily by highest priority first
 * 2. Breaking priority ties by selecting shortest estimated duration first
 * 3. Selecting a batch of requests within available shift hour constraints
 * 4. Boundary cases (empty request list, zero/negative shift capacity)
 */
public class GreedyTaskSchedulerTest {

    // Main method to execute all GreedyTaskScheduler unit tests
    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("   GREEDY TASK SCHEDULER UNIT TEST SUITE");
        System.out.println("=================================================\n");

        // Run greedy sorting test suite
        testGreedySorting();

        // Run greedy batch selection test suite
        testGreedyBatchSelection();

        // Run boundary condition test suite
        testBoundaryCases();

        System.out.println("\nAll GreedyTaskScheduler tests passed successfully!");
    }

    // Tests greedy sorting order: higher priority weight first, then shorter duration
    public static void testGreedySorting() {
        System.out.println("Testing greedy sorting order (Priority weight -> Shortest duration)...");
        LocationNode loc = new LocationNode("LOC-01", "Main Gate", "Zone A", "Gate", 5.65, -0.18);

        // Create test requests with varying priorities and durations
        ServiceRequest emergencyLong = new ServiceRequest("REQ-01", "u1@ug.edu.gh", loc,
                ServiceCategory.EMERGENCY, PriorityLevel.EMERGENCY, "Power outage", 4);

        ServiceRequest highLong = new ServiceRequest("REQ-02", "u2@ug.edu.gh", loc,
                ServiceCategory.PLUMBING, PriorityLevel.HIGH, "Pipe leak", 3);

        ServiceRequest highShort = new ServiceRequest("REQ-03", "u3@ug.edu.gh", loc,
                ServiceCategory.PLUMBING, PriorityLevel.HIGH, "Faucet drip", 1);

        ServiceRequest medium = new ServiceRequest("REQ-04", "u4@ug.edu.gh", loc,
                ServiceCategory.SANITATION, PriorityLevel.MEDIUM, "Trash bin", 2);

        List<ServiceRequest> requests = new ArrayList<>();
        requests.add(medium);
        requests.add(highLong);
        requests.add(emergencyLong);
        requests.add(highShort);

        // Perform greedy sorting
        List<ServiceRequest> sorted = GreedyTaskScheduler.sortGreedily(requests);

        // Verify sorted order
        if (sorted.get(0) != emergencyLong) {
            throw new AssertionError("First sorted item must be EMERGENCY priority");
        }
        if (sorted.get(1) != highShort) {
            throw new AssertionError("Second sorted item must be highShort due to shorter duration tie-breaker");
        }
        if (sorted.get(2) != highLong) {
            throw new AssertionError("Third sorted item must be highLong");
        }
        if (sorted.get(3) != medium) {
            throw new AssertionError("Fourth sorted item must be medium priority");
        }

        System.out.println("-> Greedy sorting logic passed successfully.");
    }

    // Tests greedy batch selection under shift hour constraints
    public static void testGreedyBatchSelection() {
        System.out.println("Testing greedy batch selection within shift hour capacity...");
        LocationNode loc = new LocationNode("LOC-02", "Balme Library", "Zone B", "Library", 5.654, -0.187);

        ServiceRequest req1 = new ServiceRequest("REQ-101", "u1@ug.edu.gh", loc,
                ServiceCategory.SANITATION, PriorityLevel.MEDIUM, "Bin empty", 2);
        ServiceRequest req2 = new ServiceRequest("REQ-102", "u2@ug.edu.gh", loc,
                ServiceCategory.EMERGENCY, PriorityLevel.EMERGENCY, "Power fault", 4);
        ServiceRequest req3 = new ServiceRequest("REQ-103", "u3@ug.edu.gh", loc,
                ServiceCategory.PLUMBING, PriorityLevel.HIGH, "Restroom leak", 3);
        ServiceRequest req4 = new ServiceRequest("REQ-104", "u4@ug.edu.gh", loc,
                ServiceCategory.FACILITY, PriorityLevel.LOW, "Chair repair", 1);

        List<ServiceRequest> requests = List.of(req1, req2, req3, req4);

        // Select greedy batch with 5 available shift hours
        List<ServiceRequest> batch = GreedyTaskScheduler.selectGreedyBatch(requests, 5);

        // Verify batch selection
        if (batch.size() != 2) {
            throw new AssertionError("Selected batch size should be 2 tasks");
        }
        if (batch.get(0) != req2 || batch.get(1) != req4) {
            throw new AssertionError("Selected batch items should be REQ-102 (Emergency) and REQ-104 (Low priority 1-hr task)");
        }

        System.out.println("-> Greedy batch selection passed successfully.");
    }

    // Tests boundary conditions such as empty inputs or non-positive capacity
    public static void testBoundaryCases() {
        System.out.println("Testing boundary cases (empty list, zero hours)...");

        // Test empty request list input
        List<ServiceRequest> emptyResult = GreedyTaskScheduler.selectGreedyBatch(new ArrayList<>(), 5);
        if (!emptyResult.isEmpty()) {
            throw new AssertionError("Result for empty request list should be empty");
        }

        // Test zero available working hours input
        LocationNode loc = new LocationNode("LOC-01", "Gate", "Zone A", "Gate", 5.65, -0.18);
        ServiceRequest req = new ServiceRequest("REQ-01", "u1@ug.edu.gh", loc,
                ServiceCategory.PLUMBING, PriorityLevel.HIGH, "Leak", 2);

        List<ServiceRequest> zeroHoursResult = GreedyTaskScheduler.selectGreedyBatch(List.of(req), 0);
        if (!zeroHoursResult.isEmpty()) {
            throw new AssertionError("Result for 0 available hours should be empty");
        }

        System.out.println("-> Boundary case testing passed successfully.");
    }
}
