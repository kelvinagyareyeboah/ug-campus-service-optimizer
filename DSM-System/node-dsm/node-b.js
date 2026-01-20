const SharedMemoryClient = require("./dsm-client");

async function start() {
    const dsm = new SharedMemoryClient();
    await dsm.connect();

    console.log("--- NODE B STARTED ---");

    // 1. Get Permission
    console.log("Waiting for lock...");
    await dsm.acquireLock();
    console.log("✅ I finally got the lock!");

    // 2. Do the Work
    const currentValue = dsm.get("count");
    console.log(`Count is now: ${currentValue}`);
    
    console.log("Multiplying count by 2...");
    dsm.write("count", currentValue * 2);
    dsm.write("last_writer", "Node B");

    // 3. Release Permission
    dsm.releaseLock();
    console.log("--- NODE B FINISHED ---");
}

start();