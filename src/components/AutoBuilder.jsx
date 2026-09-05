import { useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const BUILT_TEMPLATES = [
  {
    name: '⚛️ React + Vite Project',
    files: [
      {name: 'package.json', code: `{
  "name": "peos-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}`},
      {name: 'index.html', code: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>PEOS App</title></head>
<body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>`},
      {name: 'src/App.jsx', code: `export default function App(){
  return <div style={{textAlign:'center', marginTop:'50px', fontFamily:'Arial'}}>
    <h1>PEOS Auto Built ✅</h1>
    <p>Run: npm install && npm run dev</p>
  </div>
}`},
      {name: 'src/main.jsx', code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)`}
    ]
  },
  {
    name: '🔥 PEOS + Tailwind + Supabase',
    files: [
      {name: 'package.json', code: `{
  "name": "peos-tailwind",
  "private": true,
  "scripts": { "dev": "vite", "build": "vite build" },
  "dependencies": { "react": "^18.2.0", "react-dom": "^18.2.0", "@supabase/supabase-js": "^2.39.0" },
  "devDependencies": { "vite": "^5.0.0", "tailwindcss": "^3.4.0", "autoprefixer": "^10.4.0", "postcss": "^8.4.0" }
}`},
      {name: 'tailwind.config.js', code: `export default { content: ["./index.html","./src/**/*.{js,jsx}"], theme: {extend:{}}, plugins: [] }`},
      {name: 'src/index.css', code: `@tailwind base; @tailwind components; @tailwind utilities;`},
      {name: 'src/App.jsx', code: `export default function App(){ return <div className="p-10 text-center text-3xl font-bold text-blue-600">PEOS + Tailwind + Supabase Ready ✅</div> }`}
    ]
  },
  {
    name: '📦 PEOS Task Manager Module',
    files: [
      {name: 'src/components/TasksManager.jsx', code: '// Paste your TaskManager code here'}
    ]
  }
]

export default function AutoBuilder() {
  const [log, setLog] = useState(['Waiting for build...'])
  const [currentFiles, setCurrentFiles] = useState([])

  function buildProject(template) {
    setLog([`🚀 Building: ${template.name}`])
    setCurrentFiles(template.files)
    
    template.files.forEach((file, i) => {
      setTimeout(() => {
        setLog(prev => [...prev, `✅ Created: ${file.name}`])
      }, i * 300)
    })
    
    setTimeout(() => {
      setLog(prev => [...prev, `🎉 Build Complete! Download ZIP below`])
    }, template.files.length * 300 + 300)
  }

  async function downloadZip() {
    if(currentFiles.length === 0) return
    setLog(prev => [...prev, `📦 Creating ZIP...`])
    
    const zip = new JSZip()
    currentFiles.forEach(file => {
      zip.file(file.name, file.code)
    })
    
    const content = await zip.generateAsync({type: "blob"})
    saveAs(content, "PEOS-Project.zip")
    setLog(prev => [...prev, `📦 Downloaded: PEOS-Project.zip`])
  }

  function copyCode(file) {
    navigator.clipboard.writeText(file.code)
    setLog(prev => [...prev, `📋 Copied: ${file.name}`])
  }

  return (
    <div style={{border: '2px solid #1976d2', padding: '20px', marginTop: '20px', borderRadius: '8px'}}>
      <h2>PEOS Auto Built Mode ⚡</h2>
      <p>1 Click = Full Project Structure Ready</p>
      
      <div>
        {BUILT_TEMPLATES.map((tpl, i) => (
          <button key={i} onClick={() => buildProject(tpl)}
            style={{margin: '5px', padding: '10px 15px', background: '#7b1fa2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
            {tpl.name}
          </button>
        ))}
      </div>

      {currentFiles.length > 0 && (
        <button onClick={downloadZip}
          style={{margin: '10px 5px', padding: '10px 15px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
          📦 Download PEOS-Project.zip
        </button>
      )}

      {currentFiles.map((file, i) => (
        <div key={i} style={{margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <b>{file.name}</b>
            <button onClick={() => copyCode(file)} style={{padding: '4px 8px', cursor: 'pointer'}}>📋 Copy</button>
          </div>
          <pre style={{fontSize: '11px', maxHeight: '100px', overflow: 'auto', background: 'white', padding: '5px'}}>{file.code}</pre>
        </div>
      ))}
      
      <div style={{background: 'black', color: 'lime', padding: '10px', marginTop: '15px', height: '120px', overflow: 'auto', fontFamily: 'monospace'}}>
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  )
}