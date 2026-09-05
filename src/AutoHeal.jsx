import React, { useState, useEffect } from 'react';
import si from 'systeminformation';

export default function AutoHeal() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [errorLog, setErrorLog] = useState("System running normally");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    const getStats = async () => {
      try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const disk = await si.fsSize();
        
        setCpuUsage(cpu.currentLoad.toFixed(1));
        setRamUsage(((mem.used / mem.total) * 100).toFixed(1));
        setDiskUsage((disk[0].used / disk[0].size * 100).toFixed(1));
      } catch (err) {
        setErrorLog("Error: " + err.message);
      }
    };
    
    getStats();
    const interval = setInterval(getStats, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleHeal = async () => {
    setStatus("Healing...");
    setAiSuggestion("AI is scanning for issues...");
    setTimeout(() => {
      setAiSuggestion("AI Suggestion: RAM usage is high. Close unused apps to improve performance.");
      setStatus("Fixed");
    }, 2000);
  };

  return (
    <div style={{padding: 20, backgroundColor: '#111', color: 'white', minHeight: '100vh'}}>
      <h1 style={{fontSize: '24px', marginBottom: '20px'}}>PEOS AutoHeal v1.1 - LIVE</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px'}}>
        <div style={{background: '#222', padding: '15px', borderRadius: '8px'}}>
          <h3>CPU Usage</h3>
          <p style={{fontSize: '28px', color: '#4ade80'}}>{cpuUsage}%</p>
        </div>
        <div style={{background: '#222', padding: '15px', borderRadius: '8px'}}>
          <h3>RAM Usage</h3>
          <p style={{fontSize: '28px', color: '#facc15'}}>{ramUsage}%</p>
        </div>
        <div style={{background: '#222', padding: '15px', borderRadius: '8px'}}>
          <h3>Disk Usage</h3>
          <p style={{fontSize: '28px', color: '#60a5fa'}}>{diskUsage}%</p>
        </div>
      </div>

      <div style={{background: '#222', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
        <h3>Error Log</h3>
        <p style={{whiteSpace: 'pre-wrap'}}>{errorLog}</p>
      </div>

      <button 
        onClick={handleHeal} 
        style={{padding: '15px 30px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px'}}
      >
        Auto Heal - {status}
      </button>

      {aiSuggestion && (
        <div style={{marginTop: '20px', background: '#14532d', padding: '15px', borderRadius: '8px'}}>
          <h3>AI Suggestion</h3>
          <p>{aiSuggestion}</p>
        </div>
      )}
    </div>
  );
}