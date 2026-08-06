# UG Campus Service Optimizer - Team Task Assignment Guide (`TASKS.md`)

This document defines the paired task distribution for the team. 
Each task group pairs **1 Data Structure** and **1 Algorithm** together, with **2 Team Members assigned per task**.

---

## 📌 Task Pairing Summary (1 Data Structure + 1 Algorithm, 2 People per Task)

| Task Group | Assigned Team Members | Assigned Data Structure (1) | Assigned Algorithm (1) |
| :---: | :--- | :--- | :--- |
| **Task 1** | **Person 1 & Person 2** | `dsa-java/src/com/ug/campus/datastructures/CustomQueue.java` *(FIFO Queue)* | `dsa-java/src/com/ug/campus/algorithms/GreedyTaskScheduler.java` *(Greedy Dispatcher)* |
| **Task 2** | **Person 3 & Person 4** | `dsa-java/src/com/ug/campus/datastructures/CustomPriorityQueue.java` *(Max-Heap)* | `dsa-java/src/com/ug/campus/algorithms/DynamicProgrammingOptimizer.java` *(0/1 Knapsack DP)* |
| **Task 3** | **Person 5 & Person 6** | `dsa-java/src/com/ug/campus/datastructures/CustomStack.java` *(Audit Stack)* | `dsa-java/src/com/ug/campus/algorithms/BFSExplorer.java` *(Breadth-First Search)* |
| **Task 4** | **Person 7 & Person 8** | `dsa-java/src/com/ug/campus/datastructures/CustomHashTable.java` *(Hash Table)* | `dsa-java/src/com/ug/campus/algorithms/DFSConnectivity.java` *(Depth-First Search)* |
| **Task 5** | **Person 9 & Person 10** | `dsa-java/src/com/ug/campus/datastructures/CampusGraph.java` *(UG Campus Graph)* | `dsa-java/src/com/ug/campus/algorithms/DijkstraShortestPath.java` *(Dijkstra Shortest Path)* |
| **Task 6** | **Person 11 & Person 12** | `dsa-java/src/com/ug/campus/datastructures/BinarySearchTree.java` *(BST Index)* | `dsa-java/src/com/ug/campus/algorithms/PrimMST.java` *(Prim's Minimum Spanning Tree)* |
| **Task 7** | **Person 13 & Person 14** | `dsa-java/src/com/ug/campus/datastructures/AVLTree.java` *(Self-Balancing Tree)* | `dsa-java/src/com/ug/campus/algorithms/KruskalMST.java` *(Kruskal's MST & Union-Find)* |
| **Task 8** | **Person 15 & Partner / Lead** | `dsa-java/src/com/ug/campus/datastructures/BTree.java` *(Multi-way B-Tree)* | `dsa-java/src/com/ug/campus/analysis/PerformanceBenchmark.java` *(Performance Profiler Engine)* |

---

## 🛠️ Detailed Task Group Descriptions

### 👥 Task Group 1: FIFO Queue & Greedy Choice Dispatching
* **Assigned Members**: Person 1 & Person 2
* **Assigned Data Structure**: `dsa-java/src/com/ug/campus/datastructures/CustomQueue.java`
* **Assigned Algorithm**: `dsa-java/src/com/ug/campus/algorithms/GreedyTaskScheduler.java`
* **Responsibilities**:
  - **Data Structure**: Implement and test FIFO Queue operations (`enqueue`, `dequeue`, `peek`, `isEmpty`, `size`).
  - **Algorithm**: Implement greedy selection sorting to immediately dispatch highest-priority requests with shortest durations.

---

### 👥 Task Group 2: Binary Max-Heap & Dynamic Programming 0/1 Knapsack
* **Assigned Members**: Person 3 & Person 4
* **Assigned Data Structure**: `dsa-java/src/com/ug/campus/datastructures/CustomPriorityQueue.java`
* **Assigned Algorithm**: `dsa-java/src/com/ug/campus/algorithms/DynamicProgrammingOptimizer.java`
* **Responsibilities**:
  - **Data Structure**: Implement Max-Binary Heap functions (`insert`, `extractMax`, `swim`, `sink`) for emergency preemption.
  - **Algorithm**: Implement 0/1 Knapsack DP table fill and backtracking to maximize priority resolution within team shift hours.

---

### 👥 Task Group 3: Audit Trail Stack & Breadth-First Search (BFS)
* **Assigned Members**: Person 5 & Person 6
* **Assigned Data Structure**: `dsa-java/src/com/ug/campus/datastructures/CustomStack.java`
* **Assigned Algorithm**: `dsa-java/src/com/ug/campus/algorithms/BFSExplorer.java`
* **Responsibilities**:
  - **Data Structure**: Implement LIFO Stack operations (`push`, `pop`, `peek`, `isEmpty`) for action logging and status undo.
  - **Algorithm**: Implement BFS queue traversal to explore and discover nearby campus locations within $N$ hops.

---

### 👥 Task Group 4: Hash Table & Depth-First Search (DFS)
* **Assigned Members**: Person 7 & Person 8
* **Assigned Data Structure**: `dsa-java/src/com/ug/campus/datastructures/CustomHashTable.java`
* **Assigned Algorithm**: `dsa-java/src/com/ug/campus/algorithms/DFSConnectivity.java`
* **Responsibilities**:
  - **Data Structure**: Implement Separate Chaining Hash Table (`put`, `get`, `remove`) for $O(1)$ fast ID search.
  - **Algorithm**: Implement recursive DFS graph traversal to verify connectivity between distant campus zones.

---

### 👥 Task Group 5: UG Campus Graph & Dijkstra's Shortest Path
* **Assigned Members**: Person 9 & Person 10
* **Assigned Data Structure**: `dsa-java/src/com/ug/campus/datastructures/CampusGraph.java`
* **Assigned Algorithm**: `dsa-java/src/com/ug/campus/algorithms/DijkstraShortestPath.java`
* **Responsibilities**:
  - **Data Structure**: Construct and manage UG Campus Graph (50+ location nodes, 100+ road edges, adjacency lists).
  - **Algorithm**: Implement Dijkstra's priority queue pathfinding to compute minimum distance and travel time.

---

### 👥 Task Group 6: Binary Search Tree (BST) & Prim's Minimum Spanning Tree
* **Assigned Members**: Person 11 & Person 12
* **Assigned Data Structure**: `dsa-java/src/com/ug/campus/datastructures/BinarySearchTree.java`
* **Assigned Algorithm**: `dsa-java/src/com/ug/campus/algorithms/PrimMST.java`
* **Responsibilities**:
  - **Data Structure**: Implement BST recursive insertion and key searching by priority or timestamp.
  - **Algorithm**: Implement Prim's algorithm to compute minimum cost campus utility network layout.

---

### 👥 Task Group 7: Self-Balancing AVL Tree & Kruskal's MST (Union-Find)
* **Assigned Members**: Person 13 & Person 14
* **Assigned Data Structure**: `dsa-java/src/com/ug/campus/datastructures/AVLTree.java`
* **Assigned Algorithm**: `dsa-java/src/com/ug/campus/algorithms/KruskalMST.java`
* **Responsibilities**:
  - **Data Structure**: Implement AVL tree rotations (`leftRotate`, `rightRotate`) and balance checks for $O(\log n)$ scalability.
  - **Algorithm**: Implement Kruskal's MST algorithm using Disjoint-Set (Union-Find) with path compression.

---

### 👥 Task Group 8: Multi-way B-Tree & Empirical Performance Benchmarking
* **Assigned Members**: Person 15 & Partner / Team Lead
* **Assigned Data Structure**: `dsa-java/src/com/ug/campus/datastructures/BTree.java`
* **Assigned Algorithm**: `dsa-java/src/com/ug/campus/analysis/PerformanceBenchmark.java`
* **Responsibilities**:
  - **Data Structure**: Implement multi-way B-Tree search branching for database-style request indexing.
  - **Algorithm**: Implement the performance analysis profiler measuring execution speed (ms/ns) and throughput.
