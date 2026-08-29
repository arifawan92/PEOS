import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatusBar from "../components/layout/StatusBar";

function MainLayout({ children }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: "20px",
          }}
        >
          {children}
        </main>
      </div>

      <StatusBar />
    </div>
  );
}

export default MainLayout;