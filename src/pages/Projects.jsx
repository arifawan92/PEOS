import { useState } from "react";

import { getProjects } from "../services/projectService";

import ProjectToolbar from "../components/projects/ProjectToolbar";
import ProjectList from "../components/projects/ProjectList";
import EmptyProjects from "../components/projects/EmptyProjects";
import CreateProjectDialog from "../components/projects/CreateProjectDialog";

function Projects() {
  const [projects, setProjects] = useState(getProjects());

  const [dialogOpen, setDialogOpen] = useState(false);

  function handleProjectCreated() {
    setProjects([...getProjects()]);
  }

  return (
    <>
      <ProjectToolbar
        onNewProject={() => setDialogOpen(true)}
      />

      {projects.length === 0 ? (
        <EmptyProjects />
      ) : (
        <ProjectList projects={projects} />
      )}

      <CreateProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </>
  );
}

export default Projects;