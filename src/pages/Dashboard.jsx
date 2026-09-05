import AutoTester from '../components/AutoTester'  // 1. اوپر import کریں

function Dashboard() {
  return (
    <>
      <h1>Project Workspace</h1>

      <p>Current Page:</p>

      <h2>Dashboard</h2>

      {/* 2. یہاں AutoTester لگا دیں */}
      <div className="mt-6">
        <AutoTester />
      </div>
    </>
  );
}

export default Dashboard;