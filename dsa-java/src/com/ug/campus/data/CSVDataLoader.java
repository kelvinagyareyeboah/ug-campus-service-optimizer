package com.ug.campus.data;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

/**
 * CSVDataLoader.java
 * 
 * PURPOSE:
 * Utility data loader for reading official course CSV datasets from the data/ directory:
 * - locations_template.csv (50+ locations)
 * - roads_template.csv (100+ road edges)
 * - service_requests_template.csv (300+ requests)
 * - resources_template.csv (30+ resources)
 * 
 * Fulfills Section 4 & Section 12 requirements of the DCIT 204/308 Course Specification.
 */
public class CSVDataLoader {

    /**
     * Loads 50+ campus location nodes from a CSV file.
     */
    public static Map<String, LocationNode> loadLocations(String csvPath) throws IOException {
        Map<String, LocationNode> locationMap = new HashMap<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(csvPath))) {
            String line = reader.readLine(); // Header line
            if (line == null) return locationMap;

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) continue;

                String[] parts = line.split(",");
                if (parts.length < 6) continue;

                String id = parts[0].trim();
                String name = parts[1].trim();
                String area = parts[2].trim();
                String type = parts[3].trim();
                double xCoord = Double.parseDouble(parts[4].trim());
                double yCoord = Double.parseDouble(parts[5].trim());

                LocationNode node = new LocationNode(id, name, area, type, xCoord, yCoord);
                locationMap.put(id, node);
            }
        }

        return locationMap;
    }

    /**
     * Loads 100+ road edges from a CSV file and populates the CampusGraph.
     */
    public static int loadRoads(CampusGraph graph, String csvPath, Map<String, LocationNode> locationMap) throws IOException {
        int count = 0;

        try (BufferedReader reader = new BufferedReader(new FileReader(csvPath))) {
            String line = reader.readLine(); // Header line
            if (line == null) return 0;

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) continue;

                String[] parts = line.split(",");
                if (parts.length < 6) continue;

                String fromId = parts[1].trim();
                String toId = parts[2].trim();
                double distanceKm = Double.parseDouble(parts[3].trim());
                double travelTimeMin = Double.parseDouble(parts[4].trim());
                double conditionWeight = Double.parseDouble(parts[5].trim());

                LocationNode src = locationMap.get(fromId);
                LocationNode dest = locationMap.get(toId);

                if (src != null && dest != null) {
                    double distanceMeters = distanceKm * 1000.0;
                    double weight = distanceMeters * conditionWeight;
                    graph.addRoad(src, dest, distanceMeters, travelTimeMin, weight);
                    count++;
                }
            }
        }

        return count;
    }

    /**
     * Loads 300+ service requests from a CSV file.
     */
    public static List<ServiceRequest> loadServiceRequests(String csvPath, Map<String, LocationNode> locationMap) throws IOException {
        List<ServiceRequest> requests = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(csvPath))) {
            String line = reader.readLine(); // Header line
            if (line == null) return requests;

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) continue;

                String[] parts = line.split(",");
                if (parts.length < 8) continue;

                String requestId = parts[0].trim();
                String sourceId = parts[1].trim();
                String categoryStr = parts[3].trim();
                int urgency = Integer.parseInt(parts[4].trim());
                String statusStr = parts[7].trim();

                LocationNode loc = locationMap.get(sourceId);
                if (loc == null) continue;

                PriorityLevel priority = mapUrgencyToPriority(urgency);
                ServiceCategory category = mapStringToCategory(categoryStr);
                String email = "requester_" + requestId.toLowerCase() + "@st.ug.edu.gh";
                String description = categoryStr + " service request at " + loc.getName();
                int estimatedHours = Math.max(1, urgency); // estimated duration

                ServiceRequest request = new ServiceRequest(requestId, email, loc, category, priority, description, estimatedHours);
                
                if ("COMPLETED".equalsIgnoreCase(statusStr)) {
                    request.setStatus(RequestStatus.COMPLETED);
                } else if ("IN_PROGRESS".equalsIgnoreCase(statusStr)) {
                    request.setStatus(RequestStatus.IN_PROGRESS);
                } else {
                    request.setStatus(RequestStatus.PENDING);
                }

                requests.add(request);
            }
        }

        return requests;
    }

    /**
     * Loads 30+ resources from a CSV file.
     */
    public static List<MaintenanceTeam> loadResources(String csvPath, Map<String, LocationNode> locationMap) throws IOException {
        List<MaintenanceTeam> teams = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(csvPath))) {
            String line = reader.readLine(); // Header line
            if (line == null) return teams;

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) continue;

                String[] parts = line.split(",");
                if (parts.length < 5) continue;

                String resId = parts[0].trim();
                String resType = parts[1].trim();
                String homeLocId = parts[2].trim();
                int capacity = Integer.parseInt(parts[3].trim());

                LocationNode homeLoc = locationMap.get(homeLocId);
                if (homeLoc == null) {
                    homeLoc = new LocationNode(homeLocId, "Hub " + homeLocId, "Central", "Hub", 5.65, -0.18);
                }

                ServiceCategory spec = mapStringToCategory(resType);
                String teamName = resType + " Unit (" + resId + ")";
                int maxWorkingHours = capacity * 8; // e.g. 8h shift per capacity

                MaintenanceTeam team = new MaintenanceTeam(resId, teamName, spec, homeLoc, maxWorkingHours);
                teams.add(team);
            }
        }

        return teams;
    }

    private static PriorityLevel mapUrgencyToPriority(int urgency) {
        if (urgency >= 5) return PriorityLevel.EMERGENCY;
        if (urgency == 4) return PriorityLevel.HIGH;
        if (urgency >= 2) return PriorityLevel.MEDIUM;
        return PriorityLevel.LOW;
    }

    private static ServiceCategory mapStringToCategory(String categoryStr) {
        String lower = categoryStr.toLowerCase();
        if (lower.contains("electric") || lower.contains("power") || lower.contains("light")) return ServiceCategory.ELECTRICAL;
        if (lower.contains("plumb") || lower.contains("water") || lower.contains("leak")) return ServiceCategory.PLUMBING;
        if (lower.contains("it") || lower.contains("tech") || lower.contains("computer") || lower.contains("admin")) return ServiceCategory.ICT;
        if (lower.contains("sanitat") || lower.contains("waste") || lower.contains("trash")) return ServiceCategory.SANITATION;
        if (lower.contains("ground") || lower.contains("road") || lower.contains("food")) return ServiceCategory.GROUNDS;
        if (lower.contains("medic") || lower.contains("emerg") || lower.contains("secur")) return ServiceCategory.EMERGENCY;
        return ServiceCategory.FACILITY;
    }
}
