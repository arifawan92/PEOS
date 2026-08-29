import { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import Dashboard from "../../pages/Dashboard";
import Projects from "../../pages/Projects";
import Tasks from "../../pages/Tasks";
import Settings from "../../pages/Settings";

function WorkingArea() {
  const { currentPage } = useContext(AppContext);

  function renderPage() {
    switch (currentPage) {
      case "projects":
        return <Projects />;

      case "tasks":
        return <Tasks />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  }

  return (
    <section
      style={{
        flex: 1,
        padding: "20px",
      }}
    >
      {renderPage()}
    </section>
  );
}

export default WorkingArea;