# 🧠 NodeDSM — Distributed Shared Memory System

## 📖 Project Overview

**NodeDSM** is a Distributed Shared Memory (DSM) system that provides the illusion of a single, unified memory space across multiple networked computers.

Although the memory is physically distributed, NodeDSM allows all participating nodes to interact with shared data **as if it were stored locally**, while the system transparently manages synchronization, consistency, and coherence.

The system uses an **Object-Based DSM architecture** with a **centralized memory manager**, enabling reliable coordination and simplified fault handling.

---

## ✨ Key Features

* ✅ Distributed Shared Memory abstraction
* ✅ Object-based memory model (JSON store)
* ✅ Sequential Consistency using distributed locking
* ✅ Transparent remote memory access
* ✅ Memory coherence via broadcast updates
* ✅ Real-time visualization dashboard
* ✅ Multiple concurrent nodes supported

---

## 🏗️ System Architecture

**Topology:** Centralized Manager (Star Architecture)

```
           Node A
             |
             |
Node B ─── Central Server ─── Dashboard
             |
             |
           Node C
```

### Components

* **Central Server**

  * Manages shared memory
  * Controls locks
  * Enforces consistency
  * Broadcasts updates

* **DSM Client Library**

  * Used by all nodes
  * Hides networking details
  * Provides simple read/write API

* **Dashboard**

  * Visualizes memory state in real time
  * Acts as a passive DSM client

---

## 🛠️ Tech Stack

| Layer         | Technology             |
| ------------- | ---------------------- |
| Runtime       | Node.js                |
| Communication | Socket.io (WebSockets) |
| DSM Model     | Object-Based           |
| Consistency   | Sequential Consistency |
| Coherence     | Update Broadcast       |
| Frontend      | React + Vite           |
| Architecture  | Centralized Manager    |

---

## 📦 Installation Guide

This project contains **two independent applications**:

1. **Backend DSM Server**
2. **Frontend Visualization Dashboard**

Both must be installed separately.

---

## ✅ Prerequisites

* Node.js (v18 or later recommended)

Download from:
👉 [https://nodejs.org/](https://nodejs.org/)

---

## ⚙️ Backend Setup (DSM Server)

Open a terminal and run:

```bash
cd node-dsm
npm install
```

This installs all dependencies required for:

* Socket communication
* Lock management
* Memory synchronization

---

## 🖥️ Frontend Setup (Dashboard)

Open a **new terminal window**:

```bash
cd dsm-dashboard
npm install
```

This installs React, Vite, and Socket.io client dependencies.

---

## 🎬 How to Run the Live Demo

Follow these steps **exactly in this order**.

---

### 🧠 Step 1: Start the Central Memory Server

From the `node-dsm` directory:

```bash
node server.js
```

✅ Expected output:

```
🧠 Central Memory Server running on port 3000...
```

---

### 🌐 Step 2: Launch the Dashboard

From the `dsm-dashboard` directory:

```bash
npm run dev
```

Open the displayed URL (usually):

```
http://localhost:5173
```

✅ You should see:

* A live memory grid
* Values synchronized with the server

---

### 🤖 Step 3: Run the Client Nodes

These nodes simulate distributed computers accessing shared memory.

---

#### Terminal 3 — Node A

```bash
node node-a.js
```

---

#### Terminal 4 — Node B

Immediately run:

```bash
node node-b.js
```

---

## 🕵️ What to Explain During the Demo

While the scripts are running, highlight the following behaviors:

---

### 🔐 1. Sequential Consistency

> “Notice how Node B prints **‘Waiting for lock…’**.”

* Node B cannot write until Node A releases the lock
* All operations occur in a strict sequential order
* This demonstrates **sequential consistency enforcement**

---

### 🔄 2. Transparency & Automation

> “I am not manually updating the dashboard.”

* Memory changes propagate automatically
* No direct communication with the frontend
* Demonstrates **transparent remote memory access**

---

### 🔁 3. Memory Coherence

> “All nodes end with the same final value.”

* Node A
* Node B
* React Dashboard

All display:

```json
{
  "count": 20
}
```

This confirms **global memory coherence**.

---

## 📂 Project Structure

```
/DSM-Project
│
├── /node-dsm                 # Backend & DSM logic
│   ├── server.js             # Central memory manager
│   ├── dsm-client.js         # DSM client library
│   ├── node-a.js             # Test node (writer)
│   └── node-b.js             # Test node (locking demo)
│
└── /dsm-dashboard             # Frontend visualization
    ├── src/
    │   ├── App.jsx            # Dashboard UI
    │   └── dsm-client.js      # DSM client (React version)
    └── package.json
```

---

## ⚙️ DSM API Example

```js
await dsm.connect();

await dsm.acquireLock();
await dsm.write("count", 10);
await dsm.releaseLock();

const value = await dsm.read("count");
```

All networking, synchronization, and consistency enforcement occur internally.

---

## 🐛 Troubleshooting

---

### ❌ Error: `EADDRINUSE: address already in use`

**Cause:**
An old server process is still running.

**Fix (PowerShell):**

```powershell
Get-NetTCPConnection -LocalPort 3000 |
ForEach-Object {
  Stop-Process -Id $_.OwningProcess -Force
}
```

Then restart:

```bash
node server.js
```

---

### ❌ Dashboard shows “Connecting…” forever

Check the following:

* ✅ Server is running on port **3000**
* ✅ No firewall blocking WebSockets
* ✅ Browser console (F12) shows no socket errors

---

## 📚 Academic Concepts Implemented

* Distributed Shared Memory (DSM)
* Sequential Consistency Model
* Mutual Exclusion via Locking
* Memory Coherence Protocols
* Transparent Remote Access
* Client–Server Distributed Architecture
* Real-Time State Replication

---

## 🎓 Educational Objective

This project demonstrates how operating systems and distributed systems:

* Simulate shared memory over networks
* Enforce consistency across machines
* Maintain coherence without physical shared RAM
* Handle concurrent access safely

---

## 👨‍💻 Author

**AI GROUP 33**
Frontend Engineer & Aspiring Distributed Systems Developer

---

## ⭐ Final Notes

NodeDSM is an educational implementation inspired by real-world DSM systems such as:

* Ivy DSM
* TreadMarks
* Java RMI Shared Objects

The project focuses on **clarity, correctness, and demonstrability** rather than low-level OS integration.

---

✅ **Distributed memory.
✅ Shared illusion.
✅ One coherent system.**

---

If you want next, I can also help you:

* 🔹 add diagrams (architecture + sequence diagrams)
* 🔹 write the **final project report (chapter-based)**
* 🔹 create a **presentation slide deck**
* 🔹 improve the README for GitHub stars
* 🔹 add **release consistency version**

Just tell me 👍
