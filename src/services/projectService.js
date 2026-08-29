const STORAGE_KEY = "peos.projects";

const defaultProjects = [
  {
    id: 1,
    name: "PEOS",
    description: "Personal Enterprise OS",
  },
  {
    id: 2,
    name: "Career OS",
    description: "Career Management System",
  },
];

function loadProjects() {
  const storedProjects = localStorage.getItem(STORAGE_KEY);

  if (!storedProjects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
    return [...defaultProjects];
  }

  try {
    return JSON.parse(storedProjects);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
    return [...defaultProjects];
  }
}

export function getProjects() {
  return loadProjects();
}

export function addProject(project) {
  const projects = loadProjects();

  const newProject = {
    id: Date.now(),
    ...project,
  };

  projects.push(newProject);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

  return newProject;
}
export const updateProject=(id,newName)=>{const projects=getProjects();const updated=projects.map(p=>p.id===id?{...p,name:newName}:p);localStorage.setItem('peos.projects',JSON.stringify(updated));return updated};export const deleteProject=(id)=>{const projects=getProjects();const updated=projects.filter(p=>p.id!==id);localStorage.setItem('peos.projects',JSON.stringify(updated));return updated}
