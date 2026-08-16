package com.ug.campus.datastructures;

import com.ug.campus.model.LocationNode;
import com.ug.campus.model.PriorityLevel;
import com.ug.campus.model.ServiceCategory;
import com.ug.campus.model.ServiceRequest;

import java.util.Iterator;
import java.util.NoSuchElementException;

/**
 * CustomDequeTest.java
 * 
 * PURPOSE:
 * Unit test and verification suite for the CustomDeque data structure.
 * 
 * VERIFIES:
 * 1. Initial state of an empty deque (size == 0, isEmpty() == true).
 * 2. Adding to rear (standard request queueing) and removing from front (FIFO).
 * 3. Adding to front (supervisor emergency jump-in) and removing from front.
 * 4. Adding to rear and removing from rear (LIFO/Stack behavior).
 * 5. Peeking front and rear elements without removal.
 * 6. Deque clear operation and size tracking across all operations.
 * 7. Exception handling on empty deque for removeFront, removeRear, peekFront, peekRear.
 * 8. Null element insertion rejection.
 * 9. Iterator traversal from front to rear.
 * 10. Real-world scenario: Mixing emergency supervisor jump-ins with standard routine campus requests.
 */
public class CustomDequeTest {

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("     CUSTOM DEQUE (DOUBLE-ENDED QUEUE) TESTS     ");
        System.out.println("=================================================\n");

        testInitialState();
        testAddRearAndRemoveFront();
        testAddFrontEmergencyJumpIn();
        testAddRearAndRemoveRear();
        testPeekOperations();
        testClearAndSize();
        testEmptyDequeExceptions();
        testNullArgumentValidation();
        testIteratorTraversal();
        testCampusSupervisorEmergencyScenario();

        System.out.println("\nAll CustomDeque tests passed successfully!");
    }

    public static void testInitialState() {
        System.out.println("Test 1: Verifying initial empty deque state...");
        CustomDeque<String> deque = new CustomDeque<>();

        if (!deque.isEmpty()) {
            throw new AssertionError("Newly created deque should be empty");
        }
        if (deque.size() != 0) {
            throw new AssertionError("Newly created deque should have size 0");
        }
        if (!deque.toString().equals("[]")) {
            throw new AssertionError("Empty deque toString should be []");
        }
        System.out.println("-> Initial state verified.");
    }

    public static void testAddRearAndRemoveFront() {
        System.out.println("Test 2: Verifying addRear and removeFront (FIFO)...");
        CustomDeque<Integer> deque = new CustomDeque<>();

        deque.addRear(10);
        deque.addRear(20);
        deque.addRear(30);

        if (deque.size() != 3) {
            throw new AssertionError("Deque size should be 3");
        }

        if (deque.removeFront() != 10) {
            throw new AssertionError("First removed element should be 10");
        }
        if (deque.removeFront() != 20) {
            throw new AssertionError("Second removed element should be 20");
        }
        if (deque.removeFront() != 30) {
            throw new AssertionError("Third removed element should be 30");
        }
        if (!deque.isEmpty() || deque.size() != 0) {
            throw new AssertionError("Deque should be empty after removing all elements");
        }
        System.out.println("-> addRear and removeFront verified.");
    }

    public static void testAddFrontEmergencyJumpIn() {
        System.out.println("Test 3: Verifying addFront (supervisor emergency jump-in)...");
        CustomDeque<String> deque = new CustomDeque<>();

        deque.addRear("Standard-1");
        deque.addRear("Standard-2");
        // Supervisor jumps in at the front
        deque.addFront("EMERGENCY-SUPERVISOR-1");

        if (deque.size() != 3) {
            throw new AssertionError("Deque size should be 3");
        }

        if (!deque.peekFront().equals("EMERGENCY-SUPERVISOR-1")) {
            throw new AssertionError("Front element must be the emergency jump-in item");
        }

        if (!deque.removeFront().equals("EMERGENCY-SUPERVISOR-1")) {
            throw new AssertionError("Removed item should be the emergency jump-in item");
        }
        if (!deque.removeFront().equals("Standard-1")) {
            throw new AssertionError("Next removed item should be Standard-1");
        }
        if (!deque.removeFront().equals("Standard-2")) {
            throw new AssertionError("Last removed item should be Standard-2");
        }
        System.out.println("-> addFront emergency jump-in verified.");
    }

    public static void testAddRearAndRemoveRear() {
        System.out.println("Test 4: Verifying addRear and removeRear (LIFO)...");
        CustomDeque<String> deque = new CustomDeque<>();

        deque.addRear("Task-A");
        deque.addRear("Task-B");
        deque.addRear("Task-C");

        if (!deque.removeRear().equals("Task-C")) {
            throw new AssertionError("Expected Task-C from removeRear");
        }
        if (!deque.removeRear().equals("Task-B")) {
            throw new AssertionError("Expected Task-B from removeRear");
        }
        if (!deque.removeRear().equals("Task-A")) {
            throw new AssertionError("Expected Task-A from removeRear");
        }
        if (!deque.isEmpty()) {
            throw new AssertionError("Deque should be empty after removing all elements from rear");
        }
        System.out.println("-> addRear and removeRear verified.");
    }

    public static void testPeekOperations() {
        System.out.println("Test 5: Verifying peekFront and peekRear...");
        CustomDeque<String> deque = new CustomDeque<>();

        deque.addRear("First");
        deque.addRear("Middle");
        deque.addRear("Last");

        if (!deque.peekFront().equals("First")) {
            throw new AssertionError("peekFront should return 'First'");
        }
        if (!deque.peekRear().equals("Last")) {
            throw new AssertionError("peekRear should return 'Last'");
        }
        // Ensure peeking didn't alter size
        if (deque.size() != 3) {
            throw new AssertionError("Peeking should not change deque size");
        }
        System.out.println("-> peekFront and peekRear verified.");
    }

    public static void testClearAndSize() {
        System.out.println("Test 6: Verifying clear() and size()...");
        CustomDeque<Integer> deque = new CustomDeque<>();

        for (int i = 1; i <= 5; i++) {
            deque.addRear(i);
        }
        if (deque.size() != 5) {
            throw new AssertionError("Size should be 5");
        }

        deque.clear();
        if (!deque.isEmpty() || deque.size() != 0) {
            throw new AssertionError("Deque should be empty after clear()");
        }

        // Test reuse after clear
        deque.addFront(99);
        if (deque.size() != 1 || deque.peekFront() != 99 || deque.peekRear() != 99) {
            throw new AssertionError("Deque should be fully reusable after clear");
        }
        System.out.println("-> clear() and size() verified.");
    }

    public static void testEmptyDequeExceptions() {
        System.out.println("Test 7: Verifying empty deque exceptions...");
        CustomDeque<String> deque = new CustomDeque<>();

        // test removeFront exception
        boolean caughtRemoveFront = false;
        try {
            deque.removeFront();
        } catch (NoSuchElementException e) {
            caughtRemoveFront = true;
        }
        if (!caughtRemoveFront) {
            throw new AssertionError("removeFront on empty deque must throw NoSuchElementException");
        }

        // test removeRear exception
        boolean caughtRemoveRear = false;
        try {
            deque.removeRear();
        } catch (NoSuchElementException e) {
            caughtRemoveRear = true;
        }
        if (!caughtRemoveRear) {
            throw new AssertionError("removeRear on empty deque must throw NoSuchElementException");
        }

        // test peekFront exception
        boolean caughtPeekFront = false;
        try {
            deque.peekFront();
        } catch (NoSuchElementException e) {
            caughtPeekFront = true;
        }
        if (!caughtPeekFront) {
            throw new AssertionError("peekFront on empty deque must throw NoSuchElementException");
        }

        // test peekRear exception
        boolean caughtPeekRear = false;
        try {
            deque.peekRear();
        } catch (NoSuchElementException e) {
            caughtPeekRear = true;
        }
        if (!caughtPeekRear) {
            throw new AssertionError("peekRear on empty deque must throw NoSuchElementException");
        }

        System.out.println("-> Empty deque exception handling verified.");
    }

    public static void testNullArgumentValidation() {
        System.out.println("Test 8: Verifying null argument rejection...");
        CustomDeque<String> deque = new CustomDeque<>();

        boolean caughtNullFront = false;
        try {
            deque.addFront(null);
        } catch (IllegalArgumentException e) {
            caughtNullFront = true;
        }
        if (!caughtNullFront) {
            throw new AssertionError("addFront(null) should throw IllegalArgumentException");
        }

        boolean caughtNullRear = false;
        try {
            deque.addRear(null);
        } catch (IllegalArgumentException e) {
            caughtNullRear = true;
        }
        if (!caughtNullRear) {
            throw new AssertionError("addRear(null) should throw IllegalArgumentException");
        }

        System.out.println("-> Null argument validation verified.");
    }

    public static void testIteratorTraversal() {
        System.out.println("Test 9: Verifying iterator traversal...");
        CustomDeque<String> deque = new CustomDeque<>();
        deque.addRear("A");
        deque.addRear("B");
        deque.addRear("C");

        StringBuilder sb = new StringBuilder();
        for (String s : deque) {
            sb.append(s);
        }
        if (!sb.toString().equals("ABC")) {
            throw new AssertionError("Iterator traversal did not yield expected order 'ABC', got: " + sb);
        }

        Iterator<String> it = deque.iterator();
        while (it.hasNext()) {
            it.next();
        }
        boolean caughtEnd = false;
        try {
            it.next();
        } catch (NoSuchElementException e) {
            caughtEnd = true;
        }
        if (!caughtEnd) {
            throw new AssertionError("Iterator.next() past end should throw NoSuchElementException");
        }

        System.out.println("-> Iterator traversal verified.");
    }

    public static void testCampusSupervisorEmergencyScenario() {
        System.out.println("Test 10: Verifying UG Campus Service Request scenario with supervisor emergency jump-in...");
        CustomDeque<ServiceRequest> deque = new CustomDeque<>();

        LocationNode lib = new LocationNode("LOC-02", "Balme Library", "Central Zone", "Library", 5.6540, -0.1878);
        LocationNode cs = new LocationNode("LOC-04", "Computer Science Dept", "Science Zone", "Department", 5.6552, -0.1840);
        LocationNode admin = new LocationNode("LOC-01", "Registry / Admin", "Central Zone", "Administration", 5.6515, -0.1855);

        ServiceRequest routine1 = new ServiceRequest("REQ-101", "student1@st.ug.edu.gh", lib,
                ServiceCategory.SANITATION, PriorityLevel.LOW, "Routine trash collection", 1);
        ServiceRequest routine2 = new ServiceRequest("REQ-102", "staff1@ug.edu.gh", cs,
                ServiceCategory.FACILITY, PriorityLevel.MEDIUM, "Air conditioner servicing", 2);

        // Standard student/staff submissions
        deque.addRear(routine1);
        deque.addRear(routine2);

        // Urgent supervisor emergency jump-in at administration block
        ServiceRequest emergencySupervisor = new ServiceRequest("REQ-999", "supervisor@ug.edu.gh", admin,
                ServiceCategory.ELECTRICAL, PriorityLevel.EMERGENCY, "Main power breaker trip", 3);
        deque.addFront(emergencySupervisor);

        if (deque.size() != 3) {
            throw new AssertionError("Deque size should be 3");
        }

        // Supervisor request must be serviced first
        ServiceRequest dispatched1 = deque.removeFront();
        if (!dispatched1.getId().equals("REQ-999")) {
            throw new AssertionError("First dispatched request must be supervisor emergency REQ-999");
        }

        // Subsequent requests are processed in original FIFO order
        ServiceRequest dispatched2 = deque.removeFront();
        if (!dispatched2.getId().equals("REQ-101")) {
            throw new AssertionError("Second dispatched request must be routine REQ-101");
        }

        ServiceRequest dispatched3 = deque.removeFront();
        if (!dispatched3.getId().equals("REQ-102")) {
            throw new AssertionError("Third dispatched request must be routine REQ-102");
        }

        if (!deque.isEmpty()) {
            throw new AssertionError("Deque should be empty after dispatching all requests");
        }

        System.out.println("-> UG Campus Supervisor Emergency Jump-In Scenario verified successfully.");
    }
}
