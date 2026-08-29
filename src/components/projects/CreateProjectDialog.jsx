import { useState } from "react";

import { addProject } from "../../services/projectService";

function CreateProjectDialog({
  open,
  onClose,
  onProjectCreated,
}) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  function handleCreateProject() {
    if (projectName.trim() === "") {
      setError("Project Name is required.");
      return;
    }

    const project = addProject({
      name: projectName,
      description,
    });

    setProjectName("");
    setDescription("");
    setError("");

    onProjectCreated(project);

    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "520px",
          background: "#fff",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <h2>Create Project</h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Project Name
          </label>

          <input
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="Enter project name"
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p
              style={{
                color: "red",
                marginTop: "8px",
              }}
            >
              {error}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Description
          </label>

          <textarea
            rows="5"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Project description..."
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button onClick={onClose}>
            Cancel
          </button>

          <button onClick={handleCreateProject}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectDialog;