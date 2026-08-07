package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;

import java.util.ArrayList;
import java.util.List;

/**
 * GreedyTaskScheduler.java
 * 
 * PURPOSE:
 * Implements a Greedy Choice Algorithm for immediate and optimal task dispatching.
 * 
 * USE CASE IN UG SYSTEM:
 * Rapidly selects the highest priority service request with the shortest estimated
 * resolution time, maximizing overall task resolution count within available shift hours.
 */
public class GreedyTaskScheduler {

    // Selects a batch of service requests within the available working hours limit using a greedy strategy
    public static List<ServiceRequest> selectGreedyBatch(List<ServiceRequest> availableRequests, int availableHours) {
        // Handle edge cases where input request list is null or empty or hours non-positive
        if (availableRequests == null || availableRequests.isEmpty() || availableHours <= 0) {
            return new ArrayList<>();
        }

        // Obtain a greedily sorted copy of available service requests
        List<ServiceRequest> sortedRequests = sortGreedily(availableRequests);

        // Track selected requests and total accumulated working hours
        List<ServiceRequest> selected = new ArrayList<>();
        int timeSpent = 0;

        // Iterate through greedily sorted requests and select tasks that fit within available hours
        for (ServiceRequest request : sortedRequests) {
            // Check if adding current request exceeds available shift hours
            if (timeSpent + request.getEstimatedHours() <= availableHours) {
                // Add request to the dispatched selection list
                selected.add(request);

                // Accumulate total working hours spent
                timeSpent += request.getEstimatedHours();
            }
        }

        // Return the list of greedily selected service requests
        return selected;
    }

    // Sorts a list of service requests greedily: highest priority weight first, then shortest duration
    public static List<ServiceRequest> sortGreedily(List<ServiceRequest> requests) {
        // Create a copy of the input list for sorting
        List<ServiceRequest> copy = new ArrayList<>(requests);

        // Sort requests using greedy comparison logic
        copy.sort((a, b) -> {
            // Primary criterion: Higher priority weight comes first (descending order)
            int priorityComparison = Integer.compare(b.getPriority().getWeight(), a.getPriority().getWeight());
            if (priorityComparison != 0) {
                return priorityComparison;
            }

            // Secondary criterion (tie-breaker): Shortest estimated duration comes first (ascending order)
            int durationComparison = Integer.compare(a.getEstimatedHours(), b.getEstimatedHours());
            if (durationComparison != 0) {
                return durationComparison;
            }

            // Tertiary criterion (tie-breaker): Compare request IDs for deterministic tie-breaking
            return a.getId().compareTo(b.getId());
        });

        // Return the sorted list of requests
        return copy;
    }
}

