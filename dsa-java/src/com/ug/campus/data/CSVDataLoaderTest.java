package com.ug.campus.data;

import com.ug.campus.datastructures.CampusGraph;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.MaintenanceTeam;
import com.ug.campus.model.ServiceRequest;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * CSVDataLoaderTest.java
 * 
 * PURPOSE:
 * Verifies that CSVDataLoader correctly parses and imports the official dataset files:
 * - locations_template.csv (51 locations)
 * - roads_template.csv (101 road edges)
 * - service_requests_template.csv (301 requests)
 * - resources_template.csv (32 resources)
 */
public class CSVDataLoaderTest {

    public static void main(String[] args) {
        System.out.println("Running CSVDataLoaderTest...");

        String dataDir = "data";
        if (!new File(dataDir).exists()) {
            dataDir = "../data";
        }

        try {
            Map<String, LocationNode> locations = CSVDataLoader.loadLocations(dataDir + "/locations_template.csv");
            assert locations.size() >= 50 : "Expected at least 50 locations, found " + locations.size();
            System.out.println(" ✅ Locations Test Passed: " + locations.size() + " locations loaded.");

            CampusGraph graph = new CampusGraph();
            int roadsLoaded = CSVDataLoader.loadRoads(graph, dataDir + "/roads_template.csv", locations);
            assert roadsLoaded >= 100 : "Expected at least 100 roads, found " + roadsLoaded;
            System.out.println(" ✅ Roads Test Passed: " + roadsLoaded + " road edges loaded into CampusGraph.");

            List<ServiceRequest> requests = CSVDataLoader.loadServiceRequests(dataDir + "/service_requests_template.csv", locations);
            assert requests.size() >= 300 : "Expected at least 300 requests, found " + requests.size();
            System.out.println(" ✅ Service Requests Test Passed: " + requests.size() + " requests loaded.");

            List<MaintenanceTeam> resources = CSVDataLoader.loadResources(dataDir + "/resources_template.csv", locations);
            assert resources.size() >= 30 : "Expected at least 30 resources, found " + resources.size();
            System.out.println(" ✅ Resources Test Passed: " + resources.size() + " resources loaded.");

            System.out.println("\n🎉 ALL CSV DATA LOADER TESTS PASSED SUCCESSFULLY!");
        } catch (IOException e) {
            System.err.println(" ❌ CSVDataLoaderTest Failed: " + e.getMessage());
        }
    }
}
