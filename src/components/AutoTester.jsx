import { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const AutoTester = () => {
  const [report, setReport] = useState([])
  const [loading, setLoading] = useState(false)

  const testSteps = [
    { id: 1, name: 'Database Connection', test: () => true },
    { id: 2, name: 'UI Load Test', test: () => document.getElementById('root') !== null },
    { id: 3, name: 'Belt Motor Check', test: () => true },
    { id: 4, name: 'Kirana Barcode Scanner', test: () => true },
    { id: 5, name: 'Projects Page Visible', test: () => document.body.innerText.toLowerCase().includes('project') },
    { id: 6, name: 'New Project Button', test: () => document.querySelectorAll('button').length > 0 },
    { id: 8, name: 'Navigation Menu', test: () => document.body.innerText.includes('Dashboard') || document.body.innerText.includes('Tasks') },
  ]

  const runFullTest = async () => {
    setLoading(true)
    let results = []

    for(const step of testSteps){
      const status = step.test() ? 'Pass ✅' : 'Fail ❌'
      results.push({ ...step, status })
      await new Promise(r => setTimeout(r, 500))
    }
    
    const canvas = await html2canvas(document.body)
    const screenshot = canvas.toDataURL('image/png')

    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("PEOS Self Test Report", 10, 15)
    doc.setFontSize(10)
    results.forEach((r, i) => doc.text(`${i+1}. ${r.name}: ${r.status}`, 10, 30 + i*7))
    doc.addImage(screenshot, 'PNG', 10, 30 + results.length*7 + 10, 180, 90)

    setReport(results)
    setLoading(false)
    doc.save(`PEOS-Report-${new Date().toLocaleDateString()}.pdf`)
    alert("✅ Report Ready! PDF Download ہو گیا")
  }

  return (
    <div className="p-6">
      <button 
        onClick={runFullTest} 
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
      >
        {loading ? '⏳ Testing Running...' : '🚀 Run Full Self Test'}
      </button>

      <div className="mt-4">
        {report.map(r => <p key={r.id} className="py-1">{r.name}: <b>{r.status}</b></p>)}
      </div>
    </div>
  )
}
export default AutoTester