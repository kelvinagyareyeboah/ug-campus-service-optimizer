import React, { useEffect, useState, } from "react";
import SharedMemoryClient from "./dsm-client";
import "./App.css";

// Connect to your existing server
const dsm = new SharedMemoryClient("http://localhost:3000");

function App() {
  const [memory, setMemory] = useState({});
  const [logs, setLogs] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper to add logs to the screen
  const addLog = (msg) => setLogs((prev) => [msg, ...prev]);

  useEffect(() => {
    const init = async () => {
      addLog("📡 Connecting to Server...");
      
      // 1. Listen for updates (Transparency)
      dsm.onUpdate((newData) => {
        setMemory(newData);
        addLog(`🔄 Memory Updated: ${JSON.stringify(newData)}`);
      });

      // 2. Connect
      await dsm.connect();
      setLoading(false);
      addLog("✅ Connected & Synced!");
    };

    init();
  }, []);

  // Handler: Request Lock -> Write -> Release
  const handleUpdate = async (key, value) => {
    try {
      addLog("⏳ Requesting Lock...");
      setIsLocked(true); // Disable buttons while waiting

      // A. Acquire Lock (Sequential Consistency)
      await dsm.acquireLock();
      addLog("🔐 Lock Acquired!");

      // B. Simulate delay so you can see the 'Lock' state visual
      await new Promise(r => setTimeout(r, 500));

      // C. Write Data
      dsm.write(key, value);
      addLog(`📝 Wrote ${key} = ${value}`);

      // D. Release Lock
      dsm.releaseLock();
      addLog("🔓 Lock Released");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLocked(false);
    }
  };

  if (loading) return <h1>Connecting to DSM System...</h1>;

  return (
    <div className="container">
      <h1>🧠 DSM Visualizer</h1>
      
      {/* SECTION 1: MEMORY STATE (GRID) */}
      <div className="memory-grid">
        {Object.entries(memory).map(([key, val]) => (
          <div key={key} className={`memory-cell ${key === 'active' ? 'active' : ''}`}>
            <h3>{key}</h3>
            <p className="value">{val.toString()}</p>
            <div className="controls">
              {/* Numeric Controls */}
              {typeof val === 'number' && (
                <>
                  <button disabled={isLocked} onClick={() => handleUpdate(key, val + 1)}>+</button>
                  <button disabled={isLocked} onClick={() => handleUpdate(key, val - 1)}>-</button>
                </>
              )}
              {/* String Controls */}
              {typeof val === 'string' && (
                <button disabled={isLocked} onClick={() => handleUpdate(key, val + "!")}>Add "!"</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 2: SYSTEM LOGS */}
      <div className="logs-panel">
        <h3>System Logs</h3>
        <div className="logs-list">
          {logs.map((log, i) => (
            <div key={i} className="log-item">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;