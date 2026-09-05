@echo off
echo ===================================
echo PEOS AUTO HEAL v2 STARTED...
echo ===================================

echo [1/4] Installing Supabase...
call npm install @supabase/supabase-js

echo [2/4] Creating supabaseClient.js...
echo import { createClient } from '@supabase/supabase-js' > src/supabaseClient.js
echo const supabaseUrl = 'https://qqdpngxfiytevqlqjbrb.supabase.co' >> src/supabaseClient.js
echo const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZHB3dmd4Zml5dGV2cWxxanJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MzE4MjQsImV4cCI6MjEwNDAwNzgyNH0.xnaGLBr0y1_pOXibsm5WmgJIE_UZsNIT4JVwyLeoWxk' >> src/supabaseClient.js
echo export const supabase = createClient(supabaseUrl, supabaseKey) >> src/supabaseClient.js

echo [3/4] Creating TasksManager.jsx...
echo import { useState, useEffect } from 'react' > src/components/TasksManager.jsx
echo import { supabase } from '../supabaseClient' >> src/components/TasksManager.jsx
echo. >> src/components/TasksManager.jsx
echo export default function TasksManager() { >> src/components/TasksManager.jsx
echo   const [tasks, setTasks] = useState([]) >> src/components/TasksManager.jsx
echo   const [newTask, setNewTask] = useState('') >> src/components/TasksManager.jsx
echo   useEffect^(^) { fetchTasks^(^) }, []^) >> src/components/TasksManager.jsx
echo   async function fetchTasks^(^) { const { data } = await supabase.from^('tasks'^).select^('*'^); setTasks^(data ^|^| []^) } >> src/components/TasksManager.jsx
echo   async function addTask^(^) { if^(newTask === ''^) return; await supabase.from^('tasks'^).insert^[^{ task: newTask }^]; setNewTask^(''^); fetchTasks^(^) } >> src/components/TasksManager.jsx
echo   return ^( >> src/components/TasksManager.jsx
echo     ^<div^>^<h2^>Task Manager^</h2^> >> src/components/TasksManager.jsx
echo     ^<input value={newTask} onChange={^(e^) ^=> setNewTask^(e.target.value^)} placeholder="New Task" /^> >> src/components/TasksManager.jsx
echo     ^<button onClick={addTask}^>Add Task^</button^> >> src/components/TasksManager.jsx
echo     ^<ul^>{tasks.map^(task ^=> ^<li key={task.id}^>{task.task}^</li^>^)}^</ul^> >> src/components/TasksManager.jsx
echo     ^</div^> >> src/components/TasksManager.jsx
echo   ^) >> src/components/TasksManager.jsx
echo } >> src/components/TasksManager.jsx

echo [4/4] Fixing WorkingArea.jsx...
echo import TasksManager from "../TasksManager" > src/components/layout/WorkingArea.jsx
echo. >> src/components/layout/WorkingArea.jsx
echo function WorkingArea^(^) { >> src/components/layout/WorkingArea.jsx
echo   return ^( >> src/components/layout/WorkingArea.jsx
echo     ^<div style={{ padding: "20px" }}^> >> src/components/layout/WorkingArea.jsx
echo       ^<h1^>PEOS Dashboard ^🚀^</h1^> >> src/components/layout/WorkingArea.jsx
echo       ^<TasksManager /^> >> src/components/layout/WorkingArea.jsx
echo     ^</div^> >> src/components/layout/WorkingArea.jsx
echo   ^) >> src/components/layout/WorkingArea.jsx
echo } >> src/components/layout/WorkingArea.jsx
echo export default WorkingArea >> src/components/layout/WorkingArea.jsx

echo.
echo ===================================
echo AUTO HEAL COMPLETE! Starting Server...
echo ===================================
call npm run dev
pause