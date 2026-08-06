package com.ug.campus.algorithms;

import com.ug.campus.model.ServiceRequest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * GreedyTaskScheduler.java
 * 
 * PURPOSE:
 * Implements a Greedy Choice Algorithm for instant task dispatching.
 * 
 * USE CASE IN UG SYSTEM:
 * Rapidly selects the next highest priority request with the shortest estimated resolution time,
 * maximizing task resolution count under tight response time targets.
 */
public class GreedyTaskScheduler {

    public static List<ServiceRequest> selectGreedyBatch(List<ServiceRequest> availableRequests, int availableHours) {
        List<ServiceRequest> copy = new ArrayList<>(availableRequests);

        // Sort greedily: highest priority first, then shortest duration first
        copy.sort((a, b) -> {
            int pCmp = Integer.compare(b.getPriority().getWeight(), a.getPriority().getWeight());
            if (pCmp != 0) return pCmp;
            return Integer.compare(a.getEstimatedHours(), b.getEstimatedHours());
        });

        List<ServiceRequest> selected = new ArrayList<>();
        int timeSpent = 0;

        for (ServiceRequest request : copy) {
            if (timeSpent + request.getEstimatedHours() <= availableHours) {
                selected.add(request);
                timeSpent += request.getEstimatedHours();
            }
        }

        return selected;
    }
}
