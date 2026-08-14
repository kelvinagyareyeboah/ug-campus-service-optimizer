package com.ug.campus;

import com.ug.campus.algorithms.*;
import com.ug.campus.analysis.PerformanceBenchmark;
import com.ug.campus.datastructures.*;
import com.ug.campus.model.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Main.java
 * 
 * PURPOSE:
 * Application Entry Point and End-to-End System Demonstrator for UG Campus
 * Service Optimizer.
 * 
 * DEMONSTRATES:
 * 1. Building the UG Campus Graph (Locations & Connections)
 * 2. Reporting & Storing Service Requests
 * 3. Queue & Priority Queue Preemption
 * 4. Fast Hash Table & BST Lookup
 * 5. Dijkstra Shortest Route Navigation to Issue Hotspot
 * 6. Prim & Kruskal Minimum Spanning Tree Infrastructure Analysis
 * 7. BFS Nearby Exploration & DFS Connectivity Verification
 * 8. Greedy Dispatching & 0/1 Knapsack Dynamic Programming Resource Allocation
 * 9. DSA Performance Benchmarking & Output Execution Metrics
 */
public class Main {

        public static void main(String[] args) {
                System.out.println("===================================================================");
                System.out.println("   UNIVERSITY OF GHANA CAMPUS SERVICE OPTIMIZER (JAVA DSA MODULE)");
                System.out.println("===================================================================\n");

                // 1. Initialize UG Campus Graph
                CampusGraph graph = new CampusGraph();

                LocationNode mainGate = new LocationNode("LOC-01", "Main Gate", "Entrance Zone", "Gate", 5.6508,
                                -0.1870);
                LocationNode balmeLib = new LocationNode("LOC-02", "Balme Library", "Central Zone", "Library", 5.6540,
                                -0.1878);
                LocationNode jqb = new LocationNode("LOC-03", "Jones Quartey Building (JQB)", "Academic Zone",
                                "Lecture Theatre", 5.6525, -0.1865);
                LocationNode csDept = new LocationNode("LOC-04", "Computer Science Department", "Science Zone",
                                "Department", 5.6552, -0.1840);
                LocationNode commonwealth = new LocationNode("LOC-05", "Commonwealth Hall", "Halls Zone", "Hostel",
                                5.6570, -0.1890);
                LocationNode sarbah = new LocationNode("LOC-06", "Mensah Sarbah Hall", "Halls Zone", "Hostel", 5.6500,
                                -0.1830);
                LocationNode ugHospital = new LocationNode("LOC-07", "University Hospital", "Medical Zone", "Hospital",
                                5.6480, -0.1810);
                LocationNode sportsStadium = new LocationNode("LOC-08", "UG Sports Stadium", "Sports Zone", "Stadium",
                                5.6590, -0.1850);

                graph.addRoad(mainGate, jqb, 500, 5, 500);
                graph.addRoad(jqb, balmeLib, 400, 4, 400);
                graph.addRoad(balmeLib, csDept, 600, 6, 600);
                graph.addRoad(balmeLib, commonwealth, 700, 7, 700);
                graph.addRoad(jqb, sarbah, 550, 5, 550);
                graph.addRoad(sarbah, ugHospital, 450, 4, 450);
                graph.addRoad(csDept, sportsStadium, 800, 8, 800);

                System.out.printf("Campus Graph Initialized: %d Locations (Nodes), %d Roads (Edges)%n%n",
                                graph.getNodeCount(), graph.getEdgeCount());

                // 2. Simulate Service Requests
                List<ServiceRequest> sampleRequests = new ArrayList<>();

                ServiceRequest req1 = new ServiceRequest("REQ-101", "student1@st.ug.edu.gh", balmeLib,
                                ServiceCategory.SANITATION, PriorityLevel.MEDIUM, "Overflowing waste bin near entrance",
                                2);
                ServiceRequest req2 = new ServiceRequest("REQ-102", "lecturer1@ug.edu.gh", csDept,
                                ServiceCategory.EMERGENCY, PriorityLevel.EMERGENCY,
                                "Main server room power outage fault", 4);
                ServiceRequest req3 = new ServiceRequest("REQ-103", "staff1@ug.edu.gh", jqb,
                                ServiceCategory.PLUMBING, PriorityLevel.HIGH, "Broken pipe leaking in rest room", 3);
                ServiceRequest req4 = new ServiceRequest("REQ-104", "student2@st.ug.edu.gh", commonwealth,
                                ServiceCategory.FACILITY, PriorityLevel.LOW, "Broken chair in reading room", 1);

                sampleRequests.add(req1);
                sampleRequests.add(req2);
                sampleRequests.add(req3);
                sampleRequests.add(req4);

                // 3. Priority Queue Preemption Demonstration
                System.out.println("--- Step 3: Urgent Priority Preemption (Max-Heap Priority Queue) ---");
                CustomPriorityQueue<ServiceRequest> priorityQueue = new CustomPriorityQueue<>();
                for (ServiceRequest req : sampleRequests) {
                        priorityQueue.insert(req);
                }

                System.out.println("Processing order based on urgency:");
                while (!priorityQueue.isEmpty()) {
                        System.out.println(" -> Handled: " + priorityQueue.extractMax());
                }
                System.out.println();

                // 4. Dijkstra Shortest Route Calculation
                System.out.println("--- Step 5: Route Optimization (Dijkstra's Algorithm) ---");
                System.out.println("Finding fastest maintenance route from Main Gate to Balme Library...");
                DijkstraShortestPath.PathResult pathResult = DijkstraShortestPath.findShortestPath(graph, "LOC-01",
                                "LOC-02");

                System.out.print("Optimal Route: ");
                for (int i = 0; i < pathResult.path.size(); i++) {
                        System.out.print(pathResult.path.get(i).getName()
                                        + (i < pathResult.path.size() - 1 ? " -> " : ""));
                }
                System.out.printf("%nTotal Distance: %.0fm | Estimated Travel Time: %.1f minutes%n%n",
                                pathResult.totalDistance, pathResult.totalTravelTime);

                // 5. Dynamic Programming Shift Schedule Optimization
                System.out.println("--- Step 6: Dynamic Programming Shift Resource Optimization (0/1 Knapsack) ---");
                int teamShiftCapacity = 5; // 5 hours available
                DynamicProgrammingOptimizer.DPResult dpResult = DynamicProgrammingOptimizer
                                .optimizeShiftSchedule(sampleRequests, teamShiftCapacity);

                System.out.printf(
                                "Optimized 5-Hour Shift Schedule (Selected %d tasks, Priority Score: %d, Hours Used: %d/%d):%n",
                                dpResult.selectedRequests.size(), dpResult.totalPriorityValue, dpResult.totalHoursUsed,
                                teamShiftCapacity);
                for (ServiceRequest req : dpResult.selectedRequests) {
                        System.out.println(" * " + req);
                }
                System.out.println();

                // 6. Run Performance Benchmark
                PerformanceBenchmark.runAllBenchmarks(graph, sampleRequests, "LOC-01", "LOC-04");

                System.out.println("===================================================================");
                System.out.println("   ALL DATA STRUCTURES & ALGORITHMS EXECUTED SUCCESSFULLY!");
                System.out.println("===================================================================");
        }
}
