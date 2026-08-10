package com.ug.campus.algorithms;

import com.ug.campus.model.LocationNode;
import com.ug.campus.model.PriorityLevel;
import com.ug.campus.model.ServiceCategory;
import com.ug.campus.model.ServiceRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * DynamicProgrammingOptimizerTest.java
 *
 * PURPOSE:
 * Unit test and verification suite for the 0/1 Knapsack dynamic programming optimizer.
 *
 * VERIFIES:
 * 1. DP table fill correctly maximizes total priority value within shift capacity.
 * 2. Backtracking reconstructs a valid selection of service requests.
 * 3. Total hours used does not exceed the allowed shift capacity.
 */
public class DynamicProgrammingOptimizerTest {

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("   DYNAMIC PROGRAMMING OPTIMIZER UNIT TESTS");
        System.out.println("=================================================\n");

        testOptimizeShiftSchedule();

        System.out.println("\nAll DynamicProgrammingOptimizer tests passed successfully!");
    }

    private static void testOptimizeShiftSchedule() {
        LocationNode lib = new LocationNode("LOC-02", "Balme Library", "Central Zone", "Library", 5.6540, -0.1878);
        LocationNode cs = new LocationNode("LOC-04", "Computer Science Dept", "Science Zone", "Department", 5.6552, -0.1840);

        List<ServiceRequest> requests = new ArrayList<>();
        requests.add(new ServiceRequest("REQ-201", "student1@st.ug.edu.gh", lib,
                ServiceCategory.EMERGENCY, PriorityLevel.EMERGENCY, "Power outage", 4));
        requests.add(new ServiceRequest("REQ-202", "staff1@ug.edu.gh", cs,
                ServiceCategory.PLUMBING, PriorityLevel.HIGH, "Broken pipe", 2));
        requests.add(new ServiceRequest("REQ-203", "student2@st.ug.edu.gh", lib,
                ServiceCategory.SANITATION, PriorityLevel.MEDIUM, "Overflowing bin", 2));
        requests.add(new ServiceRequest("REQ-204", "staff2@ug.edu.gh", cs,
                ServiceCategory.FACILITY, PriorityLevel.LOW, "Loose railing", 1));

        int capacity = 6;
        DynamicProgrammingOptimizer.DPResult result = DynamicProgrammingOptimizer.optimizeShiftSchedule(requests, capacity);

        if (result.totalPriorityValue != 7) {
            throw new AssertionError("Expected optimal total priority value of 7, but got " + result.totalPriorityValue);
        }
        if (result.totalHoursUsed != 6) {
            throw new AssertionError("Expected total hours used to be 6, but got " + result.totalHoursUsed);
        }
        if (result.selectedRequests.isEmpty()) {
            throw new AssertionError("Expected at least one request to be selected in optimized schedule");
        }

        int totalHours = result.selectedRequests.stream().mapToInt(ServiceRequest::getEstimatedHours).sum();
        if (totalHours > capacity) {
            throw new AssertionError("Selected requests exceed shift capacity");
        }

        System.out.println("-> DynamicProgrammingOptimizer schedule optimization tests passed successfully.");
    }
}
