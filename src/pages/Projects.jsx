import { useState, useEffect } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Page load پر PC کی فائل سے data لانا
  useEffect(() => {
    if(window.peosAPI){
      setProjects(window.peosAPI.get('projects'));
    }
  }, []);

  // جب بھی projects بدلیں تو PC کی فائل میں save کرنا
  useEffect(() => {
    if(window.peosAPI){
      window.peosAPI.set('projects', projects);
    }
  }, [projects]);

  const addProject = () => {
    if (!newName.trim()) return;
    setProjects([...projects, { id: Date.now(), name: newName, desc: newDesc }]);
    setNewName(""); 
    setNewDesc(""); 
    setShowForm(false);
  };

  return (
    <div style={{padding: 20}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h2>Projects</h2>
        <button onClick={() => setShowForm(!showForm)}>+ New Project</button>
      </div>

      {showForm && (
        <div style={{border: "1px solid #ccc", padding: 10, margin: "10px 0", borderRadius: 5}}>
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Project ka naam" style={{width: "100%", padding: 5}}/><br/><br/>
          <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Description" style={{width: "100%", padding: 5}}/><br/><br/>
          <button onClick={addProject}>Save</button>
        </div>
      )}

      {projects.length === 0? 
        <p>ابھی کوئی project نہیں</p> 
        : 
        projects.map(p => 
          <div key={p.id} style={{border: "1px solid #eee", margin: 5, padding: 10, borderRadius: 5}}>
            <b>{p.name}</b>
            <p>{p.desc}</p>
          </div>
        )
      }
    </div>
  );
}