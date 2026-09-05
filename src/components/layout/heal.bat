@echo off
echo ===================================
echo PEOS AUTO HEAL STARTED...
echo ===================================

echo [1/4] Installing missing packages...
call npm install @supabase/supabase-js

echo [2/4] Fixing supabaseClient.js...
echo import { createClient } from '@supabase/supabase-js' > src/supabaseClient.js
echo const supabaseUrl = 'https://qqdpngxfiytevqlqjbrb.supabase.co' >> src/supabaseClient.js
echo const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZHB3dmd4Zml5dGV2cWxxanJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MzE4MjQsImV4cCI6MjEwNDAwNzgyNH0.xnaGLBr0y1_pOXibsm5WmgJIE_UZsNIT4JVwyLeoWxk' >> src/supabaseClient.js
echo export const supabase = createClient(supabaseUrl, supabaseKey) >> src/supabaseClient.js

echo [3/4] Fixing WorkingArea.jsx path...
echo import { AppContext } from "../../context/AppContext"; > src/components/layout/WorkingArea.jsx
echo import TasksManager from '../TasksManager' >> src/components/layout/WorkingArea.jsx
echo. >> src/components/layout/WorkingArea.jsx
echo function WorkingArea() { >> src/components/layout/WorkingArea.jsx
echo   return ( >> src/components/layout/WorkingArea.jsx
echo     ^<div style={{ padding: '20px' }}^> >> src/components/layout/WorkingArea.jsx
echo       ^<h1^>PEOS Dashboard ^🚀^</h1^> >> src/components/layout/WorkingArea.jsx
echo       ^<TasksManager /^> >> src/components/layout/WorkingArea.jsx
echo     ^</div^> >> src/components/layout/WorkingArea.jsx
echo   ) >> src/components/layout/WorkingArea.jsx
echo } >> src/components/layout/WorkingArea.jsx
echo. >> src/components/layout/WorkingArea.jsx
echo export default WorkingArea >> src/components/layout/WorkingArea.jsx

echo [4/4] Starting Server...
call npm run dev

echo ===================================
echo AUTO HEAL COMPLETE!
echo ===================================
pause