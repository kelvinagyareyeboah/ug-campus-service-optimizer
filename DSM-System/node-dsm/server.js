const { Server } = require("socket.io");

// Start the Socket.io server on port 3000
// "cors: origin *" allows your React website to connect later without security errors
const io = new Server(3000, {
    cors: { origin: "*" }
});

console.log("🧠 Central Memory Server running on port 3000...");

// --- SYSTEM STATE ---

// REQUIREMENT: Object-Based DSM
// Instead of complex RAM pages, we share a simple JSON object.
// This is the "Master Copy" of the data.
let sharedMemory = {
    message: "Welcome to DSM",
    count: 0,
    status: "Active"
};

// REQUIREMENT: Memory Consistency (Sequential)
// We use a specific variable to track who is allowed to write.
// If lockHolder is null, the memory is free.
let lockHolder = null; 
let lockQueue = [];    // A waiting line for clients who want to write

// --- EVENT HANDLING ---

io.on("connection", (socket) => {
    console.log(`➕ New Node Connected: ${socket.id}`);
    
    // REQUIREMENT: Transparency / Initialization
    // As soon as a node joins, give them the current state so they are up to date.
    socket.emit("init_memory", sharedMemory);

    // ---------------------------------------------------------
    // EVENT 1: LOCK REQUEST (Implementing Sequential Consistency)
    // ---------------------------------------------------------
    socket.on("request_lock", () => {
        if (lockHolder === null) {
            // Case A: No one is writing. Grant the lock immediately.
            lockHolder = socket.id;
            socket.emit("lock_granted");
            console.log(`🔐 Lock GRANTED to ${socket.id}`);
        } else {
            // Case B: Someone is writing. Put this node in the waiting line.
            lockQueue.push(socket.id);
            console.log(`⏳ Node ${socket.id} added to wait queue.`);
        }
    });

    // ---------------------------------------------------------
    // EVENT 2: WRITE DATA (Implementing Write-Update Coherence)
    // ---------------------------------------------------------
    socket.on("write_data", (newData) => {
        // SECURITY CHECK: Only the lock holder is allowed to change memory.
        if (socket.id === lockHolder) {
            console.log(`📝 Update received from ${socket.id}`);
            
            // 1. Update the Master Copy
            sharedMemory = { ...sharedMemory, ...newData };

            // 2. Broadcast the new data to EVERYONE immediately
            // This satisfies the "Memory Coherence" requirement.
            io.emit("memory_update", sharedMemory);
        } else {
            console.warn(`⚠️ Unauthorized write attempt by ${socket.id}`);
        }
    });

    // ---------------------------------------------------------
    // EVENT 3: RELEASE LOCK
    // ---------------------------------------------------------
    socket.on("release_lock", () => {
        if (socket.id === lockHolder) {
            console.log(`🔓 Lock RELEASED by ${socket.id}`);
            handleLockRelease();
        }
    });

    // ---------------------------------------------------------
    // EVENT 4: FAULT TOLERANCE (Handling Crashes)
    // ---------------------------------------------------------
    socket.on("disconnect", () => {
        console.log(`❌ Node Disconnected: ${socket.id}`);
        
        // If the node that crashed was holding the lock, we must free it.
        // Otherwise, the system would freeze forever (Deadlock).
        if (socket.id === lockHolder) {
            console.log(`🚨 CRITICAL: Lock holder crashed! Force releasing lock.`);
            handleLockRelease();
        }

        // Also remove them from the waiting line if they were there
        lockQueue = lockQueue.filter(id => id !== socket.id);
    });
});

// --- HELPER FUNCTION ---

// This function passes the lock to the next person in line.
function handleLockRelease() {
    lockHolder = null;

    // Check the Queue (FIFO - First In, First Out)
    if (lockQueue.length > 0) {
        const nextNode = lockQueue.shift(); // Get the first person waiting
        lockHolder = nextNode;
        
        // Tell that specific node: "It is your turn"
        io.to(nextNode).emit("lock_granted"); 
        console.log(`🔐 Lock passed to queued node: ${nextNode}`);
    }
}