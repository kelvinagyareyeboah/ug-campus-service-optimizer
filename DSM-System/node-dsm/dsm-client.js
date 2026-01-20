// We use the client version of socket.io
const io = require("socket.io-client");

class SharedMemoryClient {
    constructor(serverUrl = "http://localhost:3000") {
        this.socket = io(serverUrl);
        this.localMemory = {}; // Local Cache (Optimization Requirement)
        this.lockResolve = null; // Used to pause code until we get the lock
    }

    // 1. CONNECT & SYNC
    // Connects to server and waits for the initial memory download
    connect() {
        return new Promise((resolve) => {
            console.log("Connecting to DSM Server...");

            this.socket.on("connect", () => {
                console.log(`✅ Connected with ID: ${this.socket.id}`);
            });

            // Listen for the initial memory state
            this.socket.once("init_memory", (data) => {
                console.log("📥 Initial Memory Received:", data);
                this.localMemory = data;
                resolve(); // We are ready!
            });

            // Listen for updates from other nodes (Coherence)
            this.socket.on("memory_update", (updatedData) => {
                console.log("🔄 Update Received from Server:", updatedData);
                this.localMemory = updatedData;
                
                // If you are using React, you would trigger a re-render here!
                if (this.onUpdateCallback) {
                    this.onUpdateCallback(this.localMemory);
                }
            });

            // Listen for "Lock Granted" signal
            this.socket.on("lock_granted", () => {
                if (this.lockResolve) {
                    this.lockResolve(); // Resume the code waiting for the lock
                    this.lockResolve = null;
                }
            });
        });
    }

    // 2. ACQUIRE LOCK (Sequential Consistency)
    // This pauses your code until the server says "It's your turn"
    async acquireLock() {
        console.log("🔒 Requesting Lock...");
        this.socket.emit("request_lock");
        
        // Create a Promise that waits forever until 'lock_granted' resolves it
        return new Promise((resolve) => {
            this.lockResolve = resolve; 
        });
    }

    // 3. WRITE DATA (The Illusion)
    // Updates local memory AND sends it to the server
    write(key, value) {
        console.log(`📝 Writing ${key} = ${value}`);
        
        // Optimistic Update: Update local first so it feels instant
        this.localMemory[key] = value;
        
        // Send to server
        this.socket.emit("write_data", { [key]: value });
    }

    // 4. RELEASE LOCK
    releaseLock() {
        console.log("🔓 Releasing Lock...");
        this.socket.emit("release_lock");
    }

    // 5. READ DATA
    // Reads from the local cache (Fast!)
    get(key) {
        return this.localMemory[key];
    }
    
    // Helper for React to know when data changes
    onUpdate(callback) {
        this.onUpdateCallback = callback;
    }
}

module.exports = SharedMemoryClient;