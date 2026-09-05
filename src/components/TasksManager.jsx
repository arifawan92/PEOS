import { useState, useEffect } from 'react'

const AUTO_TEMPLATES = [
  {
    name: '🚀 PEOS New Project Setup',
    steps: [
      'Folder create karo: peos-project',
      'npm install karo',
      'Git init karo',
      'README.md file banao'
    ]
  },
  {
    name: '📝 Daily Study Task',
    steps: [
      'Video 1 dekho - 30 min',
      'Notes likho',
      'Practice 3 questions',
      'Revision karo'
    ]
  },
  {
    name: '💻 Code Debug Task',
    steps: [
      'Error ko copy karo',
      'Google pe search karo',
      'Fix apply karo',
      'Test karo'
    ]
  },
  {
    name: '📦 Supabase Connect Task',
    steps: [
      'supabaseClient.js check karo',
      'Table create karo',
      'Data insert test karo',
      'UI se connect karo'
    ]
  }
]

export default function TasksManager() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('peos_tasks')
    if(saved) setTasks(JSON.parse(saved))
    else setTasks([{id: 1, task: 'PEOS Setup Complete ✅', done: true}])
  }, [])

  useEffect(() => {
    localStorage.setItem('peos_tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(taskText) {
    if(taskText === '') return
    setTasks([...tasks, {id: Date.now(), task: taskText, done: false}])
    setNewTask('')
  }

  function addTemplate(template) {
    template.steps.forEach(step => {
      setTasks(prev => [...prev, {id: Date.now() + Math.random(), task: step, done: false}])
    })
  }

  function toggleDone(id) {
    setTasks(tasks.map(t => t.id === id? {...t, done:!t.done} : t))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id!== id))
  }

  return (
    <div style={{border: '2px solid green', padding: '20px', marginTop: '20px', borderRadius: '8px'}}>
      <h2>PEOS Task Manager - Auto Mode ⚡</h2>
      <p>Total: {tasks.length} | Done: {tasks.filter(t => t.done).length}</p>

      {/* AUTO STEP BUTTONS */}
      <div style={{background: '#f0f0f0', padding: '10px', marginBottom: '15px', borderRadius: '5px'}}>
        <h3>1-Click Auto Templates:</h3>
        {AUTO_TEMPLATES.map((tpl, i) => (
          <button 
            key={i} 
            onClick={() => addTemplate(tpl)}
            style={{margin: '5px', padding: '8px 12px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px'}}
          >
            {tpl.name}
          </button>
        ))}
      </div>

      {/* MANUAL ADD */}
      <input 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask(newTask)}
        placeholder="Ya manual task likhen" 
        style={{padding: '8px', width: '200px'}}
      />
      <button onClick={() => addTask(newTask)} style={{marginLeft: '10px', padding: '8px 15px', background: 'green', color: 'white', border: 'none'}}>Add Task</button>
      
      {/* TASK LIST */}
      <ul style={{marginTop: '15px', textAlign: 'left', listStyle: 'none', padding: 0}}>
        {tasks.map(task => (
          <li key={task.id} style={{margin: '8px 0', padding: '8px', background: task.done? '#d4edda' : '#fff', border: '1px solid #ccc'}}>
            <input type="checkbox" checked={task.done} onChange={() => toggleDone(task.id)} />
            <span style={{textDecoration: task.done? 'line-through' : 'none', marginLeft: '8px'}}>
              {task.task}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{marginLeft: '10px', color: 'red', cursor: 'pointer', float: 'right'}}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}