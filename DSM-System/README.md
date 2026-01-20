# 🧠 NodeDSM — Distributed Shared Memory System

---

## 📖 Project Overview

**NodeDSM** is a Distributed Shared Memory (DSM) system that provides the illusion of a single, unified memory space across multiple networked computers.

Although the memory is physically distributed, NodeDSM enables all participating nodes to interact with shared data **as if it were stored locally**, while the system transparently manages synchronization, consistency, and memory coherence.

The system is built using an **Object-Based DSM architecture** with a **centralized memory manager**, simplifying coordination, synchronization, and fault handling.

---

## ✨ Key Features

* ✅ Distributed Shared Memory abstraction
* ✅ Object-Based memory model (JSON data store)
* ✅ Sequential Consistency using distributed locking
* ✅ Transparent remote access (networking hidden from users)
* ✅ Memory coherence via broadcast updates
* ✅ Real-time visualization using a React dashboard
* ✅ Fault tolerance with automatic lock release on node failure

---

## 🏗️ System Architecture

### Topology

**Centralized Manager (Star Architecture)**

All nodes connect to a single central memory server using WebSockets.

* Nodes communicate **only with the server**
* The server manages memory ownership and locking
* Updates are broadcast to all connected nodes

### Architecture Overview

* **Node A / Node B**
  Distributed clients that perform read and write operations.

* **Central Server**
  Acts as the memory manager responsible for:

  * Shared object storage
  * Lock management
  * Consistency enforcement
  * Broadcasting memory updates

* **Dashboard**
  A passive observer node that visualizes memory updates in real time.

---

## 🧩 System Components

### 🧠 Central Server

* Maintains the global shared memory store
* Grants and releases locks
* Enforces sequential consistency
* Broadcasts updates to all connected nodes

---

### 📦 DSM Client Library

* Used by all nodes (including the dashboard)
* Hides all networking logic
* Provides a simple read/write interface
* Automatically handles synchronization

---

### 🌐 Dashboard

* Built with React + Vite
* Displays live memory values
* Receives updates like any other node
* Does not directly modify memory

---

## 🛠️ Tech Stack

| Layer              | Technology                       |
| ------------------ | -------------------------------- |
| Runtime            | Node.js                          |
| Communication      | Socket.io (WebSockets)           |
| DSM Model          | Object-Based                     |
| Consistency Model  | Sequential Consistency (Locking) |
| Coherence Protocol | Write-Update                     |
| Frontend           | React + Vite                     |
| Architecture       | Centralized Manager              |

---

## 📦 Installation Guide (For Teammates)

This repository contains **two independent applications** that must both be installed.

---

### 1️⃣ Clone the Repository

```
git clone <YOUR_GITHUB_REPO_URL>
cd DSM-Project
```

---

### 2️⃣ Backend Setup (DSM Server)

Navigate to the backend folder:

```
cd node-dsm
npm install
```

This installs:

* Socket.io
* Server dependencies
* Memory manager logic

---

### 3️⃣ Frontend Setup (Dashboard)

Open a new terminal window:

```
cd ../dsm-dashboard
npm install
```

This installs:

* React
* Vite
* socket.io-client

---

## 🎬 How to Run the Demo

To demonstrate the full DSM system, **four terminals are required**.

---

### 🟢 Terminal 1 — The Brain (Server)

Start the central memory server:

```
cd node-dsm
node server.js
```

Expected output:

🧠 Central Memory Server running on port 3000...

---

### 🔵 Terminal 2 — The Eyes (Dashboard)

Start the visualization interface:

```
cd dsm-dashboard
npm run dev
```

Open the browser link displayed in the terminal
(usually [http://localhost:5173](http://localhost:5173)).

---

### 🔴 Terminal 3 — Node A (Writer)

Simulate the first distributed computer:

```
cd node-dsm
node node-a.js
```

---

### 🟠 Terminal 4 — Node B (Waiter)

Immediately after Node A starts:

```
cd node-dsm
node node-b.js
```

---

## 🕵️ What to Explain During the Presentation

While the system is running, highlight the following behaviors:

---

### 🔐 Sequential Consistency

> “Notice how Node B prints **‘Waiting for lock…’**.”

Node B cannot write until Node A releases the lock.
This confirms that all memory operations occur in a strict sequential order.

---

### 🔄 Transparency

> “The dashboard updates automatically without manual input.”

The dashboard behaves as another DSM node and receives the same broadcast updates, proving that remote memory access is completely transparent.

---

### 🔁 Memory Coherence

> “At the end, all nodes show the same value.”

Node A, Node B, and the dashboard all display:

```
count: 20
```

This confirms global memory coherence across the system.

---

## 📂 Project Structure

```
/DSM-Project
│
├── /node-dsm
│   ├── server.js            # Central memory manager
│   ├── dsm-client.js        # DSM client library
│   ├── node-a.js            # Writer node
│   └── node-b.js            # Locking demonstration node
│
└── /dsm-dashboard
    ├── src/
    │   ├── App.jsx          # Dashboard UI logic
    │   └── dsm-client.js    # DSM client adapted for React
    └── package.json
```

---

## 🐛 Troubleshooting

---

### ❌ Error: `EADDRINUSE: address already in use`

**Cause:**
An old server instance is still running.

**Fix (PowerShell):**

```
Get-NetTCPConnection -LocalPort 3000 |
ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

Then restart:

```
node server.js
```

---

### ❌ Dashboard says “Connecting…” forever

Check that:

* The server is running on port **3000**
* The dashboard connects to **[http://localhost:3000](http://localhost:3000)**
* No firewall is blocking WebSockets

---

## 🎓 Academic Concepts Implemented

* Distributed Shared Memory (DSM)
* Sequential Consistency Model
* Distributed Locking
* Memory Coherence Protocols
* Transparent Remote Memory Access
* Centralized Distributed Architecture
* Real-Time State Synchronization

---

## 👨‍💻 Contributors

**AI Group 33**

* Distributed Systems Design
* Frontend Engineering
* System Architecture

---

## ✅ Summary

NodeDSM demonstrates how modern distributed systems:

* Simulate shared memory across machines
* Enforce consistency without physical shared RAM
* Maintain coherence using message passing
* Provide transparency to application developers

---

**One memory.
Many machines.
Perfect synchronization.** 🧠✨
