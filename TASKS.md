# UG Campus Service Optimizer - Team Task Assignment Guide (`TASKS.md`)

This document defines the **individual task distribution** for team members (1 Person per Task), ensuring individual accountability for the oral defense.

---

## 📌 Individual Task Assignment Table (1 Person per Task)

| Task ID | Assigned Member | Primary Assignment | Description & Responsibilities |
| :---: | :--- | :--- | :--- |
| **Task 1** | **Person 1** | `CustomQueue.java` *(FIFO Queue)* | Implement FIFO Queue operations (`enqueue`, `dequeue`, `peek`, `isEmpty`, `size`). |
| **Task 2** | **Person 2** | `GreedyTaskScheduler.java` *(Greedy Dispatcher)* | Implement Greedy choice dispatcher selecting urgent requests with shortest durations. |
| **Task 3** | **Person 3** | `CustomPriorityQueue.java` *(Max-Heap)* | Implement Max-Binary Heap (`insert`, `extractMax`, `swim`, `sink`) for emergency preemption. |
| **Task 4** | **Person 4** | `DynamicProgrammingOptimizer.java` *(0/1 Knapsack DP)* | Implement 0/1 Knapsack DP table fill and backtracking for technician shift capacity planning. |
| **Task 5** | **Person 5** | `CustomStack.java` *(Audit Stack)* | Implement LIFO Stack operations (`push`, `pop`, `peek`, `isEmpty`) for action audit logs and undo. |
| **Task 6** | **Person 6** | `BFSExplorer.java` *(Breadth-First Search)* | Implement Breadth-First Search (BFS) queue traversal for nearby location discovery within $N$ hops. |
| **Task 7** | **Person 7** | `CustomHashTable.java` *(Hash Table)* | Implement Separate Chaining Hash Table (`put`, `get`, `remove`) for $O(1)$ fast ID lookup. |
| **Task 8** | **Person 8** | `DFSConnectivity.java` *(Depth-First Search)* | Implement recursive DFS graph traversal for reachability testing and cycle detection. |
| **Task 9** | **Person 9** | `CampusGraph.java` *(Adjacency List & Matrix)* | Construct UG Campus Graph with both Adjacency List and Adjacency Matrix representations. |
| **Task 10** | **Person 10** | `DijkstraShortestPath.java` *(Dijkstra Algorithm)* | Implement Dijkstra's priority queue pathfinding to compute minimum distance and travel time. |
| **Task 11** | **Person 11** | `BinarySearchTree.java` *(BST Index)* | Implement BST recursive insertion, key search, and inorder traversal sorting by timestamp. |
| **Task 12** | **Person 12** | `PrimMST.java` *(Prim's MST)* | Implement Prim's MST algorithm for minimum cost campus infrastructure utility layout. |
| **Task 13** | **Person 13** | `AVLTree.java` *(Self-Balancing Tree)* | Implement AVL self-balancing tree rotations (`leftRotate`, `rightRotate`) for $O(\log n)$ scaling. |
| **Task 14** | **Person 14** | `KruskalMST.java` & `DisjointSet.java` | Implement Kruskal's MST algorithm using standalone Disjoint-Set (Union-Find) with path compression. |
| **Task 15** | **Person 15** | `BTree.java` & `PerformanceBenchmark.java` | Implement multi-way B-Tree indexing and empirical execution speed profiler (nanoseconds/steps). |
| **Task 16** | **Person 16** | `CustomArrayList.java` & Searching Engine | Implement Dynamic Resizable Array and `LinearSearch`/`BinarySearch` algorithms. |
| **Task 17** | **Person 17** | `CustomCircularQueue.java`, `CustomDeque.java` & `BruteForceScheduler.java` | Implement Circular Queue, Double-Ended Queue, and Brute-Force Combinatorial Search evaluator. |
| **Task 18** | **Person 18** | Sorting Engine (`Selection`, `Insertion`, `Merge`, `QuickSort`) | Implement the 4 required sorting algorithms from scratch with stability and swap performance analysis. |

---

## 🚀 Simple Instructions for Remaining Custom Data Structures

### 📋 1. `CustomArrayList.java` (Dynamic Resizable Array)
* **File Path**: `dsa-java/src/com/ug/campus/datastructures/CustomArrayList.java`
* **Assigned Member**: Person 16
* **Instructions**:
  1. Create generic array field `T[] data` and integer `size`.
  2. Implement `insert(T item)`: Appends element at `size`. If `size == capacity`, double array capacity (`resize()`) and print a trace statement (`[CustomArrayList] Resized capacity from X to 2X`).
  3. Implement `get(int index)`: Returns element at index with bounds check (`0 <= index < size`).
  4. Implement `set(int index, T item)`: Replaces element at `index`.
  5. Implement `remove(int index)`: Deletes element at `index` and shifts remaining elements left.
  6. Implement `size()` and `isEmpty()`.

---

### 📋 2. `CustomCircularQueue.java` (Fixed-Capacity Circular Queue)
* **File Path**: `dsa-java/src/com/ug/campus/datastructures/CustomCircularQueue.java`
* **Assigned Member**: Person 17
* **Instructions**:
  1. Create array `T[] data`, `front` (0), `rear` (0), `capacity`, and `count`.
  2. Implement `enqueue(T item)`: Adds item at `rear`, then updates `rear = (rear + 1) % capacity`. Throw exception if queue is full.
  3. Implement `dequeue()`: Returns item at `front`, then updates `front = (front + 1) % capacity`.
  4. Implement `peek()`: Returns front element without removing.
  5. Implement `isFull()` and `isEmpty()`.

---

### 📋 3. `CustomDeque.java` (Double-Ended Queue)
* **File Path**: `dsa-java/src/com/ug/campus/datastructures/CustomDeque.java`
* **Assigned Member**: Person 17
* **Instructions**:
  1. Internal storage: Doubly linked list or circular array.
  2. Implement `addFront(T item)`: Inserts element at head (used for supervisor emergency jump-ins).
  3. Implement `addRear(T item)`: Inserts element at tail (standard request queueing).
  4. Implement `removeFront()` & `removeRear()`: Deletes from head or tail.
  5. Implement `peekFront()` & `peekRear()`.

---

### 📋 4. `DisjointSet.java` (Standalone Union-Find)
* **File Path**: `dsa-java/src/com/ug/campus/datastructures/DisjointSet.java`
* **Assigned Member**: Person 14
* **Instructions**:
  1. Internal storage: `Map<String, String> parent` and `Map<String, Integer> rank`.
  2. Implement `makeSet(String id)`: Sets `parent[id] = id` and `rank[id] = 0`.
  3. Implement `find(String id)`: Recursively finds set representative with path compression (`parent[id] = find(parent[id])`).
  4. Implement `union(String id1, String id2)`: Merges two sets using union-by-rank. Returns `true` if merged, `false` if already connected.

---

### 📋 5. `CampusGraph.java` Adjacency Matrix
* **File Path**: `dsa-java/src/com/ug/campus/datastructures/CampusGraph.java`
* **Assigned Member**: Person 9
* **Instructions**:
  1. Add a 2D matrix field `double[][] adjacencyMatrix` alongside existing `Map<String, List<RoadEdge>> adjacencyList`.
  2. Update `addRoad(...)` to set `adjacencyMatrix[srcIndex][destIndex] = distance` and `adjacencyMatrix[destIndex][srcIndex] = distance`.
  3. Add getter method `getAdjacencyMatrix()` for matrix representation verification.

---

## ⚡ Simple Instructions for Searching & Sorting Algorithms

### 🔍 1. `LinearSearch.java` & `BinarySearch.java` (Searching Engine)
* **File Paths**: 
  * `dsa-java/src/com/ug/campus/algorithms/LinearSearch.java`
  * `dsa-java/src/com/ug/campus/algorithms/BinarySearch.java`
* **Assigned Member**: Person 16
* **Instructions**:
  * **Linear Search**: Iterate sequentially from index `0` to `n-1`. Track and return primitive comparison step counts.
  * **Binary Search**: Include a **Precondition Check** verifying that the request list is sorted by Request ID/timestamp first. Calculate `mid = low + (high - low) / 2` and search in $O(\log n)$ time.

---

### 🔀 2. Sorting Engine (`SelectionSort`, `InsertionSort`, `MergeSort`, `QuickSort`)
* **File Paths**:
  * `dsa-java/src/com/ug/campus/algorithms/SelectionSort.java`
  * `dsa-java/src/com/ug/campus/algorithms/InsertionSort.java`
  * `dsa-java/src/com/ug/campus/algorithms/MergeSort.java`
  * `dsa-java/src/com/ug/campus/algorithms/QuickSort.java`
* **Assigned Member**: Person 18
* **Instructions**:
  * **Selection Sort**: In-place $O(n^2)$ sorting by finding minimum element in unsorted sub-array. Count total element swaps.
  * **Insertion Sort**: Adaptive $O(n^2)$ sorting shifting larger elements rightwards. Ideal for nearly-sorted request streams.
  * **Merge Sort**: Stable $O(n \log n)$ divide-and-conquer sorting dividing list into halves and merging back together.
  * **QuickSort**: Partition-based $O(n \log n)$ in-place sorting selecting pivot element and partitioning sub-arrays.

---

### 💥 3. `BruteForceScheduler.java` (Exhaustive Combinatorial Search)
* **File Path**: `dsa-java/src/com/ug/campus/algorithms/BruteForceScheduler.java`
* **Assigned Member**: Person 17
* **Instructions**:
  1. Recursively evaluate all $2^N$ subset combinations of service requests for small $N \le 10$.
  2. Find maximum total priority value that fits within shift working hours.
  3. Compare runtime performance against `DynamicProgrammingOptimizer.java` to prove to the course examiner why brute-force fails as $N$ grows.
