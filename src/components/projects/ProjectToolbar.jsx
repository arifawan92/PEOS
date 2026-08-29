function ProjectToolbar({ onNewProject }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <h2>Projects</h2>

      <button
        onClick={onNewProject}
        style={{
          padding: "12px 20px",
          cursor: "pointer",
        }}
      >
        + New Project
      </button>
    </div>
  );
}

export default ProjectToolbar;