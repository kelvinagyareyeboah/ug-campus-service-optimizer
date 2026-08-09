# CustomHashTable.java — Implementation Notes (Task Group 4, Person 7 & 8)

> Branch: `feature/custom-hashtable`
> File: `dsa-java/src/com/ug/campus/datastructures/CustomHashTable.java`
> Original scaffold by: kelvinagyareyeboah (initial commit `d6b61a9`)

---

## Project Context

The **UG Campus Service Optimizer** is a DSA team project that models the University of
Ghana campus as a graph (50+ locations, 100+ roads) and pairs one data structure with one
algorithm per task group. **Task Group 4 (Person 7 & 8)** owns the **Hash Table**
(`CustomHashTable`, separate chaining for O(1) ID lookups) and the **DFS traversal**
(`DFSConnectivity`, connectivity checks between campus zones). This branch covers the
Hash Table half.

---

## What I Did (overview)

- Copied the **original** `CustomHashTable.java` implementation from the initial commit
  (commit `d6b61a9`) — the core logic was correct, so no algorithm was rewritten.
- Removed **all** comments from the code file; every explanation now lives in this
  document instead, keeping the source clean and reviewable.
- Preserved the original public API exactly — `put`, `get`, `remove`, `containsKey`,
  `size` — so `PerformanceBenchmark` integration is unaffected.

---

## What I Edited

- **Removed every comment** from `CustomHashTable.java` (class javadoc, method javadoc,
  inline notes) — the file is now pure code; all explanations live in this MD.
- **No behavioral changes** — every method's logic, signature, and return type is
  identical to the original scaffold.

---

## Why (full explanation that used to live in the comments)

- **Separate chaining:** each bucket in the `buckets` array holds the head of a singly
  linked list of `Entry` nodes. Collisions (two keys mapping to the same index) are
  resolved by appending to that bucket's list rather than probing elsewhere.
- **`getBucketIndex`:** hashes the key via `key.hashCode()`, then uses
  `Math.abs(hashCode) % capacity` to fold it into a valid array index. A `null` key maps
  to bucket 0 by convention.
- **`put` — update-or-insert:** walks the target bucket's chain first; if the key already
  exists, its value is overwritten in place (no duplicate entries). Only if the key isn't
  found does it prepend a new `Entry` to the head of the bucket's list, an O(1) insert.
- **Why prepend, not append:** inserting at the head avoids walking to the end of the
  chain a second time — the existence check already walked the whole chain, so a fresh
  node just needs to become the new head.
- **`get` — linear scan within a bucket:** average case is O(1) because with a good hash
  and low load factor, each bucket holds very few entries; worst case (many collisions)
  degrades toward O(n) for that bucket.
- **`remove` — `prev` pointer for unlinking:** the chain is singly linked, so removing a
  non-head node requires tracking the previous node to relink `prev.next` around the
  removed entry. Removing the head instead reassigns `buckets[index]` directly.
- **`containsKey`:** reuses `get` and checks for a non-null result — simple, but note it
  would misreport a stored `null` value as "not present"; not an issue here since
  `ServiceRequest`/String values are never intentionally `null`.
- **`DEFAULT_CAPACITY = 31`:** a small prime number, which spreads hash codes more evenly
  across buckets than a round number like 32 would, reducing clustering.

---

## Verification

- Compiled clean with `javac` against the rest of the project (no external dependencies
  beyond core Java).
- Smoke-tested with UG campus data:
  - `put("REQ-101", req1)` then `get("REQ-101")` → returns `req1` ✔
  - `put` on an existing key → overwrites value, `size()` unchanged ✔
  - `remove("REQ-101")` → returns the removed value, `get("REQ-101")` → `null` after ✔
  - `remove` on a non-existent key → returns `null`, no exception ✔
- Confirmed existing integration in `PerformanceBenchmark.java`
  (`table.put(req.getId(), req)` / `table.get(targetId)`) still behaves identically after
  the comment purge.

---

## Commit history on this branch

| Commit | Message |
| --- | --- |
| `<hash>` | docs: move all code comments into implementation notes, comment-free source |
