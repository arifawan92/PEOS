import TasksManager from "../TasksManager"

export default function WorkingArea() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{color: 'green'}}>PEOS Dashboard 🚀</h1>
      <TasksManager />
    </div>
  )
}