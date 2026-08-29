import { useApp } from "../context/AppContext";

function Sidebar() {
  const { currentPage, setCurrentPage } = useApp();

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "projects", label: "Projects" },
    { id: "tasks", label: "Tasks" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside
      style={{
        width: "240px",
        borderRight: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h2>Navigation</h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            style={{
              padding: "12px",
              marginTop: "8px",
              cursor: "pointer",
              borderRadius: "6px",
              background:
                currentPage === item.id ? "#dbeafe" : "transparent",
              fontWeight:
                currentPage === item.id ? "bold" : "normal",
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;