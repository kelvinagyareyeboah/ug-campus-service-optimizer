package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;

import java.util.ArrayList;
import java.util.List;

/**
 * DynamicProgrammingOptimizer.java
 * 
 * PURPOSE:
 * Implements a 0/1 Knapsack Dynamic Programming Optimizer.
 * 
 * USE CASE IN UG SYSTEM:
 * Solves resource optimization when maintenance teams have limited daily working hours (e.g. 8-hour shift).
 * Maximizes total priority weight resolved within total team shift hours.
 */
public class DynamicProgrammingOptimizer {

    public static class DPResult {
        public List<ServiceRequest> selectedRequests;
        public int totalPriorityValue;
        public int totalHoursUsed;

        public DPResult(List<ServiceRequest> selectedRequests, int totalPriorityValue, int totalHoursUsed) {
            this.selectedRequests = selectedRequests;
            this.totalPriorityValue = totalPriorityValue;
            this.totalHoursUsed = totalHoursUsed;
        }
    }

    public static DPResult optimizeShiftSchedule(List<ServiceRequest> requests, int maxShiftHours) {
        int n = requests.size();
        int[][] dp = new int[n + 1][maxShiftHours + 1];

        for (int i = 1; i <= n; i++) {
            ServiceRequest req = requests.get(i - 1);
            int weight = req.getEstimatedHours();
            int value = req.getPriority().getWeight();

            for (int w = 0; w <= maxShiftHours; w++) {
                if (weight <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        // Backtrack to find selected requests
        List<ServiceRequest> selected = new ArrayList<>();
        int w = maxShiftHours;
        for (int i = n; i > 0 && w > 0; i--) {
            if (dp[i][w] != dp[i - 1][w]) {
                ServiceRequest req = requests.get(i - 1);
                selected.add(req);
                w -= req.getEstimatedHours();
            }
        }

        int hoursUsed = maxShiftHours - w;
        int totalValue = dp[n][maxShiftHours];

        return new DPResult(selected, totalValue, hoursUsed);
    }
}
