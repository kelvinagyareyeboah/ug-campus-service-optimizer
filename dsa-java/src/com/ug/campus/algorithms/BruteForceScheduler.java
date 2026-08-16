package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;

import java.util.ArrayList;
import java.util.List;

/**
 * BruteForceScheduler.java
 * 
 * Assigned Member: Person 17
 * 
 * PURPOSE:
 * Implements an Exhaustive Combinatorial Search scheduler.
 * Recursively evaluates all 2^N subset combinations of service requests
 * (only feasible for small N <= 10) to find the subset with maximum total
 * priority value that still fits within the team's shift working hours.
 * 
 * USE CASE IN UG SYSTEM:
 * Used to prove to the course examiner why brute-force search fails as N grows:
 * every extra request DOUBLES the number of subsets to evaluate (2^N), so the
 * runtime explodes exponentially. The DynamicProgrammingOptimizer (0/1 Knapsack)
 * solves the exact same problem in O(N * maxShiftHours) time and is therefore
 * the production choice for realistic request volumes.
 */
public class BruteForceScheduler {

    public static class BruteForceResult {
        public List<ServiceRequest> selectedRequests;
        public int totalPriorityValue;
        public int totalHoursUsed;
        public long subsetsEvaluated;

        public BruteForceResult(List<ServiceRequest> selectedRequests, int totalPriorityValue,
                                int totalHoursUsed, long subsetsEvaluated) {
            this.selectedRequests = selectedRequests;
            this.totalPriorityValue = totalPriorityValue;
            this.totalHoursUsed = totalHoursUsed;
            this.subsetsEvaluated = subsetsEvaluated;
        }
    }

    // Best-so-far state shared across recursive calls
    private static List<ServiceRequest> bestSubset;
    private static int bestValue;
    private static int bestHours;
    private static long subsetCount;

    /**
     * Exhaustively searches all 2^N subsets of the given requests and returns
     * the combination with the maximum total priority weight that fits within
     * maxShiftHours. Warning: only call with N <= 10.
     */
    public static BruteForceResult optimizeShiftSchedule(List<ServiceRequest> requests, int maxShiftHours) {
        bestSubset = new ArrayList<>();
        bestValue = 0;
        bestHours = 0;
        subsetCount = 0;

        explore(requests, 0, new ArrayList<>(), 0, 0, maxShiftHours);

        return new BruteForceResult(bestSubset, bestValue, bestHours, subsetCount);
    }

    /**
     * Convenience wrapper matching the original stub API: returns only the
     * selected requests of the optimal 2^N subset.
     */
    public static List<ServiceRequest> solveBruteForce(List<ServiceRequest> requests, int maxHours) {
        return optimizeShiftSchedule(requests, maxHours).selectedRequests;
    }

    /**
     * Recursive subset enumeration.
     * At each index i we branch: EXCLUDE request i, then INCLUDE request i
     * (if it still fits in the remaining hours). This visits every one of the
     * 2^N combinations exactly once.
     */
    private static void explore(List<ServiceRequest> requests, int index,
                                List<ServiceRequest> current, int currentValue,
                                int currentHours, int maxShiftHours) {
        subsetCount++;

        // Evaluate the current subset once the full combination is assembled
        if (index == requests.size()) {
            if (currentValue > bestValue) {
                bestValue = currentValue;
                bestHours = currentHours;
                bestSubset = new ArrayList<>(current);
            }
            return;
        }

        // Branch 1: EXCLUDE request at index
        explore(requests, index + 1, current, currentValue, currentHours, maxShiftHours);

        // Branch 2: INCLUDE request at index (only if it fits in remaining hours)
        ServiceRequest req = requests.get(index);
        if (currentHours + req.getEstimatedHours() <= maxShiftHours) {
            current.add(req);
            explore(requests, index + 1, current,
                    currentValue + req.getPriority().getWeight(),
                    currentHours + req.getEstimatedHours(), maxShiftHours);
            current.remove(current.size() - 1);
        }
    }

    /**
     * Benchmarks Brute Force against the Dynamic Programming Optimizer for
     * growing request counts (N = 1 up to requests.size()), printing runtimes
     * and confirming both solvers agree on the optimal priority value.
     */
    public static void compareRuntimeWithDP(List<ServiceRequest> requests, int maxShiftHours) {
        System.out.println("--- Brute Force vs Dynamic Programming Runtime Comparison ---");
        System.out.printf("%-4s | %-18s | %-16s | %-18s | %s%n",
                "N", "BruteForce (ms)", "Subsets (2^N)", "DP (ms)", "Optimal Match");

        for (int n = 1; n <= requests.size(); n++) {
            List<ServiceRequest> subset = new ArrayList<>(requests.subList(0, n));

            long bfStart = System.nanoTime();
            BruteForceResult bf = optimizeShiftSchedule(subset, maxShiftHours);
            long bfTime = System.nanoTime() - bfStart;

            long dpStart = System.nanoTime();
            DynamicProgrammingOptimizer.DPResult dp = DynamicProgrammingOptimizer.optimizeShiftSchedule(subset, maxShiftHours);
            long dpTime = System.nanoTime() - dpStart;

            System.out.printf("%-4d | %-18.3f | %-16d | %-18.3f | %s%n",
                    n, bfTime / 1e6, bf.subsetsEvaluated, dpTime / 1e6,
                    bf.totalPriorityValue == dp.totalPriorityValue ? "YES" : "NO");
        }
        System.out.println();
    }
}