package com.ug.campus;

import com.ug.campus.datastructures.BinarySearchTree;
import com.ug.campus.model.LocationNode;
import com.ug.campus.model.PriorityLevel;
import com.ug.campus.model.ServiceCategory;
import com.ug.campus.model.ServiceRequest;

import java.util.List;

public class BinarySearchTreeTest {

    public static void main(String[] args) {

        // Create the Binary Search Tree.
        // Key = Request ID
        // Value = ServiceRequest
        BinarySearchTree<String, ServiceRequest> requests =
                new BinarySearchTree<>();

        // Create campus locations
        LocationNode library = new LocationNode(
                "LOC001",
                "Balme Library",
                "Legon",
                "Library",
                5.6500,
                -0.1860
        );

        LocationNode engineering = new LocationNode(
                "LOC002",
                "Engineering Block",
                "Legon",
                "Department",
                5.6510,
                -0.1870
        );

        LocationNode commonwealth = new LocationNode(
                "LOC003",
                "Commonwealth Hall",
                "Legon",
                "Hostel",
                5.6520,
                -0.1880
        );

        // Create service requests
        ServiceRequest request1 = new ServiceRequest(
                "SR003",
                "student1@ug.edu.gh",
                library,
                ServiceCategory.ICT,
                PriorityLevel.HIGH,
                "Network problem in the library",
                3
        );

        ServiceRequest request2 = new ServiceRequest(
                "SR001",
                "student2@ug.edu.gh",
                engineering,
                ServiceCategory.ELECTRICAL,
                PriorityLevel.EMERGENCY,
                "Power failure in engineering block",
                2
        );

        ServiceRequest request3 = new ServiceRequest(
                "SR005",
                "student3@ug.edu.gh",
                commonwealth,
                ServiceCategory.PLUMBING,
                PriorityLevel.MEDIUM,
                "Water leakage in hostel",
                4
        );

        ServiceRequest request4 = new ServiceRequest(
                "SR002",
                "student4@ug.edu.gh",
                library,
                ServiceCategory.FACILITY,
                PriorityLevel.LOW,
                "Broken chair in library",
                1
        );

        ServiceRequest request5 = new ServiceRequest(
                "SR004",
                "student5@ug.edu.gh",
                engineering,
                ServiceCategory.SANITATION,
                PriorityLevel.HIGH,
                "Overflowing waste bin",
                2
        );

        // TEST 1: INSERTION

        requests.insert(request1.getId(), request1);
        requests.insert(request2.getId(), request2);
        requests.insert(request3.getId(), request3);
        requests.insert(request4.getId(), request4);
        requests.insert(request5.getId(), request5);

        System.out.println("    BST INSERTION TEST   ");
        System.out.println("Total requests: " + requests.size());

        // TEST 2: SEARCH

        System.out.println("\n   BST SEARCH TEST   ");

        ServiceRequest found = requests.search("SR003");

        System.out.println("Searching for SR003:");

        if (found != null) {
            System.out.println(found);
        } else {
            System.out.println("Request not found.");
        }

        // Search for a request that does not exist
        ServiceRequest notFound = requests.search("SR999");

        System.out.println("\nSearching for SR999:");

        if (notFound != null) {
            System.out.println(notFound);
        } else {
            System.out.println("Request not found.");
        }

        // TEST 3: DUPLICATE KEY

        System.out.println("\n    DUPLICATE KEY TEST    ");

        ServiceRequest updatedRequest = new ServiceRequest(
                "SR003",
                "student6@ug.edu.gh",
                library,
                ServiceCategory.ICT,
                PriorityLevel.EMERGENCY,
                "Updated emergency network problem",
                1
        );

        requests.insert(updatedRequest.getId(), updatedRequest);

        System.out.println("Total requests after duplicate insert: "
                + requests.size());

        System.out.println("Updated SR003:");

        ServiceRequest updatedResult = requests.search("SR003");

        System.out.println(updatedResult);

        // TEST 4: PRIORITY COMPARISON
        
        System.out.println("\n    PRIORITY TEST    ");

        ServiceRequest emergencyRequest = new ServiceRequest(
                "SR100",
                "student7@ug.edu.gh",
                library,
                ServiceCategory.EMERGENCY,
                PriorityLevel.EMERGENCY,
                "Urgent campus emergency",
                1
        );

        ServiceRequest lowRequest = new ServiceRequest(
                "SR101",
                "student8@ug.edu.gh",
                library,
                ServiceCategory.FACILITY,
                PriorityLevel.LOW,
                "Minor facility problem",
                2
        );

        System.out.println("Emergency priority weight: "
                + emergencyRequest.getPriority().getWeight());

        System.out.println("Low priority weight: "
                + lowRequest.getPriority().getWeight());

        System.out.println("Emergency vs Low comparison: "
                + emergencyRequest.compareTo(lowRequest));

        // TEST 5: RANGE SEARCH
     
        System.out.println("\n     RANGE SEARCH TEST    ");

        List<ServiceRequest> rangeResults =
                requests.rangeSearch("SR002", "SR004");

        System.out.println("Requests from SR002 to SR004:");

        for (ServiceRequest request : rangeResults) {
            System.out.println(request);
        }

        // --------------------------------------------------
        // FINAL RESULT
        // --------------------------------------------------
    }
}