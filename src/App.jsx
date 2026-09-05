import { AppProvider } from './context/AppContext'
import WorkingArea from './components/layout/WorkingArea'
import AutoBuilder from './components/AutoBuilder'

function App() {
  return (
    <AppProvider>
      <div style={{padding: '20px', maxWidth: '1200px', margin: '0 auto'}}>
        <WorkingArea />
        <AutoBuilder />
      </div>
    </AppProvider>
  )
}

export default App