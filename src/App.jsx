import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" }); // FINAL MODEL

function App() {
  const [result, setResult] = useState("Status: Idle - Button dabao");

  async function autoHeal() {
    setResult("AI thinking...");
    try {
      const res = await model.generateContent("PEOS system ko auto heal karo. 3 steps mein jawab do.");
      setResult(res.response.text());
    } catch(e) {
      setResult("Error: " + e.message);
    }
  }

  return (
    <div style={{padding: 20}}>
      <h1>PEOS AutoHeal v1</h1>
      <button onClick={autoHeal} style={{padding: '15px 30px', background: 'green', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Auto Heal</button>
      <p style={{marginTop: 20, whiteSpace: 'pre-wrap'}}>{result}</p>
    </div>
  )
}
export default App