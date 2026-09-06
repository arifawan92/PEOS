import { useState } from "react";

export default function AutoBuilder() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleHeal = async () => {
    setLoading(true);
    setResult("Healing ho rahi hai... 3 second rukain");
    try {
      const res = await fetch("/api/heal", { method: "POST" });
      const data = await res.json();
      setResult("Kamyab! " + data.message + " Time: " + data.time);
    } catch (e) {
      setResult("Error aa gaya: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{padding: "20px"}}>
      <button 
        onClick={handleHeal} 
        disabled={loading}
        style={{background: "green", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", fontSize: "16px"}}
      >
        {loading ? "Healing..." : "Auto Heal"}
      </button>
      <p style={{marginTop: "10px", fontSize: "18px"}}>{result}</p>
    </div>
  );
}
