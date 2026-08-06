package com.ug.campus.analysis;

import com.ug.campus.algorithms.DijkstraShortestPath;
import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.datastructures.CustomHashTable;
import com.ug.campus.datastructures.CustomPriorityQueue;
import com.ug.campus.datastructures.CustomQueue;
import com.ug.campus.model.ServiceRequest;

import java.util.ArrayList;
import java.util.List;

/**
 * PerformanceBenchmark.java
 * 
 * PURPOSE:
 * Performance Analysis Engine for measuring Data Structure and Algorithm efficiency.
 * 
 * MEASUREMENTS:
 * 1. FIFO Queue vs Priority Queue insertion & extraction speeds
 * 2. Hash Table lookup speeds vs linear scan
 * 3. Dijkstra Shortest Path execution benchmarking
 */
public class PerformanceBenchmark {

    public static void runAllBenchmarks(CampusGraph graph, List<ServiceRequest> requests, String sourceId, String destId) {
        System.out.println("=================================================");
        System.out.println("   UG CAMPUS OPTIMIZER - DSA PERFORMANCE ANALYSIS ");
        System.out.println("=================================================\n");

        benchmarkQueueVsPriorityQueue(requests);
        benchmarkHashTableLookup(requests);
        benchmarkDijkstra(graph, sourceId, destId);
    }

    private static void benchmarkQueueVsPriorityQueue(List<ServiceRequest> requests) {
        System.out.println("--- 1. Queue vs Priority Queue Benchmark ---");

        // Custom FIFO Queue
        long startTime = System.nanoTime();
        CustomQueue<ServiceRequest> fifo = new CustomQueue<>();
        for (ServiceRequest req : requests) {
            fifo.enqueue(req);
        }
        while (!fifo.isEmpty()) {
            fifo.dequeue();
        }
        long fifoTime = System.nanoTime() - startTime;

        // Custom Priority Queue (Heap)
        startTime = System.nanoTime();
        CustomPriorityQueue<ServiceRequest> pq = new CustomPriorityQueue<>();
        for (ServiceRequest req : requests) {
            pq.insert(req);
        }
        while (!pq.isEmpty()) {
            pq.extractMax();
        }
        long pqTime = System.nanoTime() - startTime;

        System.out.printf("FIFO Queue Total Time: %.3f ms (%d ops)%n", fifoTime / 1e6, requests.size());
        System.out.printf("Priority Queue Total Time: %.3f ms (%d ops)%n%n", pqTime / 1e6, requests.size());
    }

    private static void benchmarkHashTableLookup(List<ServiceRequest> requests) {
        System.out.println("--- 2. Hash Table Search Speed Benchmark ---");

        CustomHashTable<String, ServiceRequest> table = new CustomHashTable<>();
        for (ServiceRequest req : requests) {
            table.put(req.getId(), req);
        }

        String targetId = requests.isEmpty() ? "REQ-001" : requests.get(requests.size() / 2).getId();

        long startTime = System.nanoTime();
        ServiceRequest found = table.get(targetId);
        long hashTime = System.nanoTime() - startTime;

        System.out.printf("Hash Table Lookup for [%s]: %d nanoseconds (Result: %s)%n%n",
                targetId, hashTime, found != null ? found.getId() : "Not Found");
    }

    private static void benchmarkDijkstra(CampusGraph graph, String sourceId, String destId) {
        System.out.println("--- 3. Dijkstra Shortest Path Benchmark ---");

        long startTime = System.nanoTime();
        DijkstraShortestPath.PathResult result = DijkstraShortestPath.findShortestPath(graph, sourceId, destId);
        long dijkstraTime = System.nanoTime() - startTime;

        System.out.printf("Dijkstra Execution Time: %.3f ms%n", dijkstraTime / 1e6);
        System.out.printf("Route Node Count: %d nodes | Total Distance: %.1fm | Travel Time: %.1f mins%n%n",
                result.path.size(), result.totalDistance, result.totalTravelTime);
    }
}
