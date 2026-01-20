const SharedMemoryClient = require("./dsm-client");

async function start() {
    const dsm = new SharedMemoryClient();
    await dsm.connect();

    console.log("--- NODE A STARTED ---");

    // 1. Get Permission
    await dsm.acquireLock();
    console.log("✅ I have the lock!");

    // 2. Do the Work
    const oldValue = dsm.get("count");
    console.log(`Current Count: ${oldValue}`);
    
    console.log("Adding 10 to count...");
    dsm.write("count", oldValue + 10);
    dsm.write("last_writer", "Node A");

    // 3. Simulate "Thinking Time" (Optional - shows the lock working)
    // We hold the lock for 3 seconds. Node B cannot write during this time.
    await new Promise(r => setTimeout(r, 3000));

    // 4. Release Permission
    dsm.releaseLock();
    console.log("--- NODE A FINISHED ---");
}

start();