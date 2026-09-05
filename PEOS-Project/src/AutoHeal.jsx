// PEOS AutoHeal v1.0 - Victory Edition
// Date: 5 Sep 2026 | Abbottabad
// "3 din ki mehnat, 1 click mein kamyabi" - Alhamdulillah

import React, { useState } from "react"; 
export default function AutoHeal() {
  const [status, setStatus] = useState("Idle - Button dabao"); // ) ; add kiya
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleHeal = async () => {
    if (!API_KEY) {
      setStatus("Error ❌.env mein VITE_GEMINI_API_KEY nahi mili"); // " ) ; add kiya
      return;
    }
    setStatus("AI thinking...");
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "PEOS system ko auto heal karo" }] }] }),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error.message);
      setStatus("Done ✅ \n" + data.candidates[0].content.parts[0].text);
    } catch (e) {
      setStatus("Error ❌ " + e.message);
    }
  };

  return (
    <div style={{padding: 20}}>
      <button onClick={handleHeal} style={{padding:'15px 30px', background:'green', color:'white', border:'none', borderRadius:'8px', cursor: 'pointer'}}>Auto Heal</button>
      <p style={{marginTop:'20px', whiteSpace: 'pre-wrap'}}><b>Status:</b> {status}</p>
    </div>
  )
}