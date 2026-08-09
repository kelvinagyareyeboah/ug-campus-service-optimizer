# DFSConnectivity.java — Implementation Notes (Task Group 4, Person 7 & 8)

> Branch: `feature/dfs-connectivity`
> File: `dsa-java/src/com/ug/campus/algorithms/DFSConnectivity.java`
> Original work by: kelvinagyareyeboah (initial scaffold, commit `d6b61a9`)

---

## Project Context

The **UG Campus Service Optimizer** is a DSA team project that models the University of
Ghana campus as a graph (50+ locations, 100+ roads) and pairs one data structure with one
algorithm per task group. **Task Group 4 (Person 7 & 8)** owns the **Hash Table**
(`CustomHashTable`, separate chaining for O(1) ID lookups) and the **DFS traversal**
(`DFSConnectivity`, connectivity checks between campus zones). This branch covers the
DFS half.

---

## What I Did (overview)

- Copied the **original** `DFSConnectivity.java` implementation from the initial commit
  (commit `d6b61a9`) — the core logic was correct, so no algorithm was rewritten.
- Removed **all** comments from the code file; every explanation now lives in this
  document instead, keeping the source clean and reviewable.
- Split changes into small logical commits so each intent is reviewable:
  1. `comment:` — expanded javadoc on the original search code
  2. `feat:` — added DFS cycle detection (`hasCycle`)
  3. `feat:` — added ordered traversal (`collectTraversal`) + visited-state cleanup guarantees
  4. `docs:` — comment purge (code is now comment-free) + moved explanations here

---

## What I Edited

- **Removed every comment** from `DFSConnectivity.java` (class javadoc, method javadoc,
  inline notes) — the file is now pure code; all explanations live in this MD.
- **Rewrote the header javadoc** (previously) to follow the repo's `PURPOSE / USE CASE`
  convention before purging comments.
- **Expanded every method's javadoc** (previously) on the original methods:
  - documented each parameter with real examples (`"LOC-01"` Main Gate, `"LOC-07"` University Hospital)
  - documented return semantics explicitly
  - clarified the *mark-before-descend* order and why `visited` stops infinite recursion on cyclic roads
- **Preserved the original public API** — `isConnected(CampusGraph, String, String)` is
  unchanged, so `Main` / `PerformanceBenchmark` integration is unaffected.

---

## What I Added

- **`hasCycle(CampusGraph)` cycle detection** (+ private helper):
  - standard **undirected** DFS cycle detection using a `parentId` pointer
  - skips the reverse edge back to the parent (`A→B` and `B→A` is the same road, not a loop)
  - any already-visited **non-parent** neighbor = back edge → cycle confirmed
  - every unvisited node is tried as a root, so disconnected graphs are covered
- **`collectTraversal(CampusGraph, startId)`** — returns the pre-order (`discovery-order`)
  list of zone IDs; e.g. auditing which zones a patrol route actually passes through.
- **Visited-state cleanup rules** (implemented + documented here):
  - every public query creates its **own fresh** `visited` set scoped to that single call
  - no stale state leaks between separate queries (correct even if the graph is edited between calls)
  - traversal memory is released the moment the query returns
  - the class never mutates the `CampusGraph` (all helpers are static & side-effect free)

## Why (full explanation that used to live in the comments)

- **`isConnected` — base case first:** return `true` as soon as the target zone is reached;
  no point exploring further roads once connectivity is confirmed.
- **`visited.add(current)` BEFORE descending:** marking first prevents the search from
  re-entering the same zone through another road, which is the entire reason infinite
  recursion never happens on cyclic roads.
- **Neighbor check `!visited.contains(neighborId)`:** only descend into unseen zones in
  this traversal; previously-seen zones are skipped because they are already proven
  explored (or currently being explored).
- **Early return on success:** if a deeper branch finds the target, `true` bubbles up
  through every level of the call stack immediately.
- **`return false` at the end of `dfs`:** all roads from this zone are exhausted without
  finding the target → that zone does not connect to it; the result propagates upward to
  the caller, making the algorithm backtrack naturally (depth-first).
- **Parent skip in `hasCycle`:** in an undirected graph the edge back to the node you just
  came FROM is the same road seen twice, so it must be ignored or every edge would
  falsely register as a cycle.
- **Back-edge detection:** a neighbor that is already visited AND is not the parent means
  a second, different path reaches an already-explored zone → the road network contains
  a closed loop.
- **Fresh `HashSet` per public call:** gives automatic cleanup — no `clear()` bookkeeping,
  no shared mutable state, results always reflect the graph's current shape (even if new
  roads are added between queries).
- **`collectTraversal` pre-order list:** recording zones the first time they are seen
  produces the DFS discovery order, which is exactly the order a scouting patrol would
  reach them; reused without needing any other data structure.

---

## Verification

- Compiled clean with `javac` (JDK 25) against `CampusGraph`, `LocationNode`, `RoadEdge`.
- Smoke-tested on a small 4-node graph:
  - `isConnected(A→C)` / `A→D` / `B→D` → `true` (indirect paths found) ✔
  - `hasCycle` → `false` on a tree; `true` after adding one edge that closes a loop ✔
  - `collectTraversal(A)` → `[A, B, C, D]` (pre-order discovery order) ✔
- Final check performed after comment purge: source still compiles and all three public
  methods behave identically.

---

## Commit history on this branch

| Commit | Message |
| --- | --- |
| `e3d25ab` | comment: improve javadoc and inline docs for DFS connectivity search |
| `e07bdd3` | feat: add DFS cycle detection for campus road network |
| `119b4fd` | feat: add ordered traversal with visited-state cleanup guarantees |
| *next*   | docs: move all code comments into implementation notes (comment-free source) |