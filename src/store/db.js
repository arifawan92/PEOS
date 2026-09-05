const KEY = "peos_projects_db_final";

export const db = {
  get: () => {
    const data = localStorage.getItem(KEY);
    return data? JSON.parse(data) : [];
  },
  set: (projects) => {
    localStorage.setItem(KEY, JSON.stringify(projects));
  }
}